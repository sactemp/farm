export const isUserSignedIn = (state) => state.auth.user !== null;

export const isUserRoleContain = (state, roleName) => {
  const { roleList } = state,
    roleByName = roleList.items.size > 0 ? roleList.items.find((p) => p.TITLE.toUpperCase() === roleName.toUpperCase()) : null,
    userRoleList = state.userRoleList.items.size > 0 ? state.userRoleList.items.toList() : [],
    userRoles = userRoleList.filter((userRole) => userRole.USER_ID === state.user.USER_ID),
    role = roleByName && userRoleList.size > 0 ? userRoles.find((item) => roleByName.ROLE_ID === item.ROLE_ID) : null;

  return role;
};
