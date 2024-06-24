const ProgressBar = ({ offer, viewStyle = false }) => {
  const duration = Math.floor((new Date(offer.endDate) - new Date(offer.startDate)) / (1000 * 60 * 60 * 24));
  let durationString = `${duration} jours`;
  if (duration > 365) {
    durationString = `${Math.floor(duration / 30)} mois et ${duration % 30} jours`;
  }

  const publicationDuration = Math.floor((new Date (offer.endPublicationDate) - new Date (offer.createdAt)) / (1000 * 60 * 60 * 24));
  const remainingTime = Math.floor((new Date (offer.endPublicationDate) - new Date()) / (1000 * 60 * 60 * 24));
  const progressBarWidth = remainingTime / publicationDuration * 100;
  const progressBarColor = progressBarWidth > 40 ? '#56CDAD' : progressBarWidth > 10 ? '#FF9900' : '#FF007A';

  return (
    <div className={`flex gap-2 ${viewStyle ? 'flex-col p-4 bg-lightGrey font-semibold' : 'flex-col-reverse text-xs font-normal mt-4'}`}>
      <p>
        {remainingTime < 1 
          ? "Dernier jour pour postuler" 
          : remainingTime == 1 
            ? "Reste 1 jour pour postuler" 
            : `Reste ${remainingTime} jours pour postuler`
        }
      </p>
      <div className="w-full bg-borderGrey">
        <div className="h-1.5" style={{ width: `${progressBarWidth}%`, backgroundColor: progressBarColor }}></div>
      </div>
    </div>
  )
}

export default ProgressBar;
