import React, { useState, useEffect } from "react";
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
  DialogActions,
  TextField,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const API_URL = "http://localhost:8000/api/v1/packages";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageData, setPackageData] = useState({
    packageName: "",
    packageDescription: "",
    price: "",
    duration: "",
    startDate: "",
    endDate: "",
    image: "",
    itenary: "",
    time: "",
    places: [],
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPackages(data.data || []);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (type, pkg = null) => {
    setDialogType(type);
    setSelectedPackage(pkg);
    setPackageData(pkg || {
      packageName: "",
      packageDescription: "",
      price: "",
      duration: "",
      startDate: "",
      endDate: "",
      image: "",
      itenary: "",
      time: "",
      places: [],
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto" }} />
      ) : (
        <Grid container spacing={3}>
          {packages.map((pkg) => (
            <Grid item xs={12} sm={6} md={4} key={pkg._id}>
              <Card sx={{ maxWidth: 545 }}>
                <CardMedia component="img" height="200" image={pkg.image} alt={pkg.packageName} />
                <CardContent>
                  <Typography gutterBottom variant="h5">{pkg.packageName}</Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {pkg.packageDescription}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Price:</strong> ₹{pkg.price} | <strong>Duration:</strong> {pkg.duration} days
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => handleOpenDialog("view", pkg)} variant="contained" color="info">View</Button>
                  <IconButton color="primary" onClick={() => handleOpenDialog("edit", pkg)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Button variant="contained" color="success" onClick={() => handleOpenDialog("add")}>Add New Package</Button>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{dialogType === "view" ? "Package Details" : dialogType === "edit" ? "Edit Package" : "Add New Package"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Package Name" value={packageData.packageName} margin="dense" />
          <TextField fullWidth label="Description" value={packageData.packageDescription} margin="dense" multiline rows={4} />
          <TextField fullWidth label="Price" value={packageData.price} margin="dense" />
          <TextField fullWidth label="Duration" value={packageData.duration} margin="dense" />
          <TextField fullWidth label="Start Date" value={packageData.startDate} margin="dense" />
          <TextField fullWidth label="End Date" value={packageData.endDate} margin="dense" />
          <TextField fullWidth label="Image URL" value={packageData.image} margin="dense" />
          <TextField fullWidth label="Itinerary" value={packageData.itenary} margin="dense" multiline rows={4} />
          <TextField fullWidth label="Time" value={packageData.time} margin="dense" />
          <Typography variant="h6">Places Included:</Typography>
          <List>
            {packageData.places.map((place) => (
              <ListItem key={place._id}>
                <ListItemText primary={place.title} secondary={place.description} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
          {dialogType !== "view" && <Button variant="contained" color="success">Save</Button>}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Packages;
