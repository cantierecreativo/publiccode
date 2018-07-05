import { createAction, handleActions } from "redux-actions";

export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const RESET_NOTIFICATIONS = "RESET_NOTIFICATIONS";

// {
//   type:'TYPE',
//   payload:{}.
//   error:false,
//   meta:{}
// }

// export const notify = data => ({ type: ADD_NOTIFICATION, payload: data });
// export const clearNotifications = () => ({ type: RESET_NOTIFICATIONS });

export const notify = createAction(ADD_NOTIFICATION);
export const clearNotifications = createAction(RESET_NOTIFICATIONS);

const initialState = {
  item: null
};

const reducer = handleActions(
  {
    ADD_NOTIFICATION: (state, action) => {
      return {
        ...state,
        item: action.payload
      };
    },
    RESET_NOTIFICATIONS: (state, action) => initialState
  },
  initialState
);
export default reducer;

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_NOTIFICATION:
//       return Object.assign({}, state, {
//         item: action.payload
//       });
//     case RESET_NOTIFICATIONS:
//       return initialState;
//     default:
//       return state;
//   }
// };
