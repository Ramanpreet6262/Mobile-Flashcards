import { newDeck, newQuestion, getInitialData } from '../actions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case newDeck: {
      return {
        ...state,
        [action.value.title]: action.value
      };
    }
    case getInitialData: {
      return {
        ...state,
        ...action.value
      };
    }
    case newQuestion: {
      state[action.value.key].questions.concat([action.value.questions]);
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
