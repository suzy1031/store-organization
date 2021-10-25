import React from 'react';
import Circle from 'react-circle';
import { Line } from 'rc-progress';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({
  open,
  handleClose,
  profile,
  switchRole,
  convertSkillName,
  levelColor,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        {profile && (
          <>
          <Avatar
            alt={profile.staffName}
            src={profile.image}
          />
          <h2 style={{ marginLeft: 5}}>{profile?.staffName}（{switchRole(profile?.role)}）</h2>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
          {(profile.role === 0 || profile.role === 1) && (
            <>
              {switchRole(profile.role)}レベル: {profile?.smSkills.level}
              <Line percent={profile?.smSkills.level} strokeWidth="2" trailWidth="2" strokeColor="cornflowerblue" strokeLinecap="square" />
              <br></br>
            </>
          )}
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {profile.skills.map((skill, index) => (
              <React.Fragment key={index}>
                <Box m={0.5}>
                  <div style={{ fontWeight: 700 }}>{convertSkillName(skill.skillName)}</div>
                  <Circle
                    animate
                    progress={skill.level}
                    progressColor={levelColor(skill.level)}
                    textColor={levelColor(skill.level)}
                  />
                </Box>
              </React.Fragment>
            ))}
          </Grid>
          </>
        )}

      </Grid>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </>
  );
}
