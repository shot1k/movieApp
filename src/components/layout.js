import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MovieIcon from "@material-ui/icons/Movie";
import axios from "axios";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MoviesLists from "./moviesList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MovieDetail from "./movieDetail";
import Grid from "@material-ui/core/Grid";
import ActorDetail from "./actorDetail";
import PopSeries from "./popSeries";
import PopSeriesDetail from "./popSeriesDetail";
import UpCpming from "./upComing";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Layout() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [genres, setGenres] = useState([]);
  let history = useHistory();

  useEffect(async () => {
    console.log("shemodis");
    var c = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=fed69657ba4cc6e1078d2a6a95f51c8c"
    );

    setGenres(c.data.genres);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function clickGerne(item) {
    history.push(`/genre/${item.id}/${item.name}`);

    console.log("click", item);
  }
  function moviesFinder(){
    console.log("Movies Finder")
  }

  function upcomingMovies(){
    console.log("Upcoming Movies")
    history.push(`/upcoming`);

  }

  function popularSeries(){
    console.log("Popular Series")
    history.push(`/popular/series`);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <div>
            <Grid container spacing={3}>
              <grid item xs={4}>
                <Button onClick={moviesFinder}>Movies Finder</Button>
              </grid>

              <grid item xs={4}>
                <Button onClick={upcomingMovies}>Upcoming Movies</Button>
              </grid>

              <grid item xs={4}>
                <Button onClick={popularSeries}>Popular Series</Button>
              </grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {genres.map((item) => (
            <ListItem button onClick={() => clickGerne(item)}>
              <ListItemIcon>{<MovieIcon />}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      

      <main className={classes.content}>
        
        <div className={classes.toolbar} />
        {/* <div >
          1111111111111111111111111
        </div>
         */}

        <Route path="/genre/:id/:name">
          <MoviesLists />
        </Route>
        <Route path="/movie/:id">
          <MovieDetail />
        </Route>
        <Route path="/actor/:id">
          <ActorDetail />
        </Route>
        <Route path="/popular/series">
          <PopSeries />
        </Route>
        <Route path="/tv/:id">
          <PopSeriesDetail />
        </Route>
        <Route path="/upcoming">
          <UpCpming />
        </Route>
      </main>
    </div>
  );
}
