import { SET_TOTAL_MONEY } from '../../action-types';

export default totalMoney => ({
  type: SET_TOTAL_MONEY,
  payload: { totalMoney },
});
