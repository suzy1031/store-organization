import React from 'react';
import { Line } from 'rc-progress';
import { Link } from 'react-router-dom';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import StoreRadarChart from './StoreRadarChart';

import { levelColorObject } from '../../libs/LevelColor';

const AllAreaOrganization = (props) => {
  const {
    classes,
    data,
    checked,
    chartAreaData,
    chartAreaDataB,
    chartAreaDataC,
  } = props;
  return (
    <Grid container>
      <Grid item xs={5}>
        {data.map((store, index) => (
          <React.Fragment key={index}>
            {checked[`id_${index}`] && (
              <React.Fragment>
                <Box display="flex">
                  <div className={classes.tagCircle} style={store.style}></div>
                  <h3 id={`id_${index}`}>{store.areaName}</h3>
                </Box>
                <Card
                  key={index}
                  className={classes.cardRoot}
                  variant="outlined"
                >
                  <CardContent>
                    <Box display="flex" flexWrap="wrap" sx={{ minWidth: 335 }}>
                      {store.stores.map((profile, index) => (
                        <React.Fragment key={index}>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              margin: '10px 0',
                            }}
                          >
                            <Link to="/sm">{profile.storeName}</Link>
                          </div>
                          <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                          >
                            <Box>
                              <div
                                style={{
                                  fontSize: 12,
                                  fontWeight: 700,
                                  margin: '0px 10px',
                                }}
                              >
                                店長レベル
                                <span
                                  className={classes.levelButton}
                                  style={levelColorObject(profile.smLevel)}
                                >
                                  {profile.smLevel}
                                </span>
                              </div>
                            </Box>
                            <Box>
                              <div
                                style={{
                                  fontSize: 12,
                                  fontWeight: 700,
                                  margin: '0px 10px',
                                }}
                              >
                                副店長レベル
                                <span
                                  className={classes.levelButton}
                                  style={levelColorObject(profile.ssmLevel)}
                                >
                                  {profile.ssmLevel}
                                </span>
                              </div>
                            </Box>
                            <div
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                margin: '2px 10px',
                                color: 'cornflowerblue',
                              }}
                            >
                              リーダー<em>{'　'}</em>
                              {profile.leaderCount}人
                            </div>
                            <div
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                margin: '2px 10px',
                                color: '#FF6666',
                              }}
                            >
                              新人<em>{'　'}</em>
                              {profile.newcomerCount}人
                            </div>
                          </Grid>
                        </React.Fragment>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
      </Grid>
      <Grid item xs={6}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <StoreRadarChart
            chartData={chartAreaData}
            chartDataB={chartAreaDataB}
            chartDataC={chartAreaDataC}
            checked={checked}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default AllAreaOrganization;
