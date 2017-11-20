import { selectDataToPublish } from "./selectors";

export const START_SAVE = "START_SAVE";
export const FINISH_SAVE = "FINISH_SAVE";
export const START_PUBLISH = "START_PUBLISH";
export const FINISH_PUBLISH = "FINISH_PUBLISH";
export const CHANGE_ITEMS = "CHANGE_ITEMS";
export const CHANGE_NAME = "CHANGE_NAME";

export const startSave = () => ({ type: START_SAVE });
export const finishSave = () => ({ type: FINISH_SAVE });


export const save = () => (dispatch, getState) => {
  dispatch(startSave());
  return new Promise((resolve, reject) => {
      // We are going to give save-room two seconds of time to perfrom it's logic
      setTimeout(resolve, 2000);
    }).then(() => {
      dispatch(finishSave());
      return true;
    });
};

export const startPublish = payload => ({ type: START_PUBLISH, payload });
export const finishPublish = () => ({ type: FINISH_PUBLISH });

// Note: The promise passed into the action. The publish has no idea how the save happens
//       We know that it's in the same file currently but these are now 100% de-coupled
export const publish = savePromise => (dispatch, getState) => {
  // Because we need the _current_ state not the one after all saves complete grab it now
  const data = selectDataToPublish(getState());

  savePromise.then(() => {
    dispatch(startPublish(data));

    return new Promise(resolve => {
      setTimeout(resolve, 5000);
    }).then(() => {
      dispatch(finishPublish());
    });
  });
};

export const changeName = payload => ({ type: CHANGE_NAME, payload });
export const changeItems = payload => ({ type: CHANGE_ITEMS, payload });
