import React, { memo } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

import { LawnColor } from '../../libs/LevelColor';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    position: 'relative',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  square: {
    height: 20,
    width: 20,
    borderRadius: 2,
    border: '1px solid black',
    margin: 2,
    textAlign: 'center',
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: '#17b397',
    padding: 0,
    '&$checked': {
      color: '#008080',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const radioGroupLabel = [
  { value: '9', label: '10分未満' },
  { value: '10', label: '10分' },
  { value: '60', label: '1時間' },
  { value: '61', label: '1時間以上' },
];

const TalkCard = memo((props) => {
  const {
    isNext,
    setIsNext,
    radioChecked,
    setRadioChecked,
    isDefault,
    setIsDefault,
    membersName,
    checked,
    handleFinish,
    setCheckedMember,
    days,
    month,
    thisMonthData,
  } = props;
  const classes = useStyles();
  console.log(thisMonthData);

  const checkListItem = membersName.map((member, index) => (
    <FormGroup key={index}>
      <FormControlLabel
        control={
          <GreenCheckbox
            id={`id_${index}`}
            checked={checked[`id_${index}`]}
            onChange={(event) =>
              setCheckedMember({
                ...checked,
                [event.target.id]: event.target.checked,
              })
            }
            name={member}
          />
        }
        label={member}
      />
    </FormGroup>
  ));

  const timeRadioGroup = radioGroupLabel.map((time, index) => (
    <FormControlLabel
      key={index}
      value={time.value}
      control={<Radio />}
      label={time.label}
    />
  ));

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <>
            {isDefault && !isNext && (
              <>
                <Typography variant="subtitle1" component="subtitle1">
                  {month}月
                </Typography>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: 240,
                    marginBottom: 10,
                  }}
                >
                  {thisMonthData.map((day, index) => (
                    <div
                      className={classes.square}
                      key={index}
                      style={LawnColor(day.time, day.members)}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>

                <Button
                  variant="contained"
                  color="inherit"
                  size="small"
                  endIcon={<ArrowForwardIosIcon />}
                  aria-label="arrow"
                  style={{ position: 'absolute', bottom: 0, right: 0 }}
                  onClick={() => setIsDefault(!isDefault)}
                >
                  会話記録
                </Button>
              </>
            )}
            {!isDefault && !isNext && (
              <>
                <Typography variant="subtitle1" component="subtitle1">
                  誰と？
                </Typography>
                <Box
                  style={{
                    height: 80,
                    width: 'auto',
                    overflowY: 'scroll',
                    border: '1px solid rgb(192, 192, 192)',
                    padding: '0 10px',
                    marginBottom: 10,
                  }}
                >
                  {checkListItem}
                </Box>
                <IconButton
                  aria-label="arrow"
                  style={{ position: 'absolute', bottom: 0, right: 0 }}
                  onClick={() => setIsNext(!isNext)}
                >
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </>
            )}
            {!isDefault && isNext && (
              <>
                <Typography variant="subtitle1" component="subtitle1">
                  どれくらい？
                </Typography>
                <Box
                  style={{
                    width: 240,
                    height: 80,
                    border: '1px solid rgb(192, 192, 192)',
                    padding: '0 5px',
                    marginBottom: 20,
                  }}
                >
                  <RadioGroup
                    aria-label="member"
                    name="member"
                    value={radioChecked}
                    onChange={(e) => setRadioChecked(e.target.value)}
                    row
                  >
                    {timeRadioGroup}
                  </RadioGroup>
                </Box>
                <div style={{ margin: 10 }}>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ position: 'absolute', bottom: 5, right: 5 }}
                    onClick={handleFinish}
                  >
                    登録
                  </Button>
                </div>
              </>
            )}
          </>
        </CardContent>
      </Card>
    </>
  );
});
export default TalkCard;
