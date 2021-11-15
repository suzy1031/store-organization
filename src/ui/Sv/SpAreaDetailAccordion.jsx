import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const SpAreaDetailAccordion = ({ store, index, classes, levelColorObject }) => {
  return (
    <Accordion key={index}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>
          <Box display="flex">
            <div className={classes.tagCircle} style={store.style}></div>
            <Box>{store.areaName}</Box>
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
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
export default SpAreaDetailAccordion;
