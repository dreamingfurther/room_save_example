import React, { Component } from "react";
import { connect } from "react-redux";
import RoomContainer from "./RoomContainer";
import DesignerBarContainer from "./DesignerBarContainer";
import { save } from "./actions";

/**
 * The Container which is managing the saving Promise chain.
 * NOTE: This container has zero knowledge of what is happening with the save
 *       promise it is only responsible for chainging saves together.
 */
class App extends Component {
  constructor() {
    super();
    this.state = {
      // the saveQueue is always a promise so that it can always be chained
      saveQueue: Promise.resolve([]),
      savesQueued: 0
    };
  }

  handleSave = () => {
    return new Promise(resolveQueue => {
      this.setState(prevState => {
        this.setState(this.queueOrSkipSave(resolveQueue));
      });
    });
  };

  queueOrSkipSave = resolveQueue => prevState => {
    // add a save if there are no queued saves
    if (prevState.savesQueued < 2) {
      return this.addSave(resolveQueue, prevState);
    }

    // skip adding a save if we already have 1 in progress and 1 queued
    resolveQueue(prevState.saveQueue);
    return null;
  };

  addSave = (resolveQueue, prevState) => {
    // this is where we add a new save into the save Promise chain
    const newSave = prevState.saveQueue
      .then(this.props.save)
      .then(this.finishSaveQueue);

    // this resolve is passed all the way down from the saveQueueHandler
    // this is the heart of adding a new save into the exisiting promise chain
    resolveQueue(newSave);
    return {
      saveQueue: newSave,
      savesQueued: prevState.savesQueued + 1
    };
  };

  // this step decrements and "finshes" any ongoing saves
  finishSaveQueue = resolveSaveQueue => {
    new Promise(resolveFinishQueue => {
      this.setState(prevState => {
        resolveFinishQueue(resolveSaveQueue);
        return { savesQueued: prevState.savesQueued - 1 };
      });
    });
  };

  render() {
    return (
      <div>
        <h1>Save & Publish Demo!</h1>
        <p>
          In this Demo the container is in-charge of the save logic. Passing
          down the save callback to children. A save might kick off a new
          immediate save, or queue one up until the one in flight completes
        </p>
        {this.props.latestSavedData && (
          <div>
            <span>
              Here is the latest saved data:{" "}
              {JSON.stringify(this.props.latestSavedData)}
            </span>
          </div>
        )}
        <div>
          Queued saves: {this.state.savesQueued} (each save should take 2
          seconds)
        </div>
        <RoomContainer onSave={this.handleSave} />
        <DesignerBarContainer onSave={this.handleSave} />
      </div>
    );
  }
}

const AppContainer = connect(state => ({ latestSavedData: state.savedData }), {
  save
})(App);

export default AppContainer;
