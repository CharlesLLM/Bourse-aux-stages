import OfferTypeTag from '../utils/offerTypeTag.jsx';
import ProgressBar from '../utils/progressBar.jsx';

function OfferBody({ offer, enableApplyButton = false }) {

  return (
    <div className="bg-lightGrey mx-32 flex flex-row pt-5 pb-10 gap-8 bg-white justify-between">
        <div className="flex flex-col w-8/12">
            <div>
                <h2 className="text-3xl my-5"> A propos de ce stage</h2>
                <p className="font-normal">
                    {offer.description}
                </p>
            </div>
            <div>
                <h2 className="text-3xl my-5"> Missions</h2>
                <p className="font-normal">
                    {offer.description}
                </p>
            </div>
            <div>
                <h2 className="text-3xl my-5"> Profil Recherché</h2>
                <p className="font-normal">
                    {offer.description}
                </p>
            </div>
            <div>
                {enableApplyButton && (
                    <button className="px-14 py-3 w-48 h-[50px] leading-none text-white bg-primary" onClick={() => navigate(`/offre/${offer.id}/postuler`)}>Postuler</button>
                )}
            </div>
        </div>
        <div className="w-3/12 font-normal flex flex-col gap-10">
            <h2 className="text-primary text-2xl">Échéances</h2>
            <div className="w-full bg-lightGrey p-4">
                <ProgressBar startDate={offer.startDate} endDate={offer.endDate} createdAt={offer.createdAt} endPublicationDate={offer.endPublicationDate} displayLabelTop={true}/> 
            </div>
            <div className="flex justify-between flex-row">
                <p>Postuler avant le</p>
                <p className="text-primary font-semibold"> {offer.endDate} </p>
            </div>
            <div className="flex justify-between flex-row">
                <p>Publié  le</p>
                <p className="text-primary font-semibold"> {offer.createdAt} </p>
            </div>
            <div className="flex justify-between flex-row">
                <p>Type d'offre </p>
                <p className="text-primary font-semibold"> {offer.type} </p>
            </div>
        </div>
    </div>
  )
}

export default OfferBody;
