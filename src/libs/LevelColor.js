export const levelColor = (level) => {
  if (level >= 80) {
    return 'cornflowerblue';
  } else if (60 < level && level < 80) {
    return '#FF9900';
  } else {
    return '#FF6666';
  }
};

export const levelColorObject = (level) => {
  if (level >= 80) {
    return {
      background: 'cornflowerblue',
    };
  } else if (60 < level && level < 80) {
    return { background: '#FF9900' };
  } else {
    return { background: '#FF6666' };
  }
};
