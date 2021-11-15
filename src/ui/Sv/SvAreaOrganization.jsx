import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

import WebContents from './WebContents';
import SpContents from './SpContents';

import { stores, initData, area, otherArea } from '../../services/data';

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
    paddingTop: theme.spacing(3),
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
  selectFormControl: {
    margin: theme.spacing(1),
    width: 200,
  },
}));

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

  const [radioChecked, setRadioChecked] = useState('myArea');
  const handleAreaChange = (event) => {
    setRadioChecked(event.target.value);
  };

  const [myAreaData, setMyAreaData] = useState(area);
  const [otherAreaData, setOtherAreaData] = useState(otherArea);
  const [selected, setSelected] = useState('');
  const [targetData, setTargetData] = useState(null);
  const handleSelectChange = (event) => {
    setSelected(event.target.value);
    const selectedValue = event.target.value;

    if (selectedValue) {
      otherAreaData.map((store) => {
        if (store.areaName === selectedValue) {
          setTargetData(store);
        }
        return {};
      });
    }
  };

  return (
    <div className={classes.root}>
      <Hidden smDown>
        <WebContents
          radioChecked={radioChecked}
          handleAreaChange={handleAreaChange}
          areaStoreData={areaStoreData}
          handleChange={handleChange}
          checked={checked}
          selected={selected}
          handleSelectChange={handleSelectChange}
          chartData={chartData}
          chartDataB={chartDataB}
          chartDataC={chartDataC}
          myAreaData={myAreaData}
          otherAreaData={otherAreaData}
          targetData={targetData}
        />
      </Hidden>
      <Hidden smUp>
        <SpContents
          radioChecked={radioChecked}
          handleAreaChange={handleAreaChange}
          areaStoreData={areaStoreData}
          handleChange={handleChange}
          checked={checked}
          selected={selected}
          handleSelectChange={handleSelectChange}
          chartData={chartData}
          chartDataB={chartDataB}
          chartDataC={chartDataC}
          myAreaData={myAreaData}
          otherAreaData={otherAreaData}
          targetData={targetData}
        />
      </Hidden>
    </div>
  );
};
export default SvAreaOrganization;
