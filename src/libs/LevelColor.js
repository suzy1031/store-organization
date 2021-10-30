const levelColor = (level) => {
  if (level >= 80) {
    return 'cornflowerblue';
  } else if (60 < level && level < 80) {
    return '#FF9900';
  } else {
    return '#FF6666';
  }
};
export default levelColor;
