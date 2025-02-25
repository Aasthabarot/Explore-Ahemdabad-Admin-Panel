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
  TextField,
  CircularProgress,
  Tabs,
  Tab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const API_URL = "http://localhost:8000/api/v1/packages";

const Packages = () => {
  const [tabIndex, setTabIndex] = useState(0); // Tab state
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageData, setPackageData] = useState({
    packageTitle: "",
    packageDescription: "",
    packageImage: "",
    tourHighlights: [],
    tourDetails: {
      time: "",
      date: "",
      length: "",
      duration: "",
      pausePoints: "",
      reportingTime: "",
      standardPackageIndian: "",
    },
    inclusions: [],
    itinerary: [],
  });
  const [openPackage, setOpenPackage] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, parentField, nestedField) => {
    const { value } = e.target;
    setPackageData((prevData) => ({
      ...prevData,
      [parentField]: {
        ...prevData[parentField],
        [nestedField]: value,
      },
    }));
  };

  const handleArrayChange = (e, field, index) => {
    const { value } = e.target;
    setPackageData((prevData) => ({
      ...prevData,
      [field]: prevData[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddArrayItem = (field) => {
    setPackageData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], ""],
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setPackageData((prevData) => ({
      ...prevData,
      [field]: prevData[field].filter((_, i) => i !== index),
    }));
  };

  const handleItineraryChange = (e, index, field) => {
    const { value } = e.target;
    setPackageData((prevData) => ({
      ...prevData,
      itinerary: prevData.itinerary.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddItinerary = () => {
    setPackageData((prevData) => ({
      ...prevData,
      itinerary: [
        ...prevData.itinerary,
        { name: "", image: "", time: "", duration: "", description: "" },
      ],
    }));
  };

  const handleRemoveItinerary = (index) => {
    setPackageData((prevData) => ({
      ...prevData,
      itinerary: prevData.itinerary.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    try {
      const method = selectedPackage ? "PUT" : "POST";
      const url = selectedPackage ? `${API_URL}/${selectedPackage._id}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(packageData),
      });

      if (response.ok) {
        fetchPackages();
        setSelectedPackage(null);
        resetForm();
        toast.success(selectedPackage ? 'Package updated successfully!' : 'Package created successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        console.error("Failed to save package");
      }
    } catch (error) {
      console.error("Error saving package:", error);
    }
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this package?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

              if (response.ok) {
                fetchPackages();
                toast.success('Package deleted successfully!', {
                  position: toast.POSITION.TOP_RIGHT,
                });
              } else {
                console.error("Failed to delete package");
              }
            } catch (error) {
              console.error("Error deleting package:", error);
            }
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const handleEdit = (pkg) => {
    setSelectedPackage(pkg);
    setPackageData(pkg);
    setTabIndex(0); // Switch to the "Create Package" tab
  };

  const handleOpenPackage = (pkg) => {
    setOpenPackage(pkg);
  };

  const handleClosePackage = () => {
    setOpenPackage(null);
  };

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const resetForm = () => {
    setPackageData({
      packageTitle: "",
      packageDescription: "",
      packageImage: "",
      tourHighlights: [],
      tourDetails: {
        time: "",
        date: "",
        length: "",
        duration: "",
        pausePoints: "",
        reportingTime: "",
        standardPackageIndian: "",
      },
      inclusions: [],
      itinerary: [],
    });
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <ToastContainer />
      {/* Tabs for Navigation */}
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Create Package" />
        <Tab label="Previous Packages" />
      </Tabs>

      {/* Tab Content */}
      {tabIndex === 0 ? (
        /* CREATE PACKAGE FORM */
        <Box sx={{ mt: 3 }}>
          <Typography variant="h4" gutterBottom>
            {selectedPackage ? "Edit Package" : "Create New Package"}
          </Typography>
          <Grid container spacing={3}>
            {/* Basic Fields */}
            <Grid item xs={12}>
              <TextField fullWidth label="Package Title" name="packageTitle" value={packageData.packageTitle} onChange={handleChange} margin="dense" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" name="packageDescription" value={packageData.packageDescription} onChange={handleChange} margin="dense" multiline rows={4} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Image URL" name="packageImage" value={packageData.packageImage} onChange={handleChange} margin="dense" />
            </Grid>

            {/* Tour Details */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Time" name="tourDetails.time" value={packageData.tourDetails.time} onChange={(e) => handleNestedChange(e, "tourDetails", "time")} margin="dense" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Date" name="tourDetails.date" value={packageData.tourDetails.date} onChange={(e) => handleNestedChange(e, "tourDetails", "date")} margin="dense" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Length" name="tourDetails.length" value={packageData.tourDetails.length} onChange={(e) => handleNestedChange(e, "tourDetails", "length")} margin="dense" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Duration" name="tourDetails.duration" value={packageData.tourDetails.duration} onChange={(e) => handleNestedChange(e, "tourDetails", "duration")} margin="dense" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Pause Points" name="tourDetails.pausePoints" value={packageData.tourDetails.pausePoints} onChange={(e) => handleNestedChange(e, "tourDetails", "pausePoints")} margin="dense" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Reporting Time" name="tourDetails.reportingTime" value={packageData.tourDetails.reportingTime} onChange={(e) => handleNestedChange(e, "tourDetails", "reportingTime")} margin="dense" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Price (₹)" name="tourDetails.standardPackageIndian" value={packageData.tourDetails.standardPackageIndian} onChange={(e) => handleNestedChange(e, "tourDetails", "standardPackageIndian")} margin="dense" />
            </Grid>

            {/* Tour Highlights */}
            <Grid item xs={12}>
              <Typography variant="h6">Tour Highlights</Typography>
              {packageData.tourHighlights.map((highlight, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    label={`Highlight ${index + 1}`}
                    value={highlight}
                    onChange={(e) => handleArrayChange(e, "tourHighlights", index)}
                    margin="dense"
                  />
                  <Button onClick={() => handleRemoveArrayItem("tourHighlights", index)} color="error">
                    Remove
                  </Button>
                </Box>
              ))}
              <Button onClick={() => handleAddArrayItem("tourHighlights")} variant="contained" color="primary">
                Add Highlight
              </Button>
            </Grid>

            {/* Inclusions */}
            <Grid item xs={12}>
              <Typography variant="h6">Inclusions</Typography>
              {packageData.inclusions.map((inclusion, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    label={`Inclusion ${index + 1}`}
                    value={inclusion}
                    onChange={(e) => handleArrayChange(e, "inclusions", index)}
                    margin="dense"
                  />
                  <Button onClick={() => handleRemoveArrayItem("inclusions", index)} color="error">
                    Remove
                  </Button>
                </Box>
              ))}
              <Button onClick={() => handleAddArrayItem("inclusions")} variant="contained" color="primary">
                Add Inclusion
              </Button>
            </Grid>

            {/* Itinerary */}
            <Grid item xs={12}>
              <Typography variant="h6">Itinerary</Typography>
              {packageData.itinerary.map((item, index) => (
                <Box key={index} sx={{ mb: 2, border: "1px solid #ccc", p: 2, borderRadius: "4px" }}>
                  <TextField
                    fullWidth
                    label="Place Name"
                    value={item.name}
                    onChange={(e) => handleItineraryChange(e, index, "name")}
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    label="Image URL"
                    value={item.image}
                    onChange={(e) => handleItineraryChange(e, index, "image")}
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    label="Time"
                    value={item.time}
                    onChange={(e) => handleItineraryChange(e, index, "time")}
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    label="Duration"
                    value={item.duration}
                    onChange={(e) => handleItineraryChange(e, index, "duration")}
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    value={item.description}
                    onChange={(e) => handleItineraryChange(e, index, "description")}
                    margin="dense"
                    multiline
                    rows={4}
                  />
                  <Button onClick={() => handleRemoveItinerary(index)} color="error">
                    Remove
                  </Button>
                </Box>
              ))}
              <Button onClick={handleAddItinerary} variant="contained" color="primary">
                Add Itinerary
              </Button>
            </Grid>

            {/* Save/Cancel Buttons */}
            <Grid item xs={12}>
              <Button onClick={handleSave} variant="contained" color="success" sx={{ mt: 2 }}>
                {selectedPackage ? "Update Package" : "Add Package"}
              </Button>
              {selectedPackage && (
                <Button onClick={() => setSelectedPackage(null)} variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>
                  Cancel Edit
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      ) : (
        /* PREVIOUS PACKAGES LIST */
        <Box sx={{ mt: 3 }}>
          {loading ? (
            <CircularProgress sx={{ display: "block", mx: "auto" }} />
          ) : (
            <Grid container spacing={3}>
              {packages.map((pkg) => (
                <Grid item xs={12} sm={6} md={4} key={pkg._id}>
                  <Card sx={{ maxWidth: 545 }}>
                    <CardMedia component="img" height="200" image={pkg.packageImage} alt={pkg.packageTitle} />
                    <CardContent>
                      <Typography gutterBottom variant="h5">{pkg.packageTitle}</Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>{pkg.packageDescription}</Typography>
                      <Typography variant="body2" color="text.secondary"><strong>Length:</strong> {pkg.tourDetails.length}</Typography>
                      <Typography variant="body2" color="text.secondary"><strong>Duration:</strong> {pkg.tourDetails.duration}</Typography>
                      <Typography variant="body2" color="text.secondary"><strong>Pause Points:</strong> {pkg.tourDetails.pausePoints}</Typography>
                      <Typography variant="body2" color="text.secondary"><strong>Reporting Time:</strong> {pkg.tourDetails.reportingTime}</Typography>
                      <Typography variant="body2" color="text.secondary"><strong>Price:</strong> ₹{pkg.tourDetails.standardPackageIndian}</Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton color="primary" onClick={() => handleEdit(pkg)} aria-label="edit"><EditIcon /></IconButton>
                      <IconButton color="error" onClick={() => handleDelete(pkg._id)} aria-label="delete"><DeleteIcon /></IconButton>
                      <IconButton color="info" onClick={() => handleOpenPackage(pkg)} aria-label="view"><VisibilityIcon /></IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* Package Details Modal */}
      <Dialog open={openPackage !== null} onClose={handleClosePackage} maxWidth="md" fullWidth>
        {openPackage && (
          <>
            <DialogTitle>{openPackage.packageTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography variant="body1" color="text.secondary" paragraph>{openPackage.packageDescription}</Typography>
                <Typography variant="body2" color="text.secondary"><strong>Length:</strong> {openPackage.tourDetails.length}</Typography>
                <Typography variant="body2" color="text.secondary"><strong>Duration:</strong> {openPackage.tourDetails.duration}</Typography>
                <Typography variant="body2" color="text.secondary"><strong>Pause Points:</strong> {openPackage.tourDetails.pausePoints}</Typography>
                <Typography variant="body2" color="text.secondary"><strong>Reporting Time:</strong> {openPackage.tourDetails.reportingTime}</Typography>
                <Typography variant="body2" color="text.secondary"><strong>Price:</strong> ₹{openPackage.tourDetails.standardPackageIndian}</Typography>
                <Typography variant="h6" mt={2}>Tour Highlights:</Typography>
                <ul>
                  {openPackage.tourHighlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
                <Typography variant="h6" mt={2}>Inclusions:</Typography>
                <ul>
                  {openPackage.inclusions.map((inclusion, index) => (
                    <li key={index}>{inclusion}</li>
                  ))}
                </ul>
                <Typography variant="h6" mt={2}>Itinerary:</Typography>
                {openPackage.itinerary.map((item, index) => (
                  <Box key={index} sx={{ mb: 2, border: "1px solid #ccc", p: 2, borderRadius: "4px" }}>
                    <Typography variant="body2"><strong>Place Name:</strong> {item.name}</Typography>
                    <Typography variant="body2"><strong>Time:</strong> {item.time}</Typography>
                    <Typography variant="body2"><strong>Duration:</strong> {item.duration}</Typography>
                    <Typography variant="body2"><strong>Description:</strong> {item.description}</Typography>
                  </Box>
                ))}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePackage} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Packages;
