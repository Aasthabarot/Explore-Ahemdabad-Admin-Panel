import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Packages = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      title: "Ahmedabad One-Day Tour",
      description: "Explore the highlights of Ahmedabad in just one day.",
      price: 2500,
      duration: "1 day",
      availability: "Available",
      startDate: "2024-02-15",
      endDate: "2024-02-15",
      bookings: 10,
      ratings: 4.7,
      image: "https://via.placeholder.com/400x200",
      places: [
        {
          name: "Sabarmati Ashram",
          description: "The iconic ashram associated with Mahatma Gandhi.",
          image: "https://via.placeholder.com/200x150",
        },
        {
          name: "Kankaria Lake",
          description: "A serene lake with recreational activities.",
          image: "https://via.placeholder.com/200x150",
        },
        {
          name: "Manek Chowk",
          description: "A bustling night market known for delicious food.",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      itinerary: "Morning at Sabarmati Ashram, afternoon at Kankaria Lake, and evening at Manek Chowk.",
      timings: "9:00 AM - 8:00 PM",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openPlaceDialog, setOpenPlaceDialog] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [newPackage, setNewPackage] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    startDate: "",
    endDate: "",
    image: "",
    itinerary: "",
    timings: "",
    places: [],
  });

  const [newPlace, setNewPlace] = useState({
    name: "",
    description: "",
    image: "",
    duration: "",
  });

  const deletePackage = (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      setPackages(packages.filter((pkg) => pkg.id !== id));
    }
  };

  const handleAddPackage = () => {
    setOpenAddDialog(true);
  };

  const closeAddDialog = () => {
    setOpenAddDialog(false);
    setNewPackage({
      title: "",
      description: "",
      price: "",
      duration: "",
      startDate: "",
      endDate: "",
      image: "",
      itinerary: "",
      timings: "",
      places: [],
    });
  };

  const submitNewPackage = () => {
    const id = packages.length + 1;
    setPackages([
      ...packages,
      { id, ...newPackage, ratings: 0, bookings: 0 },
    ]);
    closeAddDialog();
  };

  const viewPackage = (pkg) => {
    setSelectedPackage(pkg);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setSelectedPackage(null);
  };

  const editPackage = (pkg) => {
    setNewPackage(pkg);
    setOpenEditDialog(true);
  };

  const closeEditDialog = () => {
    setOpenEditDialog(false);
    setNewPackage({
      title: "",
      description: "",
      price: "",
      duration: "",
      startDate: "",
      endDate: "",
      image: "",
      itinerary: "",
      timings: "",
      places: [],
    });
  };

  const submitEditedPackage = () => {
    setPackages(
      packages.map((pkg) =>
        pkg.id === newPackage.id ? { ...newPackage } : pkg
      )
    );
    closeEditDialog();
  };

  const openPlaceForm = () => {
    setOpenPlaceDialog(true);
  };

  const closePlaceDialog = () => {
    setOpenPlaceDialog(false);
    setNewPlace({
      name: "",
      description: "",
      image: "",
      duration: "",
    });
  };

  const addPlace = () => {
    setNewPackage({
      ...newPackage,
      places: [...newPackage.places, newPlace],
    });
    closePlaceDialog();
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Grid container spacing={3}>
        {packages.map((pkg) => (
          <Grid item xs={12} sm={6} md={4} key={pkg.id}>
            <Card sx={{ maxWidth: 545 }}>
              <CardMedia
                component="img"
                height="200"
                image={pkg.image}
                alt={pkg.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {pkg.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {pkg.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Price:</strong> ₹{pkg.price} | <strong>Duration:</strong> {pkg.duration}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => viewPackage(pkg)}>
                  View
                </Button>
                <IconButton color="primary" onClick={() => editPackage(pkg)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => deletePackage(pkg.id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="success" onClick={handleAddPackage}>
          Add New Package
        </Button>
      </Box>

      {/* Dialog for viewing package details */}
      {selectedPackage && (
        <Dialog open={openDialog} onClose={closeDialog} fullWidth maxWidth="md">
          <DialogTitle>{selectedPackage.title}</DialogTitle>
          <DialogContent sx={{ padding: "2rem" }}>
            <CardMedia component="img" height="300" image={selectedPackage.image} alt={selectedPackage.title} />
            <DialogContentText>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography>{selectedPackage.description}</Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Places
              </Typography>
              <Grid container>
                {selectedPackage.places.map((place, index) => (
                  <Grid item xs={6} key={index}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="150"
                        image={place.image}
                        alt={place.name}
                      />
                      <CardContent>
                        <Typography variant="subtitle1">{place.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {place.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ padding: "1rem 2rem" }}>
            <Button onClick={closeDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Dialog for adding/editing a package */}
      <Dialog open={openAddDialog || openEditDialog} onClose={openAddDialog ? closeAddDialog : closeEditDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ padding: "1rem 2rem" }}>{openAddDialog ? "Add New Package" : "Edit Package"}</DialogTitle>
        <DialogContent sx={{ padding: "2rem" }}>
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextField
              label="Title"
              value={newPackage.title}
              onChange={(e) => setNewPackage({ ...newPackage, title: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={newPackage.description}
              onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
              required
            />
            <TextField
              label="Price"
              type="number"
              value={newPackage.price}
              onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Duration"
              value={newPackage.duration}
              onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Start Date"
              type="date"
              value={newPackage.startDate}
              onChange={(e) => setNewPackage({ ...newPackage, startDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
            <TextField
              label="End Date"
              type="date"
              value={newPackage.endDate}
              onChange={(e) => setNewPackage({ ...newPackage, endDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
            <TextField
              label="Image URL"
              value={newPackage.image}
              onChange={(e) => setNewPackage({ ...newPackage, image: e.target.value })}
              fullWidth
            />
            <TextField
              label="Itinerary"
              value={newPackage.itinerary}
              onChange={(e) => setNewPackage({ ...newPackage, itinerary: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Timings"
              value={newPackage.timings}
              onChange={(e) => setNewPackage({ ...newPackage, timings: e.target.value })}
              fullWidth
            />

            <Typography variant="h6">Places</Typography>
            {newPackage.places.map((place, index) => (
              <Box key={index} sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", mb: 1 }}>
                <Typography variant="subtitle1">{place.name}</Typography>
                <Typography variant="body2">{place.description}</Typography>
              </Box>
            ))}

            <Button variant="outlined" color="primary" onClick={openPlaceForm}>
              Add Place
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: "1rem 2rem" }}>
          <Button onClick={openAddDialog ? closeAddDialog : closeEditDialog} color="error">
            Cancel
          </Button>
          <Button
            onClick={openAddDialog ? submitNewPackage : submitEditedPackage}
            variant="contained"
            color="primary"
          >
            {openAddDialog ? "Add Package" : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for adding a new place */}
      <Dialog open={openPlaceDialog} onClose={closePlaceDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ padding: "1rem 2rem" }}>Add Place</DialogTitle>
        <DialogContent sx={{ padding: "2rem" }}>
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextField
              label="Place Name"
              value={newPlace.name}
              onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Place Description"
              value={newPlace.description}
              onChange={(e) => setNewPlace({ ...newPlace, description: e.target.value })}
              multiline
              rows={2}
              fullWidth
              required
            />
            <TextField
              label="Image URL"
              value={newPlace.image}
              onChange={(e) => setNewPlace({ ...newPlace, image: e.target.value })}
              fullWidth
            />
            <TextField
              label="Time Duration"
              value={newPlace.duration}
              onChange={(e) => setNewPlace({ ...newPlace, duration: e.target.value })}
              placeholder="e.g., 1 hour, 30 minutes"
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: "1rem 2rem" }}>
          <Button onClick={closePlaceDialog} color="error">
            Cancel
          </Button>
          <Button onClick={addPlace} variant="contained" color="primary">
            Add Place
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Packages;
