import { client } from "../utils/services/fetchClient";

export const makePayment = (userId, amount, cryptocurrency, network) => {
  return client.post('/make_payment', {userId:userId, amount:amount, cryptocurrency:cryptocurrency, network:network});
};
