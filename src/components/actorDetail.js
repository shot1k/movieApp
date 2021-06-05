import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, useParams, Link } from "react-router-dom";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function ActorDetail() {
  const classes = useStyles();
  const [actorName, setActorName] = useState([]);
  const [movieByActor, setMovieByActor] = useState([]);

  let { id } = useParams();
  let history = useHistory();

  useEffect(async () => {
    var c = await axios.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=fed69657ba4cc6e1078d2a6a95f51c8c`
    );

    var c1 = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=fed69657ba4cc6e1078d2a6a95f51c8c`
    );

    console.log("dddddddddddd", c1.data.cast);
    setMovieByActor(c1.data.cast);
    // console.log("actorDetail", ccc);
    setActorName(c.data);
  }, []);

  function actorNameDetail(actBy) {
    console.log("actorNameDetail", actBy);
    history.push(`/movie/${actBy.id}`);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                style={{ height: "500px", width: "350px" }}
                className={classes.media}
                image={`https://image.tmdb.org/t/p/w300/${actorName.profile_path}`}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {actorName.name}
                </Typography>

                <Typography variant="body2" color="textSecondary" component="p">
                  Birthday: {actorName.birthday}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Typography variant="body2" color="textSecondary" component="p">
                Place of Birth: {actorName.place_of_birth}
              </Typography>
            </CardActions>
            <CardActions>
              <Typography variant="body2" color="textSecondary" component="p">
                Popularity: {actorName.popularity}
              </Typography>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={9}>
          <div style={{display:"flex", flexWrap:"wrap" }}>
            {movieByActor.map((actBy) => (
                  <div>
                    <CardMedia
                      style={{
                        height: "280px",
                        width: "200px",
                      }}
                      className={classes.media}
                      image={`https://image.tmdb.org/t/p/w300/${actBy.poster_path}`}
                      title="Contemplative Reptile"
                    />
                    <Button
                      color="primary"
                      onClick={() => actorNameDetail(actBy)}
                    >
                      {actBy.original_title} {actBy.vote_average}
                    </Button>
                    <Typography>Release_date:{actBy.release_date}</Typography>
                  </div>
                ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
