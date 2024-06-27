// services/sankhyaService.js
const axios = require('axios');

const sankhyaApi = axios.create({
  baseURL: 'https://api.sankhya.com.br',
});

async function loginToSankhya() {
  const response = await sankhyaApi.post('/login', {
    username: process.env.SANKHYA_USERNAME,
    password: process.env.SANKHYA_PASSWORD,
  });
  return response.data.token;
}

async function getBikesByCpf(token, cpf) {
  const requestData = {
    serviceName: "DbExplorerSP.executeQuery",
    requestBody: {
      sql: `SELECT PAR.CODPARC, PAR.NOMEPARC, EQPBIKE.AD_EQUIPBIKECOR, EQPBIKE.AD_EQUIPCHASSI, EQPBIKE.AD_EQUIPMOTOR, EQPBIKE.AD_EQUIPBIKECOD, PRO.DESCRPROD FROM TGFPAR PAR INNER JOIN AD_EQUIPBIKE EQPBIKE ON EQPBIKE.CODPARC = PAR.CODPARC INNER JOIN TGFPRO PRO ON PRO.CODPROD = EQPBIKE.AD_EQUIPBIKECOD WHERE PAR.CGC_CPF = '${cpf}'`
    }
  };

  const response = await sankhyaApi.post('/gateway/v1/mge/service.sbr?serviceName=DbExplorerSP.executeQuery&outputType=json', requestData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

module.exports = {
  loginToSankhya,
  getBikesByCpf,
};
