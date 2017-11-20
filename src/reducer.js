import {
  START_SAVE,
  FINISH_SAVE,
  START_PUBLISH,
  FINISH_PUBLISH,
  CHANGE_ITEMS,
  CHANGE_NAME
} from './actions';

const reducer = (state = {
  itemCount: 0,
  roomName: '',
  saving: false,
  publishing: false,
  publishData: null
}, { type, payload }) => {
  switch(type) {
    case START_SAVE:
      return {
        ...state,
        saving: true,
        savedData: {
          itemCount: state.itemCount,
          roomName: state.roomName
        }
      };
    case FINISH_SAVE:
      return {
        ...state,
        saving: false
      };
    case START_PUBLISH:
      return {
        ...state,
        publishing: true,
        publishData: payload
      };
    case FINISH_PUBLISH:
      return {
        ...state,
        publishing: false,
        publishData: null
      };
    case CHANGE_ITEMS:
      return {
        ...state,
        itemCount: state.itemCount + payload
      };
    case CHANGE_NAME:
      return {
        ...state,
        roomName: payload
      };
    default:
      return state;
  }
}

export default reducer;