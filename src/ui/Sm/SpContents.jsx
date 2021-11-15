import React, { useState } from 'react';
import { Line } from 'rc-progress';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Drawer from '@material-ui/core/Drawer';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import AccountTreeIcon from '@material-ui/icons/AccountTree';
import TimelineIcon from '@material-ui/icons/Timeline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import switchRole from '../../libs/SwitchRole';
import convertSkillName from '../../libs/ConvertSkillName';
import { levelColor } from '../../libs/LevelColor';
import CalcBasicSkillPercent from '../../libs/CalcBasicSkillPercent';

import SpCommonLayout from '../Common/SpCommonLayout';
import SpSkillsRadarChart from './SpSkillsRadarChart';
import SkillCircle from '../Common/SkillCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  list: {
    width: 250,
    padding: 10,
  },
  fullList: {
    width: 'auto',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  hrLabel: {
    border: '1px solid gray',
    borderRadius: '4px',
    background: '#DDDDDD',
    padding: 3,
    margin: 5,
  },
}));

const SpContents = (props) => {
  const {
    smData,
    ssmData,
    data,
    checked,
    toggleChecked,
    chartData,
    staffData,
    setStaffData,
    allStoreAverage,
  } = props;

  const classes = useStyles();

  // タブ切替え
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // メンバー追加
  const [openModal, setOpenModal] = useState(false);

  // スタッフ詳細モーダル
  const [state, setState] = useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open, role, profile) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });

    if (role !== '') {
      role === 'sm' ? setStaffData(smData) : setStaffData(ssmData);
    } else {
      setStaffData(profile);
    }
  };

  const [skillTab, setSkillTab] = useState(0);

  const handleSkillTabChange = (event, newValue) => {
    setSkillTab(newValue);
  };

  // スタッフ詳細モーダルbody要素
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      {staffData && (
        <>
          <Avatar alt={staffData.staffName} src={staffData.image} />
          <h2 style={{ marginLeft: 5 }}>
            {staffData.staffName}（{switchRole(staffData.role)}）
          </h2>
          {(staffData.role === 0 || staffData.role === 1) && (
            <>
              {switchRole(staffData.role)}レベル: {staffData.smSkills.level}
              <Line
                percent={staffData.smSkills.level}
                strokeWidth="2"
                trailWidth="2"
                strokeColor="cornflowerblue"
                strokeLinecap="square"
              />
            </>
          )}
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Paper square>
              <Tabs
                value={skillTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleSkillTabChange}
                aria-label="disabled tabs example"
              >
                <Tab label="基本データ" />
                <Tab label="人事評価データ" />
              </Tabs>
            </Paper>
          </Grid>
          <div style={{ marginBottom: 15 }}></div>
          {skillTab === 0 ? (
            <>
              {staffData.viewCount && (
                <>
                  {staffData.hrData.map((hr, index) => (
                    <React.Fragment key={index}>
                      <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box className={classes.hrLabel}>
                          {hr.lastMonth}時間 / 月
                        </Box>
                        <Box className={classes.hrLabel}>
                          {hr.lastThreeMonth}時間 / 3ヶ月
                        </Box>
                        <Box className={classes.hrLabel}>
                          {hr.lastSixMonth}時間 / 6ヶ月
                        </Box>
                        <Box className={classes.hrLabel}>
                          {hr.lastOneYear}時間 / 1年
                        </Box>
                      </Grid>
                    </React.Fragment>
                  ))}
                  {staffData.viewCount.map((skill, index) => (
                    <React.Fragment key={index}>
                      <Box>クリップ</Box>
                      <Box>
                        完了:<em>{'　'}</em>
                        {CalcBasicSkillPercent(
                          skill.clipViewCount,
                          skill.clipTotal,
                        )}
                        %<em>{'　'}</em>
                        {skill.clipViewCount} / {skill.clipTotal}
                      </Box>
                      <Line
                        percent={CalcBasicSkillPercent(
                          skill.clipViewCount,
                          skill.clipTotal,
                        )}
                        strokeWidth="2"
                        trailWidth="2"
                        strokeColor={levelColor(
                          CalcBasicSkillPercent(
                            skill.clipViewCount,
                            skill.clipTotal,
                          ),
                        )}
                        strokeLinecap="square"
                      />
                      <Box>部門クリップ</Box>
                      <Box>
                        完了:<em>{'　'}</em>
                        {CalcBasicSkillPercent(
                          skill.depClipViewCount,
                          skill.depClipTotal,
                        )}
                        %<em>{'　'}</em>
                        {skill.depClipViewCount} / {skill.depClipTotal}
                      </Box>
                      <Line
                        percent={CalcBasicSkillPercent(
                          skill.depClipViewCount,
                          skill.depClipTotal,
                        )}
                        strokeWidth="2"
                        trailWidth="2"
                        strokeColor={levelColor(
                          CalcBasicSkillPercent(
                            skill.depClipViewCount,
                            skill.depClipTotal,
                          ),
                        )}
                        strokeLinecap="square"
                      />
                      <Box>ToDo</Box>
                      <Box>
                        完了:<em>{'　'}</em>
                        {CalcBasicSkillPercent(
                          skill.todoCleared,
                          skill.todoTotal,
                        )}
                        %<em>{'　'}</em>
                        {skill.todoCleared} / {skill.todoTotal}
                      </Box>
                      <Line
                        percent={CalcBasicSkillPercent(
                          skill.todoCleared,
                          skill.todoTotal,
                        )}
                        strokeWidth="2"
                        trailWidth="2"
                        strokeColor={levelColor(
                          CalcBasicSkillPercent(
                            skill.todoCleared,
                            skill.todoTotal,
                          ),
                        )}
                        strokeLinecap="square"
                      />
                      <Box>部門ToDo</Box>
                      <Box>
                        完了:<em>{'　'}</em>
                        {CalcBasicSkillPercent(
                          skill.depTodoCleared,
                          skill.depTodoTotal,
                        )}
                        %<em>{'　'}</em>
                        {skill.depTodoCleared} / {skill.depTodoTotal}
                      </Box>
                      <Line
                        percent={CalcBasicSkillPercent(
                          skill.depTodoCleared,
                          skill.depTodoTotal,
                        )}
                        strokeWidth="2"
                        trailWidth="2"
                        strokeColor={levelColor(
                          CalcBasicSkillPercent(
                            skill.depTodoCleared,
                            skill.depTodoTotal,
                          ),
                        )}
                        strokeLinecap="square"
                      />
                    </React.Fragment>
                  ))}
                </>
              )}
            </>
          ) : (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {staffData.skills.length >= 1 ? (
                <>
                  {staffData.skills.map((skill, index) => (
                    <React.Fragment key={index}>
                      <Box m={0.5}>
                        <SkillCircle
                          skillName={convertSkillName(skill.skillName)}
                          level={skill.level}
                          color={levelColor(skill.level)}
                          textColor={levelColor(skill.level)}
                          size={100}
                        />
                      </Box>
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <h3>人事評価データが連携されていません。</h3>
              )}
            </Grid>
          )}
          <div style={{ background: '#333333' }}>
            <Box
              display="flex"
              justifyContent="center"
              style={{ marginTop: 5 }}
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <CloseIcon style={{ color: '#fff' }} />
              <Box style={{ padding: 2, color: '#fff' }}>閉じる</Box>
            </Box>
          </div>
        </>
      )}
    </div>
  );

  return (
    <SpCommonLayout headerTitle="組織図">
      <Paper square className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab icon={<AccountTreeIcon />} label="組織図" />
          <Tab icon={<TimelineIcon />} label="グラフ" />
        </Tabs>
      </Paper>
      {value === 0 ? (
        // 組織図タブ
        <>
          <Box
            style={{
              marginTop: 15,
              fontWeight: 900,
            }}
          >
            店長
          </Box>
          <Box display="flex" style={{ marginTop: 5 }}>
            <Avatar
              alt={smData.staffName}
              src={smData.image}
              style={{ border: '1px solid gray' }}
            />
            <Box
              p={1}
              onClick={toggleDrawer('bottom', true, 'sm')}
              style={{ textDecoration: 'underline', color: 'cornflowerblue' }}
            >
              {smData.staffName}
            </Box>
          </Box>
          <Box style={{ marginTop: 15, fontWeight: 900 }}>副店長</Box>
          <Box display="flex" style={{ marginTop: 5 }}>
            <Avatar
              alt={ssmData.staffName}
              src={ssmData.image}
              style={{ border: '1px solid gray' }}
            />
            <Box
              p={1}
              onClick={toggleDrawer('bottom', true, 'ssm')}
              style={{ textDecoration: 'underline', color: 'cornflowerblue' }}
            >
              {ssmData.staffName}
            </Box>
          </Box>
          <div style={{ marginBottom: 15 }}></div>
          {data.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  {item.departmentName}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  style={{ position: 'relative' }}
                >
                  {item.members.length >= 1 &&
                    item.members.map((profile, index) => (
                      <Box display="flex" style={{ marginTop: 5 }} key={index}>
                        <Avatar
                          alt={profile.staffName}
                          src={profile.image}
                          style={{ border: '1px solid gray' }}
                        />
                        <Box
                          p={1}
                          style={{
                            textDecoration: 'underline',
                            color: 'cornflowerblue',
                          }}
                          onClick={toggleDrawer('bottom', true, '', profile)}
                        >
                          {profile.staffName}
                        </Box>
                      </Box>
                    ))}
                </Grid>
                <PersonAddIcon
                  style={{ position: 'absolute', right: 5, bottom: 10 }}
                  onClick={() => setOpenModal(true)}
                />
              </AccordionDetails>
            </Accordion>
          ))}
          {/* スタッフ詳細モーダル */}
          <Drawer
            anchor={'bottom'}
            open={state['bottom']}
            onClose={toggleDrawer('bottom', false)}
          >
            {list('bottom')}
          </Drawer>
          {/* メンバー追加モーダル */}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openModal}
            onClose={() => setOpenModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openModal}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">
                  PCまたはIPadから<br></br>メンバー追加ができます。
                </h2>
              </div>
            </Fade>
          </Modal>
        </>
      ) : (
        // チャートタブ
        <>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: 20 }}
          >
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
          <SpSkillsRadarChart
            chartData={chartData}
            checked={checked}
            allStoreAverage={allStoreAverage}
          />
        </>
      )}
    </SpCommonLayout>
  );
};
export default SpContents;
