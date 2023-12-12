import { createSelector } from 'reselect';

const getFilterParams = (state) => state.userRoleList.selectorParams,

  getItemList = (state) => state.userRoleList,

  getUserRoleList = createSelector(
    [
      getFilterParams,
      getItemList,
    ],
    (params, itemList) => {
      if (params.USER_ID) {
        return {
          ...itemList,
          items: itemList.items.filter((item) => item.USER_ID === params.USER_ID),
        };
      }
      return itemList;
    },
  );

export default getUserRoleList;
