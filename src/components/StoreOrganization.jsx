import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { department } from '../data/data';
import { Link } from 'react-router-dom';
import Header from './Header';
import SideMenuDrawer from './SideMenuDrawer';
import StoreModal from './StoreModal';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  mainColor: {
    background: '#17b397',
    '&:hover': {
      background: '#008080',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  cardRoot: {
    minWidth: 275,
    maxWidth: 330,
    border: '1px solid black',
    margin: 10,
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
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

function StoreOrganization() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState({
    type: '',
    name: '',
  });

  const [selected, setSelected] = React.useState('');
  const handleOpen = (buttonType) => {
    setSelected(buttonType);
    if (buttonType === 'departmentName') {
      setType({
        attribute: buttonType,
        name: '部門',
      });
    } else {
      setType({
        attribute: 'staffName',
        name: 'メンバー',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState({});

  const handleInput = (e) => {
    setValue({
      [e.target.name]: e.target.value,
    });
  };

  const [data, setData] = React.useState(department);
  const submit = () => {
    const pushData = {
      ...value,
      members: [],
    };
    department.push(pushData);
    setOpen(false);
  };

  const memberAddSubmit = () => {
    const inputMember = {
      ...value,
      image: '/images/user.jpeg',
    };
    for (let i = 0; i < department.length; i++) {
      if (selected === department[i].departmentName) {
        department[i].members.push(inputMember);
      }
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Header headerTitle='組織図' />
      <SideMenuDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
        >
          <Button variant='contained' className={classes.mainColor}>
            <Avatar alt='kohei' src='/images/kohei.jpg' />
            <Box p={1} style={{ color: '#fff' }}>
              菅原 康平
            </Box>
          </Button>
          <div style={{ height: '20px', border: '1px solid #c0c0c0' }}></div>
          <Button variant='contained' className={classes.mainColor}>
            <Avatar alt='kohei' src='/images/fukada.jpeg' />
            <Box p={1} style={{ color: '#fff' }}>
              深田 恭子
            </Box>
          </Button>
          <div style={{ height: '20px', border: '1px solid #c0c0c0' }}></div>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='flex-start'
            style={{ border: '1px solid #c0c0c0', position: 'relative' }}
          >
            {data.map((item, index) => (
              <Card key={index} className={classes.cardRoot} variant='outlined'>
                <CardContent>
                  <Typography className={classes.title}>
                    <Link to='#'>詳しく見る</Link>
                  </Typography>
                  <Box display='flex'>
                    <Box p={1} flexGrow={1}>
                      <Typography variant='h5' component='h2'>
                        {item.departmentName}
                      </Typography>
                    </Box>
                    <Box p={1}>
                      <Button
                        className={classes.mainColor}
                        style={{ color: '#fff', fontSize: 8 }}
                        onClick={() => handleOpen(item.departmentName)}
                      >
                        メンバー追加
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <Box display='flex' flexWrap='wrap' sx={{ maxWidth: 300 }}>
                    {item.members.length >= 1 ? (
                      item.members.map((profile, index) => (
                        <Button size='small' key={index} variant='outlined'>
                          <Avatar
                            alt={profile.staffName}
                            src={profile.image}
                            className={classes.small}
                          />
                          {profile.staffName}
                        </Button>
                      ))
                    ) : (
                      <>
                        <ErrorOutlineIcon />
                        メンバーがまだ登録されていません
                      </>
                    )}
                  </Box>
                </CardActions>
              </Card>
            ))}
            <Button
              className={classes.mainColor}
              style={{
                position: 'absolute',
                bottom: 5,
                right: 5,
                color: '#fff',
              }}
              onClick={() => handleOpen('departmentName')}
            >
              部門を追加
            </Button>
          </Grid>
        </Grid>
      </main>
      <StoreModal
        open={open}
        handleClose={handleClose}
        handleInput={handleInput}
        submit={submit}
        memberAddSubmit={memberAddSubmit}
        type={type}
      />
    </div>
  );
}

export default StoreOrganization;
