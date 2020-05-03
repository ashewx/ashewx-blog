import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import SvgIcon from '@material-ui/core/SvgIcon';
import AppBarWrapper from './AppBarWrapper';
import Button from '../Button';
import Toolbar, { styles as toolbarStyles } from '../Toolbar';
import { ReactComponent as Logo } from '../../assets/ANoutline.svg'

const styles = (theme) => ({
  title: {
    display: 'flex'
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white
  },
  logo: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  }
});

class AppBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBarWrapper position="fixed">
          <Toolbar className={classes.toolbar}>
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              className={classes.title}
              href="/"
            >
              <SvgIcon className={classes.logo}>
                <Logo />
              </SvgIcon>
            </Link>
            <div className={classes.right}>
              <Button>
                <Link
                  variant="h6"
                  underline="none"
                  className={clsx(classes.rightLink)}
                  href="/blog/"
                >
                  Blog
                </Link>
              </Button>
              <Button>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  className={classes.rightLink}
                  href="/photography/"
                >
                  Photography
                </Link>
              </Button>
              <Button>
                <Link
                  variant="h6"
                  underline="none"
                  className={clsx(classes.rightLink)}
                  href="/videos/"
                >
                  Videos
                </Link>
              </Button>
            </div>
          </Toolbar>
        </AppBarWrapper>
        <div className={classes.placeholder} />
      </div>
    );
  }
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);
