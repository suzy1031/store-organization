import CalcAverageScore from '../libs/CalcAverageScore';
import {
  generateScoreObject,
  generateTeamScoreObject,
  generateTotalSkillObject,
} from '../libs/GenerateScoreObject';

const useCalculation = (smData, ssmData, department) => {
  // 店長
  const smSkill = generateScoreObject(smData.skills);
  const smCount = 1;

  // 副店長
  const ssmSkill = generateScoreObject(ssmData.skills);
  const ssmCount = 1;

  // アクセサリー
  const accTeam = department[0].members;
  const accTeamSkill = generateTeamScoreObject(accTeam);
  const accTeamMemberCount = department[0].members.length;

  // 靴下
  const socTeam = department[1].members;
  const socTeamSkill = generateTeamScoreObject(socTeam);
  const socTeamMemberCount = department[1].members.length;

  // 雑貨
  const zakkaTeam = department[2].members;
  const zakkaTeamSkill = generateTeamScoreObject(zakkaTeam);
  const zakkaTeamMemberCount = department[2].members.length;

  // 店舗の合計人数
  const storeTotalMembers =
    smCount +
    ssmCount +
    accTeamMemberCount +
    socTeamMemberCount +
    zakkaTeamMemberCount;

  const arrayData = [
    smSkill,
    ssmSkill,
    accTeamSkill,
    socTeamSkill,
    zakkaTeamSkill,
  ];

  const totalSkillObject = generateTotalSkillObject(arrayData);

  let hrAverageValue = 0;
  let vmdAverageValue = 0;
  let csAverageValue = 0;
  let stockAverageValue = 0;
  let pcAverageValue = 0;

  if (storeTotalMembers) {
    hrAverageValue = CalcAverageScore(totalSkillObject.hr, storeTotalMembers);
    vmdAverageValue = CalcAverageScore(totalSkillObject.vmd, storeTotalMembers);
    csAverageValue = CalcAverageScore(totalSkillObject.cs, storeTotalMembers);
    stockAverageValue = CalcAverageScore(
      totalSkillObject.stock,
      storeTotalMembers,
    );
    pcAverageValue = CalcAverageScore(totalSkillObject.pc, storeTotalMembers);
  }
  return {
    hr: hrAverageValue,
    vmd: vmdAverageValue,
    cs: csAverageValue,
    stock: stockAverageValue,
    pc: pcAverageValue,
  };
};
export default useCalculation;
