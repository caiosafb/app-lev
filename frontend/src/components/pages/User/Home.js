import React, { useEffect, useState } from 'react';
import api from '../../../utils/api'; 

const Home = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await api.get('/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        });
        setBikes(response.data);
      } catch (err) {
        setError('Erro ao buscar bikes');
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Bikes</h1>
      <ul>
        {bikes.map((bike, index) => (
          <li key={index}>
            {bike.NOMEPARC} - {bike.AD_EQUIPBIKECOR} - {bike.AD_EQUIPCHASSI}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
