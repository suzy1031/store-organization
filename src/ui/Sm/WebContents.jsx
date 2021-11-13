import React from 'react';
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

import { allStoreAverage } from '../../services/data';

import switchRole from '../../libs/SwitchRole';
import convertSkillName from '../../libs/ConvertSkillName';
import { levelColor } from '../../libs/LevelColor';

import Header from '../Common/Header';
import SideMenuDrawer from '../Common/SideMenuDrawer';
import StoreModal from './StoreModal';
import StaffModal from './StaffModal';
import SkillsRadarChart from './SkillsRadarChart';
import TalkCard from './TalkCard';

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

const WebContents = (props) => {
  const {
    handleStaffDetail,
    smData,
    ssmData,
    data,
    handleOpen,
    checked,
    toggleChecked,
    chartData,
    isDefault,
    isNext,
    setIsNext,
    setRadioChecked,
    radioChecked,
    setIsDefault,
    membersName,
    checkedMember,
    handleFinish,
    setCheckedMember,
    days,
    month,
    thisMonthData,
    open,
    handleClose,
    handleInput,
    submit,
    memberAddSubmit,
    type,
    staffModalOpen,
    handleStaffModalClose,
    staffData,
  } = props;
  const classes = useStyles();

  return (
    <>
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
      <div style={{ position: 'fixed', bottom: 10, right: 10 }}>
        <TalkCard
          isNext={isNext}
          setIsNext={setIsNext}
          setRadioChecked={setRadioChecked}
          radioChecked={radioChecked}
          isDefault={isDefault}
          setIsDefault={setIsDefault}
          membersName={membersName}
          checked={checkedMember}
          handleFinish={handleFinish}
          setCheckedMember={setCheckedMember}
          days={parseInt(days)}
          month={month + 1}
          thisMonthData={thisMonthData}
        />
      </div>
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
    </>
  );
};
export default WebContents;
