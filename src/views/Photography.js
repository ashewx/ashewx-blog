import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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
});

class Photography extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    axios.get("https://ashewx-blog.herokuapp.com/photos").then((data) => {
      this.setState({
        ...this.state,
        images: [],
      });

      // Initial Image load and get image sizes
      data.data.map((x) => {
        let newImg = new Image();

        newImg.onload = () => {
          let height = newImg.height;
          let width = newImg.width;
          this.setState({
            ...this.state,
            images: [
              ...this.state.images,
              {
                url: `${x}=w1024`,
                height,
                width,
              },
            ],
          });
        };
        newImg.src = `${x}=w1024`; // this must be done AFTER setting onload
        return x;
      });
    });
  }

  render() {
    const { classes } = this.props;
    const images = this.state.images;

    return (
      <Container className={classes.root}>
        <section className={classes.section}>
          {images.map((x) => (
            <div
              key={x.url}
              className={classes.imgCont}
              style={{
                width: `${(x.width * 250) / x.height}px`,
                flexGrow: `${(x.width * 250) / x.height}px`,
              }}
            >
              <i
                className={classes.separate}
                style={{ paddingBottom: `${(x.height / x.width) * 100}%` }}
              />
              <img className={classes.img} src={x.url} alt="" />
            </div>
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
