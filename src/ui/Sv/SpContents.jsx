import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar } from '@material-ui/core';

import AccountTreeIcon from '@material-ui/icons/AccountTree';
import TimelineIcon from '@material-ui/icons/Timeline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SpCommonLayout from '../Common/SpCommonLayout';
import CheckButtonGroup from './CheckButtonGroup';
import SpStoreRadarChart from './SpStoreRadarChart';
import SpAreaDetailAccordion from './SpAreaDetailAccordion';
import SpCompareRadarChart from './SpCompareRadarChart';

import switchRole from '../../libs/SwitchRole';
import { otherArea } from '../../services/data';
import { levelColorObject } from '../../libs/LevelColor';
import { initData } from '../../services/data';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  tagCircle: {
    height: 20,
    width: 20,
    borderRadius: '50%',
    margin: '0 5px 0 0',
  },
  selectFormControl: {
    margin: theme.spacing(1),
    width: 200,
  },
  levelButton: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '20px',
    marginLeft: 3,
    color: '#FFF',
  },
}));

const SpContents = (props) => {
  const {
    radioChecked,
    handleAreaChange,
    areaStoreData,
    handleChange,
    checked,
    selected,
    handleSelectChange,
    chartData,
    chartDataB,
    chartDataC,
    myAreaData,
    otherAreaData,
    targetData,
  } = props;

  const classes = useStyles();

  const ownAreaData = myAreaData[0].skills;
  const ownAreaName = myAreaData[0].areaName;
  const compareAreaData = targetData?.skills || initData;
  const compareAreaName = targetData?.areaName || '';

  // タブ切替え
  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <SpCommonLayout headerTitle="組織図（SV）">
      <Grid>
        <FormLabel component="legend">エリア選択</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={radioChecked}
          onChange={handleAreaChange}
          row
        >
          <FormControlLabel
            value="myArea"
            control={<Radio />}
            label="自エリア"
          />
          <FormControlLabel
            value="allArea"
            control={<Radio />}
            label="全エリア"
          />
        </RadioGroup>
      </Grid>
      {radioChecked === 'myArea' ? (
        <CheckButtonGroup
          labelName="店舗選択"
          data={areaStoreData}
          handleChange={handleChange}
          checked={checked}
        />
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <FormControl className={classes.selectFormControl}>
            <InputLabel id="demo-simple-select-label">比較エリア</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selected}
              onChange={handleSelectChange}
              label="比較エリア"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {otherArea.map((store, index) => (
                <MenuItem key={index} value={store.areaName}>
                  {store.areaName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
      {radioChecked === 'myArea' ? (
        <>
          <Paper square className={classes.root}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="icon label tabs example"
            >
              <Tab icon={<AccountTreeIcon />} label="店舗リスト" />
              <Tab icon={<TimelineIcon />} label="スキルグラフ" />
            </Tabs>
          </Paper>
          <div style={{ marginBottom: 20 }}></div>
          {value === 0 ? (
            <>
              {areaStoreData.map((store, index) => (
                <React.Fragment key={index}>
                  {checked[`id_${index}`] && (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>
                          <Box display="flex">
                            <div
                              className={classes.tagCircle}
                              style={store.style}
                            ></div>
                            <Box>{store.storeName}</Box>
                          </Box>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="flex-start"
                        >
                          <Link to="/sm">
                            <h3 id={`id_${index}`}>詳細へ</h3>
                          </Link>

                          {store.members.map((profile, index) => (
                            <Box key={index} style={{ marginBottom: 5 }}>
                              <div style={{ fontWeight: 900 }}>
                                {switchRole(profile.role)}
                              </div>
                              <Box display="flex">
                                <Avatar
                                  alt={profile.staffName}
                                  src={profile.image}
                                />
                                <Box p={1}>{profile.staffName}</Box>
                              </Box>
                            </Box>
                          ))}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  )}
                </React.Fragment>
              ))}
            </>
          ) : (
            <SpStoreRadarChart
              chartData={chartData}
              chartDataB={chartDataB}
              chartDataC={chartDataC}
              checked={checked}
            />
          )}
        </>
      ) : (
        <>
          <Paper square className={classes.root}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="icon label tabs example"
            >
              <Tab icon={<AccountTreeIcon />} label="店舗比較" />
              <Tab icon={<TimelineIcon />} label="スキル比較" />
            </Tabs>
          </Paper>
          <div style={{ marginBottom: 20 }}></div>
          {value === 0 ? (
            <>
              {myAreaData.map((store, index) => (
                <SpAreaDetailAccordion
                  classes={classes}
                  index={index}
                  store={store}
                  levelColorObject={levelColorObject}
                  key={index}
                />
              ))}
              <div style={{ marginBottom: 10 }}></div>
              <Box display="flex" justifyContent="center">
                <Box p={1} style={{ fontWeight: 900, fontSize: 18 }}>
                  VS
                </Box>
              </Box>
              <div style={{ marginBottom: 10 }}></div>
              {targetData ? (
                <SpAreaDetailAccordion
                  classes={classes}
                  index={0}
                  store={targetData}
                  levelColorObject={levelColorObject}
                />
              ) : (
                <Box display="flex" justifyContent="center">
                  <Box p={1} style={{ fontWeight: 900, fontSize: 18 }}>
                    比較エリアが選択されていません
                  </Box>
                </Box>
              )}
            </>
          ) : (
            <SpCompareRadarChart
              ownAreaName={ownAreaName}
              ownAreaData={ownAreaData}
              compareAreaData={compareAreaData}
              compareAreaName={compareAreaName}
            />
          )}
        </>
      )}
    </SpCommonLayout>
  );
};
export default SpContents;
