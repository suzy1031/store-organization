const convertSkillName = (skillName) => {
  switch (skillName) {
    case 'sm':
      return '店長力';
    case 'ssm':
      return '副店長力';
    case 'hr':
      return '人事力';
    case 'vmd':
      return 'VMD';
    case 'cs':
      return '接客';
    case 'stock':
      return 'ストック';
    case 'pc':
      return '事務';
    default:
      return '';
  }
};
export default convertSkillName;
