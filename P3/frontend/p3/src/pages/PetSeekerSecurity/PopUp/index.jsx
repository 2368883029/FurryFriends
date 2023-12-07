
const PopUp = ({onClose})=> {
    return (
        <div className="card pop-up-card">
          <div className="card-body">
          <h5 className="card-title">Change your Profile Picture </h5>
            <form>
            <input type="file"/>
            <div className="pop-up-btns">
                <button onClick={onClose} className="btn btn-primary">Close</button>
                <button className="btn btn-primary" type="submit">Submit</button>
            </div>
            </form>
          </div>
        </div>
    );
}

export default PopUp;