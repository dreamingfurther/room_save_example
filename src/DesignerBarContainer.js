import { connect } from 'react-redux';
import { compose } from 'redux';
import DesignerBar from './DesignerBar';
import { publish } from './actions';
import { selectDesignerBar } from './selectors';

const DesignerBarContainer = connect(
  selectDesignerBar,
  (dispatch, ownProps) => {
    const { onSave } = ownProps;
    const doPublish = compose(dispatch, publish, onSave);
    
    return {
      onPublish() {
        // publish always calls save, whether its an ongoing one or a new one is all up to the
        // container managing the save behavior.
        return doPublish();
      }
    };
  }
)(DesignerBar);

export default DesignerBarContainer;
