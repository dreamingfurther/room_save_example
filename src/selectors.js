export const selectPendingSave = state => state.saving;
export const selectRoom = state => ({
  itemCount: state.itemCount,
  roomName: state.roomName,
  saving: selectPendingSave(state)
});

export const selectPublishSnapshot = state => state.publishData;

export const selectDataToPublish = state => ({ itemCount: state.itemCount, roomName: state.roomName });

export const selectDesignerBar = state => ({
  snapshot: selectPublishSnapshot(state)
});