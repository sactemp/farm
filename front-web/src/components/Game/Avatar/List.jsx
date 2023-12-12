import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import config from '../../../config';
import { Button } from '../../../lib/controls';

import Actions from '../../../redux/actions';
import Edit from './Edit';

import './Styles.scss';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(3) },
  content: { display: 'flex', flexDirection: 'column', height: '250px' },
  alignCenter: { display: 'flex', alignItems: 'center' },
  grow: { flexGrow: 1 },
  margin: { margin: theme.spacing(1) },
}));

const mapStateToProps = ({ auth, zoneList, entityKindList, entityList }) => ({ auth, zoneList, entityKindList, entityList });
const mapDispatchToProps = (dispatch) => ({ dispatch });

const List = (props) => {
  const { zoneList, entityKindList, entityList, auth, dispatch } = props;
  const classes = useStyles();

  return (
    <>
      <div className="container-general">
        <div className="container-general--header">Аватары</div>
        <Paper variant="outlined" className="container-general--content">
          {(entityList.items.size ? entityList.items.toList().map((item) => {
            const ek = entityKindList.items.get(item.entity_kind_id) || {};
            const zone = zoneList.items.get(item.zone_id) || {};
            return (
              <Paper
                className={classes.content}
                key={item.id}
              >
                <div onClick={() => {
                  dispatch(Actions.entityList.editStart({ item }));
                }}
                >
                  <div className={classes.alignCenter}>
                    <Avatar src={`/assets/images/${ek.gicon}`} alt={ek.gicon} className={classes.margin} />
                    {item.title}
                  </div>
                  <div>{`Локация: ${zone.title}`}</div>
                </div>
                <div className={classes.grow} />
                <div className={classes.alignCenter}>
                  <Button
                    className={classes.margin}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(Actions.mainview.requestOnlineGameMode(config.realtime.url, auth))
                        .then(() => {
                          dispatch(Actions.mainview.setSelectedObject(item));
                          dispatch(Actions.mainview.setCameraPosition({ x: item.xx - 400, y: item.yy - 200 }));
                        });
                    }}
                  >
                    В игровой мир
                  </Button>
                  <Button
                    className={classes.margin}
                  >
                    Уволить
                  </Button>
                </div>
              </Paper>
            );
          }) : <div>Нет</div>)}
        </Paper>
        <div className="container-general--header">
          <Button
            className={classes.margin}
            onClick={() => dispatch(Actions.entityList.createStart({ item: { title: 'новый аватар' } }))}
          >
            Добавить аватар
          </Button>
        </div>
      </div>
      {(entityList.itemToChange.data ? (
        <Edit
          route={null}
        />
      ) : null)}

      {/* <RealityList /> */}
    </>
  );
};

List.propTypes = {
  auth: PropTypes.object.isRequired,
  zoneList: PropTypes.object.isRequired,
  entityList: PropTypes.object.isRequired,
  entityKindList: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
