import * as React from 'react';
import axios from 'axios';
import { Button, Box, Card, CardMedia, CardContent, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const API_BASE_URL = "http://localhost:8000/api/v1/gallery";

export default function ManageGallery() {
  const [images, setImages] = React.useState([]);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState('');
  const [imageName, setImageName] = React.useState('');

  // Fetch images from API
  const fetchImages = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  React.useEffect(() => {
    fetchImages();
  }, []);

  // Upload Image
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        await axios.post(`${API_BASE_URL}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        fetchImages(); // Refresh gallery after upload
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // Open Edit Dialog
  const handleEditImage = (image) => {
    setSelectedImage(image);
    setImageName(image.imageName);
    setImagePreview(`${API_BASE_URL.replace("/api/v1/gallery", "")}${image.imageUrl}`);
    setOpenEditDialog(true);
  };

  // Update Image Name
  const handleSaveEdit = async () => {
    if (!selectedImage) return;

    try {
      await axios.put(`${API_BASE_URL}/${selectedImage._id}`, { imageName });
      fetchImages(); // Refresh gallery
      setOpenEditDialog(false);
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  // Delete Image
  const handleDeleteImage = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchImages(); // Refresh gallery
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <Box p={3}>
      <Button variant="contained" component="label" sx={{ marginBottom: 3 }}>
        Upload Image
        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
      </Button>

      {/* Gallery */}
      <Box display="flex" flexWrap="wrap" gap={3}>
        {images.map((image) => (
          <Card key={image._id} sx={{ maxWidth: 250, boxShadow: 3, position: 'relative' }}>
            <CardMedia
              component="img"
              height="140"
              image={`${API_BASE_URL.replace("/api/v1/gallery", "")}${image.imageUrl}`}
              alt={image.imageName}
            />
            <CardContent>
              <Typography variant="h6" noWrap>
                {image.imageName}
              </Typography>
            </CardContent>
            <Box position="absolute" top={5} right={5} display="flex" flexDirection="column">
              <IconButton color="primary" onClick={() => handleEditImage(image)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDeleteImage(image._id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Image</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Image Name"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            margin="normal"
          />
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
