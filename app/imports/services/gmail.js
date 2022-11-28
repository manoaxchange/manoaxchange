import axios from 'axios';

const baseUrl = '/api/mail/send';

const create = async (newMsgObject) => {
  const result = await axios.post(baseUrl, newMsgObject);
  return result;
};

export default { create };
