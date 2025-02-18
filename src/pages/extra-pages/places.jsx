import React, { useState, useEffect } from 'react';
import {
  Button, Card, CardContent, CardMedia, Typography, Box,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1/places';

export default function PlacesAdmin() {
  const [places, setPlaces] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlace, setCurrentPlace] = useState({ name: '', description: '', image: '' });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setPlaces(response.data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPlace({ ...currentPlace, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddPlace = () => {
    setCurrentPlace({ name: '', description: '', image: '' });
    setImageFile(null);
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleEditPlace = (place) => {
    setCurrentPlace(place);
    setImageFile(null);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDeletePlace = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchPlaces();
    } catch (error) {
      console.error('Error deleting place:', error);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', currentPlace.name);
    formData.append('description', currentPlace.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/${currentPlace._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post(API_BASE_URL, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      fetchPlaces();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving place:', error);
    }
  };

  return (
    <Box p={3}>
      <Button variant="contained" color="primary" onClick={handleAddPlace}>
        Add Place
      </Button>
      <Box display="flex" flexWrap="wrap" gap={3} mt={3}>
        {places.map((place) => (
          <Card key={place._id} sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={`http://localhost:8000${place.image}`}
              alt={place.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {place.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {place.description}
              </Typography>
            </CardContent>
            <Box display="flex" justifyContent="space-between" p={2}>
              <Button variant="outlined" onClick={() => handleEditPlace(place)}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleDeletePlace(place._id)}>
                Delete
              </Button>
            </Box>
          </Card>
        ))}
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{isEditing ? 'Edit Place' : 'Add Place'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={currentPlace.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={currentPlace.description}
            onChange={handleInputChange}
          />
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
          {currentPlace.image && !imageFile && (
            <Box mt={2}>
              <img
                src={`http://localhost:8000${currentPlace.image}`}
                alt={currentPlace.name}
                style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }}
              />
            </Box>
          )}
          {imageFile && (
            <Box mt={2}>
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{isEditing ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
