import { client } from "../utils/services/fetchClient";

export const getPreviousBets = () => {
  return client.get('/get_bets');
};
