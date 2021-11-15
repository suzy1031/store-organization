import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Hidden from '@material-ui/core/Hidden';

import {
  storeManager,
  storeSubManager,
  department,
  initData,
  allStoreAverage,
} from '../../services/data';

import useCalculation from '../../application/CalcStoreAverage';
import useGenerateMonthObject from '../../application/GrowLawn';

import WebContents from './WebContents';
import SpContents from './SpContents';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

function StoreOrganization() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [type, setType] = useState({
    type: '',
    name: '',
  });

  const [selected, setSelected] = useState('');

  // モーダル表示切替え
  const handleOpen = (buttonType) => {
    setSelected(buttonType);
    if (buttonType === 'departmentName') {
      setType({
        attribute: buttonType,
        name: '部門',
      });
    } else {
      setType({
        attribute: 'staffName',
        name: 'メンバー',
      });
    }
    setOpen(true);
  };

  // モーダル閉じる
  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState({});

  const handleInput = (e) => {
    setValue({
      [e.target.name]: e.target.value,
    });
  };

  const [data, setData] = useState(department);

  // 部門追加
  const submit = () => {
    const pushData = {
      ...value,
      members: [],
    };
    department.push(pushData);
    setOpen(false);
  };

  // メンバー追加
  const memberAddSubmit = () => {
    const inputMember = {
      ...value,
      image: '/images/user.jpeg',
      role: 4,
      skills: [
        { skillName: 'hr', level: 50 },
        { skillName: 'vmd', level: 50 },
        { skillName: 'cs', level: 50 },
        { skillName: 'stock', level: 50 },
        { skillName: 'pc', level: 50 },
      ],
    };
    for (let i = 0; i < department.length; i++) {
      if (selected === department[i].departmentName) {
        department[i].members.push(inputMember);
      }
    }
    setOpen(false);
  };

  const [staffModalOpen, setStaffModalOpen] = useState(false);
  const [staffData, setStaffData] = useState(null);
  const [smData, setSmData] = useState(storeManager);
  const [ssmData, setSsmData] = useState(storeSubManager);

  // メンバーモーダル開く
  const handleStaffDetail = (profile) => {
    setStaffData(profile);
    setStaffModalOpen(true);
  };

  // メンバーモーダル閉じる
  const handleStaffModalClose = () => {
    setStaffModalOpen(false);
  };

  const [chartData, setChartData] = useState(initData);

  // レーダーチャートデータオブジェクト
  const { hr, vmd, cs, stock, pc } = useCalculation(
    smData,
    ssmData,
    department,
  );

  useEffect(() => {
    setChartData({
      sm: smData.smSkills.level,
      ssm: ssmData.smSkills.level,
      hr: hr,
      vmd: vmd,
      cs: cs,
      stock: stock,
      pc: pc,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [checked, setChecked] = useState(false);

  // 全店レーダーチャート表示
  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  // TalkCard
  const [isNext, setIsNext] = useState(false);
  const [isDefault, setIsDefault] = useState(true);
  const handleFinish = () => {
    setIsDefault(!isDefault);
    setIsNext(!isNext);
  };

  const [radioChecked, setRadioChecked] = useState('9');

  const [membersName, setMembersName] = useState([]);
  const [checkedMember, setCheckedMember] = useState({});
  useEffect(() => {
    const members = data.map((department) =>
      department.members.map((staffs) => staffs.staffName),
    );
    let membersArray = [];
    for (let i = 0; i < members.length; i++) {
      membersArray.push(...members[i]);
    }
    setMembersName(membersArray);
  }, []);

  const { days, month, thisMonthData, setThisMonthData } =
    useGenerateMonthObject();

  return (
    <div className={classes.root}>
      <Hidden smDown>
        <WebContents
          handleStaffDetail={handleStaffDetail}
          smData={smData}
          ssmData={ssmData}
          data={data}
          handleOpen={handleOpen}
          checked={checked}
          toggleChecked={toggleChecked}
          chartData={chartData}
          isDefault={isDefault}
          isNext={isNext}
          setIsNext={setIsNext}
          setRadioChecked={setRadioChecked}
          radioChecked={radioChecked}
          setIsDefault={setIsDefault}
          membersName={membersName}
          checkedMember={checkedMember}
          handleFinish={handleFinish}
          setCheckedMember={setCheckedMember}
          days={days}
          month={month}
          thisMonthData={thisMonthData}
          open={open}
          handleClose={handleClose}
          handleInput={handleInput}
          submit={submit}
          memberAddSubmit={memberAddSubmit}
          type={type}
          staffModalOpen={staffModalOpen}
          handleStaffModalClose={handleStaffModalClose}
          staffData={staffData}
        />
      </Hidden>
      <Hidden smUp>
        <SpContents
          smData={smData}
          ssmData={ssmData}
          data={data}
          checked={checked}
          toggleChecked={toggleChecked}
          chartData={chartData}
          staffData={staffData}
          setStaffData={setStaffData}
          allStoreAverage={allStoreAverage}
        />
      </Hidden>
    </div>
  );
}

export default StoreOrganization;
