import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  SvgIcon,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/ANoutline.svg";

const headersData = [
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Photography",
    href: "/photography",
  },
  {
    label: "Videos",
    href: "/videos",
  },
];

const useStyles = makeStyles((theme) => ({
  header: {
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
      paddingRight: 0
    },
  },
  menuButton: {
    padding: "13px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
  title: {
    display: "flex",
  },
  logo: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    color: "#FFFEFE",
    textAlign: "left",
  },
}));

export default function Header() {
  const {
    header,
    logo,
    menuButton,
    toolbar,
    drawerContainer,
    title,
  } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {titleLogo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar className={toolbar}>
        <Drawer
          {...{
            anchor: "right",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{titleLogo}</div>

        <IconButton
          {...{
            edge: "end",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
            style: {marginLeft: "38px"}
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const titleLogo = (
    <Link
      variant="h6"
      underline="none"
      color="inherit"
      className={title}
      href="/"
    >
      <SvgIcon className={logo}>
        <Logo/>
      </SvgIcon>
    </Link>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <AppBar className={header}>
      {mobileView ? displayMobile() : displayDesktop()}
    </AppBar>
  );
}
