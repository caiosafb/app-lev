
const axios = require('axios');

const sankhyaApi = axios.create({
  baseURL: 'https://api.sankhya.com.br',
});

async function loginToSankhya() {
  try {
    const response = await sankhyaApi.post('/login', {
      username: process.env.SANKHYA_USERNAME,
      password: process.env.SANKHYA_PASSWORD,
    });
    return response.data.token;
  } catch (error) {
    console.error('Erro ao fazer login no Sankhya:', error.message);
    throw error; 
  }
}

async function getBikesByCpf(token, cpf) {
  try {
    const requestData = {
      serviceName: "DbExplorerSP.executeQuery",
      requestBody: {
        sql: `SELECT PAR.CODPARC, PAR.NOMEPARC, EQPBIKE.AD_EQUIPBIKECOR, EQPBIKE.AD_EQUIPCHASSI, EQPBIKE.AD_EQUIPMOTOR, EQPBIKE.AD_EQUIPBIKECOD, PRO.DESCRPROD FROM TGFPAR PAR INNER JOIN AD_EQUIPBIKE EQPBIKE ON EQPBIKE.CODPARC = PAR.CODPARC INNER JOIN TGFPRO PRO ON PRO.CODPROD = EQPBIKE.AD_EQUIPBIKECOD WHERE PAR.CGC_CPF = '${cpf}'`
      }
    };

    const response = await sankhyaApi.post('/gateway/v1/mge/service.sbr', requestData, {
      params: {
        serviceName: 'DbExplorerSP.executeQuery',
        outputType: 'json',
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao obter bicicletas por CPF:', error.message);
    throw error;
  }
}

module.exports = {
  loginToSankhya,
  getBikesByCpf,
};
