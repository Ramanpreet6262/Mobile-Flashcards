import { _getData } from '../../utils/_Data';
import { GetInitialData } from '../actions';

export default async function fetchData() {
  const { cards } = await _getData();
  return dispatch => {
    return dispatch(GetInitialData(cards));
  };
}
