export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const RESET_NOTIFICATIONS = "RESET_NOTIFICATIONS";

export function notify(data) {
  return {
    type: ADD_NOTIFICATION,
    data
  };
}
export function clearNotifications() {
  return {
    type: RESET_NOTIFICATIONS
  };
}

const initialState = {
  item: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return Object.assign({}, state, {
        item: action.data
      });
    case RESET_NOTIFICATIONS:
      return initialState;
    default:
      return state;
  }
};
