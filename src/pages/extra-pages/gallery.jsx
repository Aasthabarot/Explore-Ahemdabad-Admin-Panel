import * as React from 'react';
import { Button, Box, Card, CardMedia, CardContent, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

export default function ManageGallery() {
  const [images, setImages] = React.useState([]);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState('');
  const [editImage, setEditImage] = React.useState('');
  const [imageName, setImageName] = React.useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, { id: Date.now(), name: file.name, img: reader.result }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = (index) => {
    setSelectedImageIndex(index);
    setEditImage(images[index].img);
    setImageName(images[index].name);
    setImagePreview(images[index].img);
    setOpenEditDialog(true);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleSaveEdit = () => {
    const updatedImages = [...images];
    updatedImages[selectedImageIndex] = {
      ...updatedImages[selectedImageIndex],
      name: imageName,
      img: editImage,
    };
    setImages(updatedImages);
    setOpenEditDialog(false);
  };

  // Handle image selection
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Preview the image
        setEditImage(reader.result); // Set the image URL to the selected file's data URL
      };
      reader.readAsDataURL(file); // Convert the file to a base64 URL
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
        {images.map((image, index) => (
          <Card key={image.id} sx={{ maxWidth: 250, boxShadow: 3, position: 'relative' }}>
            <CardMedia
              component="img"
              height="140"
              image={image.img}
              alt={image.name}
            />
            <CardContent>
              <Typography variant="h6" noWrap>
                {image.name}
              </Typography>
            </CardContent>
            <Box
              position="absolute"
              top={5}
              right={5}
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
            >
              {/* Edit Button */}
              <IconButton color="primary" onClick={() => handleEditImage(index)}>
                <EditIcon />
              </IconButton>
              {/* Delete Button */}
              <IconButton color="error" onClick={() => handleDeleteImage(index)}>
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
          {/* Image File Input */}
          <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
            Select New Image
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
