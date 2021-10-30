import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
  storeManager,
  storeSubManager,
  department,
  allStoreAverage,
  initData,
} from '../../services/data';

import switchRole from '../../libs/SwitchRole';
import convertSkillName from '../../libs/ConvertSkillName';
import levelColor from '../../libs/LevelColor';

import Header from '../Common/Header';
import SideMenuDrawer from '../Common/SideMenuDrawer';
import StoreModal from './StoreModal';
import StaffModal from './StaffModal';
import SkillsRadarChart from './SkillsRadarChart';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainColor: {
    background: '#17b397',
    '&:hover': {
      background: '#008080',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: 300,
  },

  cardRoot: {
    minWidth: 275,
    maxWidth: 330,
    border: '1px solid black',
    margin: 10,
  },
  title: {
    fontSize: 14,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
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
  const submit = () => {
    const pushData = {
      ...value,
      members: [],
    };
    department.push(pushData);
    setOpen(false);
  };

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
  const handleStaffDetail = (profile) => {
    setStaffData(profile);
    setStaffModalOpen(true);
  };

  const handleStaffModalClose = () => {
    setStaffModalOpen(false);
  };

  const [chartData, setChartData] = useState(initData);
  useEffect(() => {
    const result = calcStoreSkillLevel();
    setChartData({
      sm: smData.smSkills.level,
      ssm: ssmData.smSkills.level,
      hr: result.hr,
      vmd: result.vmd,
      cs: result.cs,
      stock: result.stock,
      pc: result.pc,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calcStoreSkillLevel = () => {
    let hrLevelResult = 0;
    let vmdLevelResult = 0;
    let csLevelResult = 0;
    let stockLevelResult = 0;
    let pcLevelResult = 0;

    let storeMemberCount = 0;

    const HR = 'hr';
    const VMD = 'vmd';
    const CS = 'cs';
    const STOCK = 'stock';
    const PC = 'pc';

    /**
     * {hr: 99, vmd: 99, cs: 99, stock: 99, pc: 99}のobject型にキャストする処理
     * 店長、副店長・・・のobjectを作成
     * 変数に足して代入する
     */

    // 店長
    for (let i = 0; i < smData.skills.length; i++) {
      if (smData.skills[i].skillName === HR) {
        hrLevelResult += smData.skills[i].level;
        storeMemberCount += 1;
      }
      if (smData.skills[i].skillName === VMD) {
        vmdLevelResult += smData.skills[i].level;
      }
      if (smData.skills[i].skillName === CS) {
        csLevelResult += smData.skills[i].level;
      }
      if (smData.skills[i].skillName === STOCK) {
        stockLevelResult += smData.skills[i].level;
      }
      if (smData.skills[i].skillName === PC) {
        pcLevelResult += smData.skills[i].level;
      }
    }

    // 副店長
    for (let i = 0; i < ssmData.skills.length; i++) {
      if (ssmData.skills[i].skillName === HR) {
        hrLevelResult += ssmData.skills[i].level;
        storeMemberCount += 1;
      }
      if (ssmData.skills[i].skillName === VMD) {
        vmdLevelResult += ssmData.skills[i].level;
      }
      if (ssmData.skills[i].skillName === CS) {
        csLevelResult += ssmData.skills[i].level;
      }
      if (ssmData.skills[i].skillName === STOCK) {
        stockLevelResult += ssmData.skills[i].level;
      }
      if (ssmData.skills[i].skillName === PC) {
        pcLevelResult += ssmData.skills[i].level;
      }
    }

    // todoループ処理修正 => 部門追加に対応する必要有り
    // アクセサリー
    const accTeamHrSkill = department[0].members;
    storeMemberCount += department[0].members.length;
    accTeamHrSkill.map((getSkills) => {
      getSkills.skills.map((skill) => {
        if (skill.skillName === HR) {
          hrLevelResult += skill.level;
        }
        if (skill.skillName === VMD) {
          vmdLevelResult += skill.level;
        }
        if (skill.skillName === CS) {
          csLevelResult += skill.level;
        }
        if (skill.skillName === STOCK) {
          stockLevelResult += skill.level;
        }
        if (skill.skillName === PC) {
          pcLevelResult += skill.level;
        }
      });
    });

    // 靴下
    const socTeamHrSkill = department[1].members;
    storeMemberCount += department[1].members.length;
    socTeamHrSkill.map((getSkills) => {
      getSkills.skills.map((skill) => {
        if (skill.skillName === HR) {
          hrLevelResult += skill.level;
        }
        if (skill.skillName === VMD) {
          vmdLevelResult += skill.level;
        }
        if (skill.skillName === CS) {
          csLevelResult += skill.level;
        }
        if (skill.skillName === STOCK) {
          stockLevelResult += skill.level;
        }
        if (skill.skillName === PC) {
          pcLevelResult += skill.level;
        }
      });
    });

    // 雑貨
    const zakkaTeamHrSkill = department[2].members;
    storeMemberCount += department[2].members.length;
    zakkaTeamHrSkill.map((getSkills) => {
      getSkills.skills.map((skill) => {
        if (skill.skillName === HR) {
          hrLevelResult += skill.level;
        }
        if (skill.skillName === VMD) {
          vmdLevelResult += skill.level;
        }
        if (skill.skillName === CS) {
          csLevelResult += skill.level;
        }
        if (skill.skillName === STOCK) {
          stockLevelResult += skill.level;
        }
        if (skill.skillName === PC) {
          pcLevelResult += skill.level;
        }
      });
    });

    let hrAverageValue = 0;
    let vmdAverageValue = 0;
    let csAverageValue = 0;
    let stockAverageValue = 0;
    let pcAverageValue = 0;

    if (storeMemberCount) {
      hrAverageValue = Math.round(hrLevelResult / storeMemberCount);
      vmdAverageValue = Math.round(vmdLevelResult / storeMemberCount);
      csAverageValue = Math.round(csLevelResult / storeMemberCount);
      stockAverageValue = Math.round(stockLevelResult / storeMemberCount);
      pcAverageValue = Math.round(pcLevelResult / storeMemberCount);
    }
    return {
      hr: hrAverageValue,
      vmd: vmdAverageValue,
      cs: csAverageValue,
      stock: stockAverageValue,
      pc: pcAverageValue,
    };
  };

  const [checked, setChecked] = useState(false);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      <Header headerTitle="組織図" />
      <SideMenuDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container>
          <Grid item xs={6}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                className={classes.mainColor}
                onClick={() => handleStaffDetail(smData)}
              >
                <Avatar alt={smData.staffName} src={smData.image} />
                <Box p={1} style={{ color: '#fff' }}>
                  {smData.staffName}
                </Box>
              </Button>
              <div
                style={{ height: '20px', border: '1px solid #c0c0c0' }}
              ></div>
              <Button
                variant="contained"
                className={classes.mainColor}
                onClick={() => handleStaffDetail(ssmData)}
              >
                <Avatar alt={ssmData.staffName} src={ssmData.image} />
                <Box p={1} style={{ color: '#fff' }}>
                  {ssmData.staffName}
                </Box>
              </Button>
              <div
                style={{ height: '20px', border: '1px solid #c0c0c0' }}
              ></div>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              style={{ border: '1px solid #c0c0c0', position: 'relative' }}
            >
              {data.map((item, index) => (
                <Card
                  key={index}
                  className={classes.cardRoot}
                  variant="outlined"
                >
                  <CardContent>
                    <Typography className={classes.title}>
                      <Link to="#">詳しく見る</Link>
                    </Typography>
                    <Box display="flex">
                      <Box p={1} flexGrow={1}>
                        <Typography variant="h5" component="h2">
                          {item.departmentName}
                        </Typography>
                      </Box>
                      <Box p={1}>
                        <Button
                          className={classes.mainColor}
                          style={{ color: '#fff', fontSize: 8 }}
                          onClick={() => handleOpen(item.departmentName)}
                        >
                          メンバー追加
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Box display="flex" flexWrap="wrap" sx={{ minWidth: 335 }}>
                      {item.members.length >= 1 ? (
                        item.members.map((profile, index) => (
                          <Button
                            size="small"
                            key={index}
                            variant="outlined"
                            onClick={() => handleStaffDetail(profile)}
                          >
                            <Avatar
                              alt={profile.staffName}
                              src={profile.image}
                              className={classes.small}
                            />
                            {profile.staffName}
                          </Button>
                        ))
                      ) : (
                        <>
                          <ErrorOutlineIcon />
                          メンバーがまだ登録されていません
                        </>
                      )}
                    </Box>
                  </CardActions>
                </Card>
              ))}
              <Button
                className={classes.mainColor}
                style={{
                  position: 'absolute',
                  bottom: 5,
                  right: 5,
                  color: '#fff',
                }}
                onClick={() => handleOpen('departmentName')}
              >
                部門を追加
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <h2 style={{ marginLeft: 40, marginRight: 10 }}>店舗レベル</h2>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={checked}
                      onChange={toggleChecked}
                      color="primary"
                    />
                  }
                  label={checked ? 'ON（全店と比較）' : 'OFF（全店と比較）'}
                />
              </FormGroup>
            </Grid>
            <SkillsRadarChart
              chartData={chartData}
              checked={checked}
              allStoreAverage={allStoreAverage}
            />
          </Grid>
        </Grid>
      </main>
      <StoreModal
        open={open}
        handleClose={handleClose}
        handleInput={handleInput}
        submit={submit}
        memberAddSubmit={memberAddSubmit}
        type={type}
      />
      <StaffModal
        open={staffModalOpen}
        handleClose={handleStaffModalClose}
        profile={staffData}
        switchRole={switchRole}
        convertSkillName={convertSkillName}
        levelColor={levelColor}
      />
    </div>
  );
}

export default StoreOrganization;
