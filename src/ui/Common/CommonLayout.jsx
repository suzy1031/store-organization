import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';

import SideMenuDrawer from './SideMenuDrawer';
import Hidden from '@material-ui/core/Hidden';
import SpHeader from './SpCommonLayout';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const CommonLayout = ({ pageTitle }) => {
  const classes = useStyles();

  return (
    <>
      <Hidden smDown>
        <div className={classes.toolbar}>
          <Header headerTitle="レポート" />
          <SideMenuDrawer />
          <main className={classes.content}>
            <h1 style={{ color: 'black', margin: '60px 0 0 300px' }}>
              {pageTitle}
            </h1>
          </main>
        </div>
      </Hidden>
      <Hidden smUp>
        <SpHeader headerTitle={pageTitle}>
          <h2>{pageTitle}</h2>
        </SpHeader>
      </Hidden>
    </>
  );
};
export default CommonLayout;
