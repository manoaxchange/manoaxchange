import axios from 'axios';

const baseUrl = '/api/mail/send';

const create = newMsgObject => {
  const request = axios.post(baseUrl, newMsgObject);
  return request.then(response => response.data);
};

export default { create };
