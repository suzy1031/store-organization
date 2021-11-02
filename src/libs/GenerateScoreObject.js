const HR = 'hr';
const VMD = 'vmd';
const CS = 'cs';
const STOCK = 'stock';
const PC = 'pc';

export const generateScoreObject = (lowData) => {
  let obj = {
    hr: 0,
    vmd: 0,
    cs: 0,
    stock: 0,
    pc: 0,
  };

  lowData.map((data) => {
    if (data.skillName === HR) {
      obj[HR] = data.level;
    }
    if (data.skillName === VMD) {
      obj[VMD] = data.level;
    }
    if (data.skillName === CS) {
      obj[CS] = data.level;
    }
    if (data.skillName === STOCK) {
      obj[STOCK] = data.level;
    }
    if (data.skillName === PC) {
      obj[PC] = data.level;
    }
    return {};
  });
  return obj;
};

export const generateTeamScoreObject = (teamData) => {
  let teamHrLevel = 0;
  let teamVmdLevel = 0;
  let teamCsLevel = 0;
  let teamStockLevel = 0;
  let teamPcLevel = 0;
  teamData.map((data) => {
    data.skills.map((skill) => {
      if (skill.skillName === HR) {
        teamHrLevel += skill.level;
      }
      if (skill.skillName === VMD) {
        teamVmdLevel += skill.level;
      }
      if (skill.skillName === CS) {
        teamCsLevel += skill.level;
      }
      if (skill.skillName === STOCK) {
        teamStockLevel += skill.level;
      }
      if (skill.skillName === PC) {
        teamPcLevel += skill.level;
      }
      return {};
    });
    return {};
  });
  return {
    hr: teamHrLevel,
    vmd: teamVmdLevel,
    cs: teamCsLevel,
    stock: teamStockLevel,
    pc: teamPcLevel,
  };
};

export const generateTotalSkillObject = (array) => {
  let hrResult = 0;
  let vmdResult = 0;
  let csResult = 0;
  let stockResult = 0;
  let pcResult = 0;

  array.map((skill) => {
    hrResult += skill.hr;
    vmdResult += skill.vmd;
    csResult += skill.cs;
    stockResult += skill.stock;
    pcResult += skill.pc;
    return {};
  });
  return {
    hr: hrResult,
    vmd: vmdResult,
    cs: csResult,
    stock: stockResult,
    pc: pcResult,
  };
};
