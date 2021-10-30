import React from 'react';
import Circle from 'react-circle';

const SkillCircle = ({ skillName, level, color, textColor, size }) => {
  return (
    <>
      <div style={{ fontWeight: 700 }}>{skillName}</div>
      <Circle
        animate
        size={size}
        progress={level}
        progressColor={color}
        textColor={textColor}
      />
    </>
  );
};
export default SkillCircle;
