import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const GreenCheckbox = withStyles({
  root: {
    color: '#17b397',
    '&$checked': {
      color: '#008080',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CheckButtonGroup = (props) => {
  const { data, handleChange, labelName, checked } = props;
  return (
    <Grid style={{ marginTop: 10 }}>
      <FormLabel>{labelName}</FormLabel>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {data.map((store, index) => (
          <FormGroup key={index} row>
            <FormControlLabel
              control={
                <GreenCheckbox
                  id={`id_${index}`}
                  checked={checked[`id_${index}`]}
                  onChange={handleChange}
                  name={
                    labelName === '店舗選択' ? store.storeName : store.areaName
                  }
                />
              }
              label={
                labelName === '店舗選択' ? store.storeName : store.areaName
              }
            />
          </FormGroup>
        ))}
      </Grid>
    </Grid>
  );
};
export default CheckButtonGroup;
