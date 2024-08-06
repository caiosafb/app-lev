import React, { useEffect, useState } from 'react';
import api from '../../utils/api'; 

const Home = () => {
  const [bikes, setBikes] = useState([]);  // Estado para armazenar a lista de bicicletas
  const [loading, setLoading] = useState(true);  // Estado para controlar o carregamento
  const [error, setError] = useState(null);  // Estado para armazenar erros

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await api.get('/users/home', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        });
        
        // Verifica se a resposta contém um array ou acessa a propriedade correta
        if (Array.isArray(response.data)) {
          setBikes(response.data);
        } else if (response.data && Array.isArray(response.data.bikes)) {
          setBikes(response.data.bikes);
        } else {
          setError('Dados inesperados da API');
        }
      } catch (err) {
        setError(`Erro ao buscar bikes: ${err.message}`);
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
      {bikes.length === 0 ? (
        <p>Nenhuma bicicleta encontrada.</p> 
      ) : (
        <ul>
          {bikes.map((bike, index) => (
            <li key={index}>
              {bike.NOMEPARC} - {bike.DESCRPROD} - {bike.AD_EQUIPBIKECOR} - {bike.AD_EQUIPCHASSI} 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
