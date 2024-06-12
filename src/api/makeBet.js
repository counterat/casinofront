
import { client } from "../utils/services/fetchClient";

export const makeBet = (game_id, user_id,bet_in_usd, baltype ) => {
    var data = {
        game_id:game_id,
        user_id:user_id,
        bet_in_usd:bet_in_usd,
        baltype:baltype
    }
  return client.post('/new_bet',data);
};
