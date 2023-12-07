import AdoptionCard from "../AdoptionCard"


const AdoptionList = ({pets}) => {
    return (
        <>
            <div className="pet-adoption-records">
                    {pets.map((pet) => (
                        <AdoptionCard pet={pet}/>
                    ))}
            </div>
        </>
    )
}

export default AdoptionList;