import React from "react";

const DesignerBar = props => {
  return (
    <div style={{padding: '10px' }}>
      <div>This is the Designer Bar, publish anytime</div>
      <button onClick={props.onPublish}>Publish the Room </button>
      <p>Publishing takes 5 seconds, but does not block additional changes/saves</p>
      <p>It will however, always wait for any pending saves.</p>
      <p>When a save is not currently pending, it <i>should</i> kick one off</p>
      {props.snapshot && 
        <div>
          <span>Publish Snapshot: {JSON.stringify(props.snapshot)}</span>
        </div>
      }
    </div>
  );
};

export default DesignerBar;
