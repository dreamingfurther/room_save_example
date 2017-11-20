import React, { Component } from "react";
import PropTypes from "prop-types";

const Room = props => {
  return (
    <div style={{padding: '10px' }}>
      <div>
        This is the room Component, add/subtract items and change room Name
      </div>
      <button onClick={() => props.onItemChange(1)}>Add Item</button>
      <button onClick={() => props.onItemChange(-1)}>Subtract Item</button>
      <span>Item count: {props.itemCount}</span>
      <br />
      <span>Name:</span>
      <input onChange={props.onNameChange} />
    </div>
  );
};

export default Room;
