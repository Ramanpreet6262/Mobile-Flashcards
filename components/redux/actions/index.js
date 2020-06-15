export const newDeck = 'AddDeck';
export const newQuestion = 'AddQuestion';
export const getInitialData = 'getInitialData';

export function NewDeck(value) {
  return {
    type: newDeck,
    value
  };
}

export function NewQuestion(value) {
  return {
    type: newQuestion,
    value
  };
}

export function GetInitialData(value) {
  return {
    type: getInitialData,
    value
  };
}
