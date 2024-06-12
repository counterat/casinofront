import { client } from "../utils/services/fetchClient";

export const requestPayout = (userId, amount, address, sign, currency,network) => {
  return client.post('/request_payout', {userId:userId, amount:amount, address:address, sign:sign, currency:currency, network:network});
};
