import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function PopSeriesDetail() {
  // const [movie, setMovie] = useState({});
  // const [genre, setGenre] = useState([])
  const [pSDetail, setPSDetail] = useState({});
  const classes = useStyles();
  let history = useHistory();

  let { id } = useParams();

  useEffect(async () => {

    var c = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=fed69657ba4cc6e1078d2a6a95f51c8c`
    );


    console.log("PopSeriesDetail", c.data)
    setPSDetail(c.data)
  }, []);

  function movieByGenreClick(item) {
    console.log("movieByGenreClick", item);
    history.push(`/genre/${item.id}/${item.name}`);
  }

  // function actorDetails(act){
  //   console.log("act", act)
  //   history.push(`/actor/${act.id}`);



  // }


  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              style={{ height: "450px", width: "350px" }}
              className={classes.media}
              image={`https://image.tmdb.org/t/p/w300/${pSDetail.poster_path}`}
              title="Contemplative Reptile"
            />
            <CardContent></CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              href="#contained-buttons"
            >
              Visit Movies Website
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h6" gutterBottom>
          {pSDetail.name}

          <Chip
            avatar={<Avatar>M</Avatar>}
            // label={movie.vote_average}
            clickable
            color="primary"
            // onDelete={handleDelete}
            // deleteIcon={<DoneIcon />}
            variant="outlined"
          />
        </Typography>
        <span>Returning Series</span>
        <br />
        {/* {movie.genres?.map((genr) => (
          <Button onClick={() => goToGenre(genr)} color="primary">
            {genr.name}
          </Button>
        ))} */}
        <br />
        Last Air Date:{pSDetail.last_air_date}
        {/* <p>{movie.overview}</p> */}
        <br />
        <br />
        Number Of Seasons:{pSDetail.number_of_seasons}
        <br />
        <br />
        Number Of Episodes:{pSDetail.number_of_episodes}
        <br />
        <br />
        Production Companies:
        {
          pSDetail.genres?.map((item)=>(
            <Button color="primary" onClick={() => movieByGenreClick(item)}>
              {item.name}
            </Button>
            
            // console.log("item.name", item.name)
          ))
        }
        



        <Card>
          <CardActionArea
            style={{
              height: "180px",
              width: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* {personCast.map((act) => (
              <div>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  image={`https://image.tmdb.org/t/p/w300/${act.profile_path}`}
                  title="Contemplative Reptile"
                />
                <Button color="primary" onClick={() => actorDetails(act)}>
                {act.original_name}
          </Button>

              </div>
            ))} */}
          </CardActionArea>
        </Card>
      </Grid>


    </Grid>
  );
}
