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

export const LawnColor = (time, member) => {
  if (1 <= time && time < 10 && member <= 1) {
    return {
      color: '#fff',
      background: '#00FF00',
    };
  } else if (10 <= time && time < 60 && 3 <= member && member <= 5) {
    return {
      color: '#fff',
      background: '#00CC00',
    };
  } else if (60 < time && 5 <= member) {
    return {
      color: '#fff',
      background: '#004400',
    };
  } else if (time === 0 && member === 0) {
    return {};
  } else {
    return {
      color: '#fff',
      background: '#007700',
    };
  }
};
