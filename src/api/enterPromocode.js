
import { client } from "../utils/services/fetchClient";

export const enterPromocode = (user_id, promocode) => {
    var data = {
       
        user_id:user_id,
        promocode:promocode
    }
  return client.post('/activatepromocode',data);
};
