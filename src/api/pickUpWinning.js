
import { client } from "../utils/services/fetchClient";

export const pickUpWinning = (bet_id ) => {
    var data = {
        bet: bet_id
    }
  return client.post('pickupwinning',data);
};
