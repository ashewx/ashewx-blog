import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const styles = (theme) => ({
    root: {
      backgroundColor: theme.palette.primary.light,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      top: '64px',
      position: 'relative'
    }
});

class Blog extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        <h2>Coming Soon</h2>
      </Container>
    );
  }
}

Blog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Blog);
