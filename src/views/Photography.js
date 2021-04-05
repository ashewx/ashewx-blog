import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ButtonBase from "@material-ui/core/ButtonBase";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  section: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    "&:after": {
      content: "",
      flexGrow: "999999999",
    },
  },
  imgCont: {
    margin: "2px",
    position: "relative",
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.5,
      }
    },
  },
  separate: {
    display: "block",
  },
  img: {
    position: "absolute",
    top: 0,
    width: "100%",
    verticalAlign: "bottom",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create("opacity"),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  innerBackdrop: {
    height: 'calc(100% - 70px)',
    width: '100%',
    top: '70px',
    position: 'fixed',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  }
});

class Photography extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      activePhoto: null,
      open: false,
    };
  }

  componentDidMount() {
    // Load images from Google
    axios.get("https://ashewx-blog.herokuapp.com/photos").then((data) => {
      this.setState({
        images: [],
      });

      // Initial Image load and get image sizes
      data.data.map((x) => {
        let newImg = new Image();

        newImg.onload = () => {
          let height = newImg.height;
          let width = newImg.width;
          this.setState({
            images: [
              ...this.state.images,
              {
                url: `${x}=w500`,
                urlBig: `${x}=w1920`,
                urlPre: x,
                height,
                width,
              },
            ],
          });
        };
        newImg.src = `${x}=w500`; // this must be done AFTER setting onload
        return x;
      });
    });

    // Simulate media query
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
      activePhoto: null
    });
  };

  selectPhoto = (index) => {
    this.setState({
      open: true,
      activePhoto: index
    });
  };

  render() {
    const { classes } = this.props;
    const images = this.state.images;
    const imgRatio = this.state.screenWidth > 992 ? 250 : 100;

    return (
      <Container className={classes.root}>
        <section className={classes.section}>
          {images.map((x, i) => (
            <ButtonBase
              focusRipple
              className={classes.imgCont}
              style={{
                width: `${(x.width * imgRatio) / x.height}px`,
                flexGrow: `${(x.width * imgRatio) / x.height}px`,
              }}
              onClick={() => this.selectPhoto(i)}
              focusVisibleClassName={classes.focusVisible}
              key={i}
            >
              <i
                className={classes.separate}
                style={{ paddingBottom: `${(x.height / x.width) * 100}%` }}
              />
              <img className={classes.img} src={x.url} alt="" loading="lazy" />
              <span className={classes.imageBackdrop} />
            </ButtonBase>
          ))}
        </section>
        <Backdrop className={classes.backdrop} open={this.state.open} onClick={this.handleClose}>
          <div className={classes.innerBackdrop}>
            {this.state.activePhoto ?
            <img style={{height:'100%'}} src={this.state.images[this.state.activePhoto].urlBig} alt="" loading="lazy" />:
            <CircularProgress color="secondary" size={250} />
            }
          </div>
        </Backdrop>
      </Container>
    );
  }
}

Photography.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Photography);
