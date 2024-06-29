import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OfferBody from '../components/utils/offerBody.jsx'
import OfferHeader from '../components/utils/offerHeader.jsx';

function OfferView() {
  const { id } = useParams();
  const [offer, setOffer] = useState({});
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const getOffer = async () => {
      setUser(JSON.parse(localStorage.getItem('user')))
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

  useEffect(() => {
    if(user){
      const getApplication = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}application/get/${user.student.id}/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          setAlreadySubmitted(true);
        } catch (e) {
          setAlreadySubmitted(false);
        }
      }

      getApplication();
    }
  }, [user])

  return (
    <div>
      {offer.id && (
        <div>
          <OfferHeader offer={offer} enableApplyButton alreadySubmitted={alreadySubmitted}/>
          <OfferBody offer={offer} alreadySubmitted={alreadySubmitted}/>
        </div>
      )}
    </div>
  )
}

export default OfferView;
