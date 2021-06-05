import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MoviesCard from "./moviesCard";
    

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function UpCpming() {
  const classes = useStyles();
  let history = useHistory();

  const [coming, setComing] = useState([]);

  useEffect(async () => {
    var c = await axios.get(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=fed69657ba4cc6e1078d2a6a95f51c8c"
    );

    console.log("UpCpming", c.data.results);
    setComing(c.data.results);
  }, []);

//   function clickDetails() {
//     console.log("clickDetails");

//     history.push(`/movie/${movie.id}`);
//   }

  return (
    // <div>
    //   {coming.map((item) => (
    //     <Card className={classes.root}>
    //       <CardActionArea onClick={() => clickDetails}>
    //         <CardMedia
    //           style={{ height: "500px", width: "350px" }}
    //           className={classes.media}
    //           image={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
    //           title="Contemplative Reptile"
    //         />
    //         <CardContent>
    //           <Typography gutterBottom variant="h5" component="h2">
    //             {item.original_title}
    //           </Typography>

    //           <Typography variant="body2" color="textSecondary" component="p">
    //             Release Date: {item.release_date}
    //           </Typography>
    //         </CardContent>
    //       </CardActionArea>
    //       <CardActions>
    //         <Button size="small" color="primary">
    //           Release Date: {item.release_date}
    //         </Button>
    //         <Button size="small" color="primary">
    //           {item.vote_average}
    //         </Button>
    //       </CardActions>
    //     </Card>
    //   ))}
    // </div>

    <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>

      {coming.map((item) => (
          <MoviesCard key = {item.id} movie = {item} />
          ))}

      </div>
  );
}
