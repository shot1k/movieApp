import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MoviesCard({movie}) {
  const classes = useStyles();
  let history = useHistory();


  function clickDetails(movie){
    console.log('clickDetails', movie,movie.id)

    history.push(`/movie/${movie.id}`);
  }

  



  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => clickDetails(movie)} >
        <CardMedia style={{height:"500px",width:"350px"}}
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.original_title}
          </Typography>

          <Typography  variant="body2" color="textSecondary" component="p">
            Release Date: {movie.release_date}
          </Typography>

        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
        Release Date: {movie.release_date}
        </Button>
        <Button size="small" color="primary">
        {movie.vote_average}
        </Button>
      </CardActions>
    </Card>
  );
}
