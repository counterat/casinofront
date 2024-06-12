import { client } from "../utils/services/fetchClient";

export const getBets = () => {
  return client.get('/bets');
};
