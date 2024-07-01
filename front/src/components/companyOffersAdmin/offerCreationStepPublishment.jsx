const OfferCreationStepPublishment = ({formData, setFormData }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="flex flex-col items-stretch w-auto gap-3">
            <div className="border-b border-borderGrey ml-2"></div>
            <div className="flex flex-row gap-10 my-6">
                <div className="w-4/12 flex flex-col gap-3 mt-2">
                    <label htmlFor="offerPublishedDate">Date de publication</label>
                </div>
                <div className="w-7/12">
                    <input
                        type="date"
                        id="offerPublishedDate"
                        name="offerPublishedDate"
                        value={formData.offerPublishedDate}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-1"
                    />
                </div>
            </div>
            <div className="border-b border-borderGrey ml-2"></div>
            <div className="flex flex-row gap-10 my-6">
                <div className="w-4/12 flex flex-col gap-3 mt-2">
                    <label htmlFor="offerDeadline">Date limite de candidature</label>
                </div>
                <div className="w-7/12">
                    <input
                        type="date"
                        id="offerDeadline"
                        name="offerDeadline"
                        value={formData.offerDeadline}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-1 mb-3"
                    />
                </div>
            </div>
            <div className="border-b border-borderGrey ml-2"></div>
            <div className="flex flex-row gap-10 my-6">
                <div className="w-4/12 flex flex-col gap-3 mt-2">
                    <label htmlFor="offerStartDate">Date de début de l'offre </label>
                </div>
                <div className="w-7/12">
                    <input
                        type="date"
                        id="offerStartDate"
                        name="offerStartDate"
                        value={formData.offerStartDate}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-1 mb-3"
                    />
                </div>
            </div>
            <div className="border-b border-borderGrey ml-2"></div>
            <div className="flex flex-row gap-10 my-6">
                <div className="w-4/12 flex flex-col gap-3 mt-2">
                    <label htmlFor="offerEndDate">Date de fin de l'offre </label>
                </div>
                <div className="w-7/12">
                    <input
                        type="date"
                        id="offerEndDate"
                        name="offerEndDate"
                        value={formData.offerEndDate}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-1 mb-3"
                    />
                </div>
            </div>
            <div className="border-b border-borderGrey ml-2"></div>
        </div>
    );
  };

export default OfferCreationStepPublishment;
