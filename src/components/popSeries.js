import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function PopSeries() {
  const classes = useStyles();
  const [popular, setPopular] = useState([]);
  let history = useHistory();

  useEffect(async () => {
    console.log("shemodis");
    var c = await axios.get(
      "https://api.themoviedb.org/3/tv/popular?api_key=fed69657ba4cc6e1078d2a6a95f51c8c"
    );

    console.log("popular", c.data.results);
    setPopular(c.data.results);
  }, []);

  function clickPopSeriesDetail(item){
      console.log("clickPopSeriesDetail", item)
      history.push(`/tv/${item.id}`);
  }

  return (
    <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
      {popular.map((item) => (
        <Card className={classes.root}>
          <CardActionArea onClick={() => clickPopSeriesDetail(item)}>
            <CardMedia
              className={classes.media}
              image={`https://image.tmdb.org/t/p/w300/${item.backdrop_path}`}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
            {item.original_title}
          </Typography>
          <Typography  variant="body2" color="textSecondary" component="p">
            Release Date: {item.release_date}
          </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}
