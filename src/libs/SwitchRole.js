const switchRole = (role) => {
  switch (role) {
    case 0:
      return '店長';
    case 1:
      return '副店長';
    case 2:
      return 'リーダー';
    case 3:
      return 'スタッフ';
    default:
      return '新人';
  }
};
export default switchRole;
