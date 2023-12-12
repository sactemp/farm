import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from '../../../redux/actions';

import './Styles.scss';

const mapStateToProps = (state) => ({
  gameobjectTypeList: state.gameobjectTypeList,
  zonecontentList: state.zonecontentList,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCapture: false,
      viewPosition: {
        x: 0,
        y: 0,
      },
      startCapture: {
        clientX: 0,
        clientY: 0,
      },
      deltaCapture: {
        x: 0,
        y: 0,
      },
    };
    /*
     * this.onDown = this.onDown.bind(this);
     * this.onMove = this.onMove.bind(this);
     * this.onUp = this.onUp.bind(this);
     */
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(Actions.gameobjectTypeList.fetchList());
    dispatch(Actions.zonecontentList.fetchList());
  }

  render() {
    const { viewPosition, selectedObject } = this.state;
    const { gameobjectTypeList, zonecontentList, dispatch } = this.props;

    const onDown = (event, selectedObject_) => {
      event.stopPropagation();
      const { isCapture } = this.state;
      if (isCapture) {
        return;
      }
      const { clientX, clientY } = event;

      this.setState((state) => ({
        isCapture: true,
        startCapture: {
          clientX,
          clientY,
        },
        selectedObject: selectedObject_,
        viewPositionCapture: { ...state.viewPosition },
      }));
    };

    const onMove = (event) => {
      const { isCapture, startCapture } = this.state;
      if (!isCapture) {
        return;
      }

      const { clientX, clientY } = event,
        deltaCapture = {
          x: ((clientX - startCapture.clientX) * 1.0),
          y: ((clientY - startCapture.clientY) * 1.0),
        };
      this.setState(() => ({ deltaCapture }));
      if (selectedObject) {
        const newObject = {
          ...selectedObject,
          xx: selectedObject.xx + deltaCapture.x,
          yy: selectedObject.yy + deltaCapture.y,
        };

        console.log(222, newObject);

        dispatch(Actions.zonecontentList.updateItem({
          item: newObject,
          doNotSaveToDS: 1,
        }));
      } else {
        this.setState((state) => ({
          viewPosition: {
            x: state.viewPositionCapture.x + deltaCapture.x,
            y: state.viewPositionCapture.y + deltaCapture.y,
          },
        }));
      }
    };

    const onUp = () => {
      const { isCapture, deltaCapture } = this.state;
      if (!isCapture) {
        return;
      }

      console.log(222, selectedObject);
      if (selectedObject) {
        const newObject = {
          ...selectedObject,
          xx: selectedObject.xx + deltaCapture.x,
          yy: selectedObject.yy + deltaCapture.y,
        };

        if (selectedObject.id) {
          dispatch(Actions.zonecontentList.updateItem({ item: newObject }));
        } else {
          dispatch(Actions.zonecontentList.createItem({ item: newObject }));
        }
      }

      this.setState(() => ({
        isCapture: false,
        selectedObject: null,
      }));
    };

    const ToolTipItem = (props) => (props.item ? (
      <div>
        {props.item.title}
      </div>
    )
      : null);

    // console.log(222, this.state);
    return (
      <div>
        <div className="toolpanel1">
          { gameobjectTypeList.items.toList().map((item) => (
            <div
              className="toolbtn1"
              key={item.id}
              onDragStart={() => (false)}
              onMouseDown={(e) => {
                const newGameObject = {
                  zone_id: 1,
                  gameobject_type_id: item.id,
                  xx: e.clientX,
                  yy: e.clientY,
                };
                onDown(e, newGameObject, 1);
              }}
              role="button"
              style={{ backgroundColor: `${item.gcolor}` }}
              tabIndex={0}
            >
              <div>
                {item.title}
              </div>
              <img
                alt={item.gicon}
                height={32}
                src={`images/${item.gicon}`}
                style={{ marginLeft: 'auto' }}
                width={32}
              />
            </div>
          ))}
        </div>
        <div className="Canvas">
          <div>
            {'Карта: '}
            {viewPosition.x}
            {' '}
            {viewPosition.y}
          </div>
          <svg
            id="aliens-go-home-canvas"
            onMouseDown={(e) => onDown(e)}
            onMouseMove={(e) => onMove(e)}
            onMouseUp={(e) => onUp(e)}
            preserveAspectRatio="none"
            style={{
              width: '100%',
              height: '650px',
            }}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                height="1"
                id="imgpattern"
                width="1"
                x="0"
                y="0"
              >
                <image xlinkHref="/assets/images/zel1.jpg" />
              </pattern>
            </defs>
            { zonecontentList.items.toList().map((item) => {
              const got = gameobjectTypeList.items.get(item.gameobject_type_id) || {};
              const key = item.id || Date.now();
              return (
                <div key={key}>
                  <path
                    className="gameobject"
                    d={got.gpath}
                    id={`go-${key}`}
                    onMouseDown={(e) => onDown(e, item)}
                    style={{
                      fill: `${got.gcolor}`,
                      backgroundSize: '64px auto',
                    }}
                    transform={`translate(${item.xx + viewPosition.x} ${item.yy + viewPosition.y})`}
                  />
                </div>
              );
            })}
          </svg>
          <ToolTipItem
            item={selectedObject}
          />
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gameobjectTypeList: PropTypes.object.isRequired,
  zonecontentList: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
