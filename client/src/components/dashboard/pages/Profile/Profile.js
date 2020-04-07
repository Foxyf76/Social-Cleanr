import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  makeStyles,
  Grid,
  Button,
  IconButton,
} from '@material-ui/core';
import {
  Face,
  Mail,
  Today,
  Edit,
  Lock,
  DeleteForever,
} from '@material-ui/icons';
import * as colors from '../../../../helpers/colors';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeSite, getSocialMediaProfile } from '../../../../actions/profile';
import { IconHeader } from '../../../layout/IconHeader';
import { ProfileSocialMedia } from './ProfileSocialMedia';
import { MiniDivider } from '../../../layout/MiniDivider';
import EditDialog from './EditDialog';
import { toggleGamification } from '../../../../actions/user';
import { Gamification } from './Gamification';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& p, h3, h4, h5, h6': {
      fontFamily: 'Raleway',
    },
  },
  avatarFrame: {
    width: 210,
    height: 210,
    borderRadius: '50%',
    background:
      'linear-gradient(0deg, rgba(214,93,177,1) 0%, rgba(132,94,194,1) 100%)',
    display: ' flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    padding: '10px',
    borderRadius: '50%',
    width: 190,
    height: 190,
    backgroundColor: 'white',
  },
  name: {
    textTransform: 'uppercase',
    padding: '10px',
  },
  gridCell: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

const Profile = ({
  user,
  removeSite,
  profile,
  getSocialMediaProfile,
  toggleGamification,
}) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');

  const handleOpenDialog = (dialogType) => {
    setDialogType(dialogType);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleGamificationToggle = (toggle) => {
    toggleGamification(toggle);
  };

  const profileScore =
    100 -
    100 *
      (user.flagged_content.length / (user.total_images + user.total_posts));

  return (
    <Container component='main' maxWidth='lg' style={{ marginTop: '40px' }}>
      <Paper
        elevation={4}
        className={classes.paper}
        style={{
          background: colors.colorDarkOrange,
        }}>
        <IconHeader icon={Face} text='Profile' subheader={false} />
      </Paper>

      <Paper elevation={2} className={classes.paper}>
        <div className={classes.avatarFrame}>
          <img
            className={classes.avatar}
            variant='circle'
            src={user.avatar}
            alt='avatar'
          />
        </div>

        <Typography variant='h3' className={classes.name}>
          {user.name}
        </Typography>

        <MiniDivider color={'#4a4a4a'} />

        <div style={{ flexGrow: 1, width: '40%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <div className={classes.gridCell}>
                <Mail style={{ marginRight: '10px' }} />
                <Typography variant='h6'>Email</Typography>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <div className={classes.gridCell}>
                <Typography variant='h6'>{user.email}</Typography>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <div className={classes.gridCell}>
                <IconButton
                  size='small'
                  onClick={() => handleOpenDialog('email')}>
                  <Edit style={{ color: colors.colorDarkPink }} />
                </IconButton>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <div className={classes.gridCell}>
                <Lock style={{ marginRight: '10px' }} />
                <Typography variant='h6'>Password</Typography>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <div className={classes.gridCell}>
                <Typography variant='h6'>*************</Typography>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <div className={classes.gridCell}>
                <IconButton
                  size='small'
                  onClick={() => handleOpenDialog('password')}>
                  <Edit style={{ color: colors.colorDarkPink }} />
                </IconButton>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <div className={classes.gridCell}>
                <Today style={{ marginRight: '10px' }} />
                <Typography variant='h6'>Created</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className={classes.gridCell}>
                <Typography variant='h6'>{user.date.split('T')[0]}</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} />
          </Grid>
        </div>

        <MiniDivider color={'#4a4a4a'} />

        <Button
          variant='contained'
          size='large'
          onClick={() => handleOpenDialog('avatar')}
          style={{
            backgroundColor: colors.colorDarkPink,
            width: 220,
            color: 'white',
          }}>
          Change Avatar
        </Button>

        <br />

        <Button
          variant='contained'
          color='primary'
          size='large'
          style={{ backgroundColor: colors.colorDarkPink, width: 220 }}
          onClick={() => handleOpenDialog('delete')}
          endIcon={<DeleteForever />}>
          Delete Profile
        </Button>
      </Paper>

      <Gamification
        isEnabled={user.is_gamification_enabled}
        onToggleClick={(toggle) => handleGamificationToggle(toggle)}
        profileScore={profileScore}
      />

      <ProfileSocialMedia
        user={user}
        profile={profile}
        onRemoveClick={(website) => removeSite(website)}
        onSetActiveClick={(website) => getSocialMediaProfile(website)}
      />

      <EditDialog
        isOpen={dialogOpen}
        setOpen={handleOpenDialog}
        setClose={handleCloseDialog}
        editType={dialogType}
      />
    </Container>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  removeSite: PropTypes.func.isRequired,
  getSocialMediaProfile: PropTypes.func.isRequired,
  toggleGamification: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  removeSite,
  getSocialMediaProfile,
  toggleGamification,
})(Profile);
