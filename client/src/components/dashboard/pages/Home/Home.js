import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Button,
  Typography,
  Container,
  Grid,
  GridList,
  GridListTile,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import * as colors from '../../../../helpers/colors';
import { Image, Dashboard, ArrowForward } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  divider: {
    paddingBottom: theme.spacing(2),
    width: '40px',
    border: 0
  },
  paperHeader: {
    fontFamily: 'Raleway',
    textTransform: 'uppercase'
  },

  photoTile: {
    transition: 'all .1s ease-in-out',
    '&:hover': {
      opacity: '0.4',
      cursor: 'pointer'
    }
  }
}));

const modalStyle = {
  content: {
    left: 100,
    right: 100
  }
};

const Home = ({ user, profile }) => {
  const classes = useStyles();
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isPhotoOpen, setPhotoOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');

  const handleImageClick = index => {
    setPhotoOpen(true);
    setLightboxIndex(index);
  };

  const showText = text => {
    setModalOpen(true);
    setModalText(text);
  };

  const { photos, text } = profile;

  return (
    <Container component='main' maxWidth='lg'>
      <Paper elevation={2} className={classes.paper}>
        <Typography
          variant='h4'
          className={classes.paperHeader}
          style={{ display: 'flex' }}>
          <Dashboard
            fontSize='large'
            style={{
              color: colors.colorPurple,
              paddingRight: '10px'
            }}
          />
          Dashboard
        </Typography>

        <hr
          className={classes.divider}
          style={{ borderTop: '2px solid' + colors.colorPurple }}
        />
      </Paper>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} className={classes.paper}>
            <Typography
              variant='h4'
              className={classes.paperHeader}
              style={{ display: 'flex' }}>
              <Image
                fontSize='large'
                style={{
                  color: colors.colorPurple,
                  paddingRight: '10px'
                }}
              />
              Photos
            </Typography>

            <hr
              className={classes.divider}
              style={{ borderTop: '2px solid' + colors.colorPurple }}
            />

            <GridList cellHeight={160} cols={3} style={{ height: 500 }}>
              {photos.map((tile, index) => (
                <GridListTile key={index} cols={1}>
                  <img
                    src={tile}
                    className={classes.photoTile}
                    onClick={() => handleImageClick(index)}
                  />
                </GridListTile>
              ))}
            </GridList>

            {isPhotoOpen && (
              <Lightbox
                reactModalStyle={modalStyle}
                mainSrc={photos[lightboxIndex]}
                nextSrc={photos[(lightboxIndex + 1) % photos.length]}
                prevSrc={
                  photos[(lightboxIndex + photos.length - 1) % photos.length]
                }
                onCloseRequest={() => setPhotoOpen(false)}
                onMovePrevRequest={() =>
                  setLightboxIndex(
                    (lightboxIndex + photos.length - 1) % photos.length
                  )
                }
                onMoveNextRequest={() =>
                  setLightboxIndex((lightboxIndex + 1) % photos.length)
                }
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} className={classes.paper}>
            <Typography
              variant='h4'
              className={classes.paperHeader}
              style={{ display: 'flex' }}>
              <Image
                fontSize='large'
                style={{
                  color: colors.colorPurple,
                  paddingRight: '10px'
                }}
              />
              Text
            </Typography>

            <hr
              className={classes.divider}
              style={{ borderTop: '2px solid' + colors.colorPurple }}
            />

            <List
              style={{
                textAlign: 'center',
                height: 500
              }}>
              {text.map((tile, index) => (
                <ListItem key={index} button onClick={() => showText(tile)}>
                  <ListItemIcon>
                    <ArrowForward />
                  </ListItemIcon>
                  <ListItemText primary={tile.substring(0, 35) + '...'} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {isModalOpen && (
        <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {modalText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color='primary' onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile
});

export default connect(mapStateToProps)(Home);
