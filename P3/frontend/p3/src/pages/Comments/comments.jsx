import React, { useState, useEffect, useContext } from 'react';
import BASE from '../../constants/baseUrl';
import { APIContext } from '../../contexts/APIContext';
import { useParams } from 'react-router-dom';
import './comments.css';

const CommentPage = ({}) => {
  const { user } = useContext(APIContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const { objectId, forShelter } = useParams();

  useEffect(() => {
    fetchComments();
  }, [objectId, forShelter, currentPage]); 

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${BASE}/comments?object_id=${objectId}&for_shelter=${forShelter}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setErrorMessage('An error occurred while fetching comments.');
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE}/comments/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          object_id: objectId,
          content_type: forShelter ? 'user' : 'applications',
          message: newComment,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add a new comment');
      }

      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error adding a new comment:', error);
      setErrorMessage('An error occurred while adding a new comment.');
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <header>Chat for {forShelter ? 'Shelter' : 'Application'} {objectId}</header>
      <div className="comments-container">
        <div className="comment-content">
          {errorMessage && (
            <div className="messages" style={{ color: 'red' }}>
              {errorMessage}
            </div>
          )}

          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.message}</p>
            </div>
          ))}

          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={handleNextPage} disabled={data.length === 0}>Next</button>
          </div>

          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a new comment..."
              rows="3"
            />
            <button type="submit">Add Comment</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentPage;
