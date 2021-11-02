import React from 'react';
import Grid from '@material-ui/core/Grid';

import CompareRadarChart from './CompareRadarChart';
import AreaDetailCard from './AreaDetailCard';

import { levelColorObject } from '../../libs/LevelColor';
import { initData } from '../../services/data';

const AllAreaOrganization = (props) => {
  const { classes, data, targetData } = props;

  const ownAreaData = data[0].skills;
  const ownAreaName = data[0].areaName;
  const compareAreaData = targetData?.skills || initData;
  const compareAreaName = targetData?.areaName || '';

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={5}>
          {data.map((store, index) => (
            <AreaDetailCard
              classes={classes}
              index={index}
              store={store}
              levelColorObject={levelColorObject}
            />
          ))}
        </Grid>
        <Grid item xs={5}>
          <Grid>
            {targetData && (
              <AreaDetailCard
                classes={classes}
                index={0}
                store={targetData}
                levelColorObject={levelColorObject}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ margin: '0 -190px' }}
      >
        <CompareRadarChart
          ownAreaName={ownAreaName}
          ownAreaData={ownAreaData}
          compareAreaData={compareAreaData}
          compareAreaName={compareAreaName}
        />
      </Grid>
    </>
  );
};
export default AllAreaOrganization;
