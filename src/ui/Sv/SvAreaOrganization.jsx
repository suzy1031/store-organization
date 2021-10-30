import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Header from '../Common/Header';
import SideMenuDrawer from '../Common/SideMenuDrawer';
import StoreRadarChart from './StoreRadarChart';

import { stores, initData } from '../../services/data';
import switchRole from '../../libs/SwitchRole';

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

  formControl: {
    margin: theme.spacing(3),
  },
  title: {
    fontSize: 14,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  tagCircle: {
    height: 20,
    width: 20,
    borderRadius: '50%',
    margin: '16px 5px',
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: '#17b397',
    '&$checked': {
      color: '#008080',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const SvAreaOrganization = () => {
  const classes = useStyles();

  const [checked, setChecked] = useState({
    id_0: true,
    id_1: true,
    id_2: true,
  });
  const [areaStoreData, setAreaStoreData] = useState(stores);

  const handleChange = (event) => {
    setChecked({ ...checked, [event.target.id]: event.target.checked });
  };

  const [chartData, setChartData] = useState(initData);
  const [chartDataB, setChartDataB] = useState(initData);
  const [chartDataC, setChartDataC] = useState(initData);
  useEffect(() => {
    areaStoreData.map((store) => {
      if (store.storeName === '渋谷店') {
        setChartData(store.skills);
      }
      if (store.storeName === '原宿店') {
        setChartDataB(store.skills);
      }
      if (store.storeName === '新宿店') {
        setChartDataC(store.skills);
      }
      return {};
    });
  }, []);

  return (
    <div className={classes.root}>
      <Header headerTitle="エリアデータ" />
      <SideMenuDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container>
          <FormLabel style={{ margin: '15px 10px' }}>店舗選択</FormLabel>
          {areaStoreData.map((store, index) => (
            <FormGroup key={index} row>
              <FormControlLabel
                control={
                  <GreenCheckbox
                    id={`id_${index}`}
                    checked={checked[`id_${index}`]}
                    onChange={handleChange}
                    name={store.storeName}
                  />
                }
                label={store.storeName}
              />
            </FormGroup>
          ))}
        </Grid>
        <Grid container>
          <Grid item xs={5}>
            {areaStoreData.map((store, index) => (
              <React.Fragment key={index}>
                {checked[`id_${index}`] && (
                  <React.Fragment>
                    <Box display="flex">
                      <div
                        className={classes.tagCircle}
                        style={store.style}
                      ></div>
                      <h3 id={`id_${index}`}>{store.storeName}</h3>
                    </Box>
                    <Card
                      key={index}
                      className={classes.cardRoot}
                      variant="outlined"
                    >
                      <CardContent>
                        <Box
                          display="flex"
                          flexWrap="wrap"
                          sx={{ minWidth: 335 }}
                        >
                          {store.members.map((profile, index) => (
                            <Box mr={2} key={index}>
                              <div>{switchRole(profile.role)}</div>
                              <Button
                                size="small"
                                key={index}
                                variant="outlined"
                                onClick={() => console.log('click')}
                              >
                                <Avatar
                                  alt={profile.staffName}
                                  src={profile.image}
                                  className={classes.small}
                                />
                                {profile.staffName}
                              </Button>
                            </Box>
                          ))}
                        </Box>
                        <Box mt={1}>
                          <Typography className={classes.title}>
                            <Link to="/sm">詳しく見る</Link>
                          </Typography>
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
                chartData={chartData}
                chartDataB={chartDataB}
                chartDataC={chartDataC}
                checked={checked}
              />
            </Grid>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};
export default SvAreaOrganization;
