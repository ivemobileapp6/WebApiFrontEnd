import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  ListItem,
  List,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

import axios from "axios";

const Cat = () => {
  const [countryFlagUrl, setCountryFlagUrl] = useState("");
  const [images, setImages] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState({});


  useEffect(() => {
    getBreeds();
  }, []);

  useEffect(() => {
    if (selectedBreed && selectedBreed.country_code) {
      let country_code = selectedBreed.country_code.toLowerCase();
      setCountryFlagUrl(
        `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/1x1/${country_code}.svg`
      );
      getImages();
    }
  }, [selectedBreed]);

  useEffect(() => {
    if (breeds.length > 0) {
      setSelectedBreed(breeds[10]);
    }
  }, [breeds]);


  const getBreeds = async () => {
    try {
      axios.defaults.headers.common["x-api-key"] = "live_zpJijY1TcWW3wU8PjL1Tq6WPEwXe3qEwWryW4rjgUd6mCMZSV4ojKlcHa7j0btdl";
      let response = await axios.get("https://api.thecatapi.com/v1/breeds/");
      setBreeds(response.data);
      //setSelectedBreed(response.data[10]);
    } catch (err) {
      console.log(err);
    }
  };

  const getImages = async () => {
    try {
      let query_params = {
        breed_ids: selectedBreed.id,
        limit: 8,
      };

      let response = await axios.get("https://api.thecatapi.com/v1/images/search", { params: query_params });
      setImages(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBreedChange = (event) => {
    setSelectedBreed(event.target.value);
  };


  return (
    <Container maxWidth="md">
      <Grid container spacing={3} alignItems="center" justify="center">
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="breed-select-label">Breeds</InputLabel>
            <Select
              labelId="breed-select-label"
              id="breed-select"
              value={selectedBreed}
              onChange={handleBreedChange}
              label="Breeds"
            >
              {breeds.map((breed) => (
                <MenuItem key={breed.id} value={breed}>
                  {breed.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {images.map((img, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card>
              <CardContent>
                <img src={img.url} alt={`Cat breed ${selectedBreed.name}`} style={{ width: '100%', height: 'auto' }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>

          <Typography variant="h5" component="h2">
            {selectedBreed.name}
          </Typography>
          <Chip avatar={<Avatar src={countryFlagUrl} />} label={selectedBreed.origin} />
          <Typography variant="body1">{selectedBreed.description}</Typography>
          <Typography variant="body1">---</Typography>
          <Typography variant="body1" component="i">
            {selectedBreed.temperament}
          </Typography>
          <List>
            {[
              "affection_level",
              "adaptability",
              "child_friendly",
              "dog_friendly",
              "energy_level",
              "grooming",
              "health_issues",
              "intelligence",
              "shedding_level",
              "social_needs",
              "stranger_friendly",
              "vocalisation",
            ].map((rating) => (
              <ListItem key={rating}>
                <ListItemText primary={rating.replace("_", " ")} />
                <ListItemAvatar>
                  <Rating value={selectedBreed[rating] || 0} readOnly />
                </ListItemAvatar>
              </ListItem>
            ))}
          </List>

          <Button href={selectedBreed.wikipedia_url} target="_blank" color="primary">
            Wikipedia
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};


export default Cat;