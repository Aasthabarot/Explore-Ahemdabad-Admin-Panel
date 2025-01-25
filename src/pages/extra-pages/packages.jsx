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
} from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

const Packages = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      title: "Historical Ahmedabad Tour",
      description: "Explore the historical landmarks of Ahmedabad.",
      price: 5000,
      duration: "3 days, 2 nights",
      availability: "Available",
      startDate: "2024-02-01",
      endDate: "2024-02-03",
      bookings: 20,
      ratings: 4.5,
      image: "https://via.placeholder.com/400x200", // Replace with your image URL
      places: [
        { name: "Sabarmati Ashram", description: "A historical place related to Mahatma Gandhi." },
        { name: "Sidi Saiyyed Mosque", description: "Famous for its intricate stone lattice work." },
        { name: "Kankaria Lake", description: "A beautiful lake with recreational activities." },
      ],
    },
    {
      id: 2,
      title: "Ahmedabad Food Trail",
      description: "Discover the famous culinary delights of Ahmedabad.",
      price: 3000,
      duration: "1 day",
      availability: "Available",
      startDate: "2024-02-05",
      endDate: "2024-02-05",
      bookings: 15,
      ratings: 4.8,
      image: "https://via.placeholder.com/400x200", // Replace with your image URL
      places: [
        { name: "Manek Chowk", description: "A hub for street food at night." },
        { name: "Law Garden", description: "Known for its traditional snacks and shopping." },
      ],
    },
  ]);

  const deletePackage = (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      setPackages(packages.filter((pkg) => pkg.id !== id));
    }
  };

  const editPackage = (id) => {
    alert(`Edit functionality not yet implemented for Package ID: ${id}`);
    // Add your edit logic here
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Manage Packages
      </Typography>
      <Grid container spacing={3}>
        {packages.map((pkg) => (
          <Grid item xs={12} sm={6} md={4} key={pkg.id}>
            <Card sx={{ maxWidth: 345 }}>
              {/* Package Image */}
              <CardMedia
                component="img"
                height="200"
                image={pkg.image}
                alt={pkg.title}
              />
              {/* Card Content */}
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
                {/* Nested Places */}
                <Box mt={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    Places:
                  </Typography>
                  <ul>
                    {pkg.places.map((place, index) => (
                      <li key={index}>
                        <strong>{place.name}:</strong> {place.description}
                      </li>
                    ))}
                  </ul>
                </Box>
              </CardContent>
              {/* Card Actions */}
              {/* <CardActions>
                <IconButton
                  color="primary"
                  onClick={() => editPackage(pkg.id)}
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => deletePackage(pkg.id)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions> */}
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="success">
          Add New Package
        </Button>
      </Box>
    </Box>
  );
};

export default Packages;
