import AdoptionCard from "../AdoptionCard"


const AdoptionList = ({pets, type}) => {
    console.log(pets);
    return (
        <>
            <div className="pet-adoption-records">
                    {pets.map((pet) => (
                        <AdoptionCard pet={pet} type={type}/>
                    ))}
            </div>
        </>
    )
}

export default AdoptionList;