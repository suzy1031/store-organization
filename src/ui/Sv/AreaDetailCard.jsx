import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const AreaDetailCard = (props) => {
  const { classes, index, store, levelColorObject } = props;
  return (
    <React.Fragment key={index}>
      <Box display="flex">
        <div className={classes.tagCircle} style={store.style}></div>
        <h3 id={`id_${index}`}>{store.areaName}</h3>
      </Box>
      <Card key={index} className={classes.cardRoot} variant="outlined">
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
  );
};
export default AreaDetailCard;
