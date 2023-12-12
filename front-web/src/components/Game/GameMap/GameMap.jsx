import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from '../../../redux/actions';

import './Styles.scss';

const mapStateToProps = (state) => ({ mainview: state.mainview });
const mapDispatchToProps = (dispatch) => ({ dispatch });

class GameMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragAndDrop: null,
      selectedRegion: null,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(Actions.mainview.setCameraCalcWorldMousePos((mainview, event) => {
      const elem = document.getElementById('gamemap');
      const rc = elem.getBoundingClientRect();
      const pos = {
        x: event.clientX + mainview.camera.position.x - rc.left,
        y: event.clientY + mainview.camera.position.y - rc.top,
      };
      // console.log(22222, pos);
      return pos;
    }));
    // requestAnimationFrame(() => {
    //   this.doScrolling();
    // });
  }

  doScrolling() {
    const { mainview, dispatch } = this.props;
    if (!mainview.scrolling) {
      return;
    }
    const scrollingSpeed = 5;
    dispatch(Actions.mainview.setCameraPosition({
      x: (mainview.scrolling.dx * scrollingSpeed) + mainview.camera.position.x,
      y: (mainview.scrolling.dy * scrollingSpeed) + mainview.camera.position.y,
    }));
    requestAnimationFrame(() => {
      this.doScrolling();
    });
  }

  render() {
    const { children, mainview, dispatch } = this.props;

    const onPreventDefault = (e) => {
      e.preventDefault();
      return false;
    };

    const onLeftClick = (event) => {
      if (mainview.capturedObject) {
        console.log(5555, mainview.capturedObject);
        const params = {
          ...mainview.capturedObject,
          event,
          mousePos: mainview.camera.calcWorldMousePos(mainview, event),
        };
        dispatch(Actions.mainview.processCapturedObject(params));
        return;
      }
      this.setState({
        dragAndDrop: {
          startMousePos: {
            x: event.clientX,
            y: event.clientY,
          },
          startCameraPosition: { ...mainview.camera.position },
        },
      });
    };
    const onRightClick = () => {
      console.log('WARN: no game object found', mainview.subscribersMouseEvent);
      return false;
    };
    const onMouseMove = (event) => {
      const { dragAndDrop } = this.state;
      if (!dragAndDrop) {
        return;
      }
      this.setState({
        dragAndDrop: {
          ...dragAndDrop,
          moving: 1,
        },
      });
      dispatch(Actions.mainview.setCameraPosition({
        x: dragAndDrop.startCameraPosition.x - (event.clientX - dragAndDrop.startMousePos.x),
        y: dragAndDrop.startCameraPosition.y - (event.clientY - dragAndDrop.startMousePos.y),
      }));
    };
    const onMouseUp = () => {
      const { dragAndDrop } = this.state;
      if (dragAndDrop && !dragAndDrop.moving) {
        dispatch(Actions.mainview.setSelectedObject(null));
        dispatch(Actions.mainview.setToolAction(null));
      }
      this.setState({ dragAndDrop: null });
    };
    const startScrolling = (dx, dy) => {
      // console.log('startScrolling');
      dispatch(Actions.mainview.setScrolling({
        dx,
        dy,
      }));
      requestAnimationFrame(() => {
        this.doScrolling();
      });
    };
    const stopScrolling = () => {
      // console.log('stopScrolling');
      dispatch(Actions.mainview.setScrolling(null));
    };
    // console.log('gamemap', state.mode);

    return (
      <div
        id="gamemap"
        className="gamemap"
        onDragStart={onPreventDefault}
        onKeyDown={(e) => {
          console.log('gamemap onKeyDown', e.keyCode);
          if (e.keyCode === 27) {
            dispatch(Actions.mainview.setToolAction(null));
          }
        }}
        onMouseDown={(event) => {
          event.preventDefault();
          if (event.button === 0) {
            onLeftClick(event);
          } else if (event.button === 2) {
            onRightClick(event);
          }
        }}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        role="link"
        tabIndex={0}
      >
        <div />
        <div
          className="gamemap-top"
          onMouseEnter={() => startScrolling(0, -1)}
          onMouseLeave={stopScrolling}
        />
        <div />
        <div
          className="gamemap-left"
          onMouseEnter={() => startScrolling(-1, 0)}
          onMouseLeave={stopScrolling}
        />
        <div
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {children}
        </div>
        <div
          className="gamemap-right"
          onMouseEnter={() => startScrolling(1, 0)}
          onMouseLeave={stopScrolling}
        />
        <div />
        <div
          className="gamemap-bottom"
          onMouseEnter={() => startScrolling(0, 1)}
          onMouseLeave={stopScrolling}
        />
        <div />
      </div>
    );
  }
}

GameMap.propTypes = {
  children: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  mainview: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameMap);
