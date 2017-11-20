import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { selectRoom } from './selectors';
import { save, changeItems, changeName } from './actions';
import Room from './Room';

const RoomContainer = connect(
  selectRoom,
  (dispatch, ownProps) => {
    // make this a bit easier to write
    const { onSave } = ownProps;

    return {
      onItemChange(change) {
        dispatch(changeItems(change));
        onSave();
      },
      onNameChange(e) {
        const name = e.target.value;
        dispatch(changeName(name));
        onSave();
      }
    }
  }
)(Room);

export default RoomContainer;
