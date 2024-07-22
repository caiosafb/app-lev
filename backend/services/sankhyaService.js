const axios = require('axios');
require('dotenv').config();

async function loginToSankhya() {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${process.env.API_BASE_URL}/login`,
    headers: {
      'Appkey': process.env.APP_KEY,
      'Username': process.env.USERNAME,
      'Password': process.env.PASSWORD,
      'Content-Type': 'application/json'
    },
    data: ''
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}


async function getBikesByCpf(cpf, token) {


  const data = JSON.stringify({
    "serviceName": "DbExplorerSP.executeQuery",
    "requestBody": {
      "sql": `SELECT PAR.CODPARC,PAR.NOMEPARC,EQPBIKE.AD_EQUIPBIKECOR,EQPBIKE.AD_EQUIPCHASSI,EQPBIKE.AD_EQUIPMOTOR,EQPBIKE.AD_EQUIPBIKECOD,PRO.DESCRPROD FROM TGFPAR PAR INNER JOIN AD_EQUIPBIKE EQPBIKE  ON EQPBIKE.CODPARC = PAR.CODPARC INNER JOIN TGFPRO PRO ON PRO.CODPROD = EQPBIKE.AD_EQUIPBIKECOD WHERE PAR.CGC_CPF = REPLACE(REPLACE('${cpf}','.',''),'-','')`
    }
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${process.env.API_BASE_URL}/gateway/v1/mge/service.sbr?serviceName=DbExplorerSP.executeQuery&outputType=json`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar bikes pelo CPF:', error);
    throw error;
  }
}

module.exports = {
  loginToSankhya,
  getBikesByCpf
};
