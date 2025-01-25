import * as React from 'react';
import { Button, Card, CardContent, CardMedia, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Popper, Fade, Paper } from '@mui/material';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';

// Sample data for places
const placesData = [
  { id: 1, title: 'Sabarmati Riverfront', img: 'url-to-image-1', desc: 'A beautiful riverfront along the Sabarmati River, perfect for walks and outdoor activities.' },
  { id: 2, title: 'Kankaria Lake', img: 'url-to-image-2', desc: 'A popular recreational area with a lake, zoo, and boat rides.' },
  { id: 3, title: 'Sidi Saiyyed Mosque', img: 'url-to-image-3', desc: 'Famous for its intricate architecture and historical significance.' },
];

export default function PlacesAdmin() {
  const [placesList, setPlaces] = React.useState(placesData);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [selectedPlace, setSelectedPlace] = React.useState(null);
  const [editTitle, setEditTitle] = React.useState('');
  const [editDesc, setEditDesc] = React.useState('');
  const [editImg, setEditImg] = React.useState('');
  const [imagePreview, setImagePreview] = React.useState('');

  const handleDelete = (id) => {
    setPlaces(prev => prev.filter(item => item.id !== id));
  };

  const handleEdit = (place) => {
    setSelectedPlace(place);
    setEditTitle(place.title);
    setEditDesc(place.desc);
    setEditImg(place.img);
    setImagePreview(place.img); // Set image preview to current place image
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    const updatedPlaces = placesList.map(place =>
      place.id === selectedPlace.id
        ? { ...place, title: editTitle, desc: editDesc, img: editImg }
        : place
    );
    setPlaces(updatedPlaces);
    setOpenEditDialog(false);
  };

  // Handle image selection
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Preview the image
        setEditImg(reader.result); // Set the image URL to the selected file's data URL
      };
      reader.readAsDataURL(file); // Convert the file to a base64 URL
    }
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={3} p={3}>
      {placesList.map((place) => (
        <Card key={place.id} sx={{ maxWidth: 345, boxShadow: 3 }}>
          <CardMedia
            component="img"
            height="140"
            image={place.img}
            alt={place.title}
          />
          <CardContent>
            <Typography variant="h6">{place.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {place.desc}
            </Typography>
          </CardContent>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit(place)} // Open edit dialog
            >
              Edit
            </Button>
            <PopupState variant="popper" popupId={`delete-popup-${place.id}`}>
              {(popupState) => (
                <div>
                  <Button
                    variant="contained"
                    color="error"
                    {...bindToggle(popupState)}
                    sx={{ color: 'white' }}
                  >
                    Delete
                  </Button>
                  <Popper {...bindPopper(popupState)} transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper sx={{ padding: 2 }}>
                          <Typography>Are you sure you want to delete this place?</Typography>
                          <div style={{ marginTop: 10 }}>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleDelete(place.id)}
                            >
                              Yes
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={popupState.close}
                              sx={{ marginLeft: 2 }}
                            >
                              No
                            </Button>
                          </div>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </div>
              )}
            </PopupState>
          </Box>
        </Card>
      ))}
      
      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Place</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
          
          {/* Image File Input */}
          <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
            Select Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageSelect}
            />
          </Button>
          
          {/* Image Preview */}
          {imagePreview && (
            <Box mt={2} display="flex" justifyContent="center">
              <img src={imagePreview} alt="Preview" style={{ maxHeight: 200, maxWidth: 200, objectFit: 'cover' }} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
