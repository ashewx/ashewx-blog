import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ButtonBase from "@material-ui/core/ButtonBase";
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
});

class Photography extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      activePhoto: null,
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

  render() {
    const { classes } = this.props;
    const images = this.state.images;
    const imgRatio = this.state.screenWidth > 992 ? 250 : 100;

    return (
      <Container className={classes.root}>
        <section className={classes.section}>
          {images.map((x) => (
            <ButtonBase
              focusRipple
              className={classes.imgCont}
              style={{
                width: `${(x.width * imgRatio) / x.height}px`,
                flexGrow: `${(x.width * imgRatio) / x.height}px`,
              }}
              focusVisibleClassName={classes.focusVisible}
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
      </Container>
    );
  }
}

Photography.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Photography);
