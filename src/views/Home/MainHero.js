import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import Typography from "../../components/Typography";
import MainHeroLayout from "../../components/Heroes/MainHeroLayout";
import GitHub from "@material-ui/icons/GitHub";
import FaceBook from "@material-ui/icons/Facebook";
import Instagram from "@material-ui/icons/Instagram";
import Twitter from "@material-ui/icons/Twitter";
import LinkedIn from "@material-ui/icons/LinkedIn";
import BackgroundImage from "../../assets/homeBack.jpg";
import ProfilePic from "../../assets/profilePic.jpg";

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundColor: "#464648", // Average color of the background image.
    backgroundPosition: "center",
  },
  h2: {
    marginTop: theme.spacing(5),
  },
  h5: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(3),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
  profilePic: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    "@media (max-height: 700px)": {
      width: theme.spacing(24),
    height: theme.spacing(24),
    }
  },
});

function MainHero(props) {
  const { classes } = props;

  return (
    <MainHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={BackgroundImage}
        alt="increase priority"
      />
      <Avatar
        alt="Andrew Nguyen"
        src={ProfilePic}
        className={classes.profilePic}
      />
      <Typography
        color="inherit"
        align="center"
        variant="h2"
        marked="center"
        className={classes.h2}
      >
        Andrew Nguyen
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Software Engineer with a passion for web applications and frontend
        design. Ameteur photographer and self-proclaimed ukulele enthusiast.
      </Typography>
      <Box>
        <Tooltip title="GitHub" aria-label="GitHub">
          <IconButton
            aria-label="GitHub"
            href="https://github.com/ashewx"
            target="_blank"
          >
            <GitHub />
          </IconButton>
        </Tooltip>
        <Tooltip title="Facebook" aria-label="Facebook">
          <IconButton
            aria-label="Facebook"
            href="https://www.facebook.com/ashewx"
            target="_blank"
          >
            <FaceBook />
          </IconButton>
        </Tooltip>
        <Tooltip title="Instagram" aria-label="Instagram">
          <IconButton
            aria-label="Instagram"
            href="https://www.instagram.com/ashewx/"
            target="_blank"
          >
            <Instagram />
          </IconButton>
        </Tooltip>
        <Tooltip title="Twitter" aria-label="Twitter">
          <IconButton
            aria-label="Twitter"
            href="https://twitter.com/ashewx"
            target="_blank"
          >
            <Twitter />
          </IconButton>
        </Tooltip>
        <Tooltip title="LinkedIn" aria-label="Twitter">
          <IconButton
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/andrew-nguyen-08bbb2129/"
            target="_blank"
          >
            <LinkedIn />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Be sure to connect with me on social media!
      </Typography>
    </MainHeroLayout>
  );
}

MainHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainHero);
