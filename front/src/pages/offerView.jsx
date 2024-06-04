import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OfferHeader from '../components/utils/offerHeader.jsx';

function OfferView() {
  const { id } = useParams();
  const [offer, setOffer] = useState([]);
  const navigate = useNavigate();

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
  }, []);

  return (
    <div>
      <OfferHeader offer={offer} enableApplyButton />
    </div>
  )
}

export default OfferView;
