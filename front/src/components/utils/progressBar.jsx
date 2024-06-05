const ProgressBar = ({ startDate, endDate, endPublicationDate, createdAt, displayLabelTop }) => {
    const duration = Math.floor((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    let durationString = `${duration} jours`;
    if (duration > 365) {
        durationString = `${Math.floor(duration / 30)} mois et ${duration % 30} jours`;
    }
    const publicationDuration = Math.floor((new Date (endPublicationDate) - new Date (createdAt)) / (1000 * 60 * 60 * 24));
    const remainingTime = Math.floor((new Date (endPublicationDate) - new Date()) / (1000 * 60 * 60 * 24));
    const progressBarWidth = remainingTime / publicationDuration * 100;
    const progressBarColor = progressBarWidth > 40 ? '#56CDAD' : progressBarWidth > 10 ? '#FF9900' : '#FF007A';

    return (
        <div>
            { displayLabelTop && <p className="text-xs font-normal">
            {remainingTime < 1 
                ? "Dernier jour pour postuler" 
                : remainingTime == 1 
                ? "Reste 1 jour pour postuler" 
                : `Reste ${remainingTime} jours pour postuler`
            }
            </p>}
            <div className="w-full bg-borderGrey mt-4 mb-2">
                <div className="h-1.5" style={{ width: `${progressBarWidth}%`, backgroundColor: progressBarColor  }}></div>
            </div>
            { !displayLabelTop && <p className="text-xs font-normal">
            {remainingTime < 1 
                ? "Dernier jour pour postuler" 
                : remainingTime == 1 
                ? "Reste 1 jour pour postuler" 
                : `Reste ${remainingTime} jours pour postuler`
            }
            </p>}
        </div>
    )
}

export default ProgressBar;