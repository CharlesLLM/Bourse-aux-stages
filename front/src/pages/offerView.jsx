import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OfferHeader from '../components/utils/offerHeader.jsx';
import OfferBody from '../components/utils/offerBody.jsx'
function OfferView() {
  const { id } = useParams();
  const [offer, setOffer] = useState([]);

  useEffect(() => {
    const getOffer = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}offer/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOffer(data);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    getOffer();
  }, [id]);

  return (
    <div>
      <OfferHeader offer={offer} enableApplyButton />
      <OfferBody offer={offer} enableApplyButton />
    </div>
  )
}

export default OfferView;
