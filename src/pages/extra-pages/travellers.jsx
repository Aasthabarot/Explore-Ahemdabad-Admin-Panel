import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';

// Function to create row data
function createData(
  travellerID,
  fullName,
  email,
  phone,
  ageDOB,
  cityCountry,
  preferences,
  totalBookings,
  lastTravelDate,
  status
) {
  return {
    travellerID,
    fullName,
    email,
    phone,
    ageDOB,
    cityCountry,
    preferences,
    totalBookings,
    lastTravelDate,
    status,
  };
}

// Sample rows
const initialRows = [
  createData(
    'T001',
    'John Doe',
    'john.doe@example.com',
    '+123456789',
    '1990-05-15',
    'New York, USA',
    'Nature, Food Tours',
    5,
    '2023-12-15',
    'Active'
  ),
  createData(
    'T002',
    'Jane Smith',
    'jane.smith@example.com',
    '+987654321',
    '1985-08-20',
    'London, UK',
    'Historical Sites, Food Tours',
    10,
    '2024-01-10',
    'VIP'
  ),
  createData(
    'T003',
    'Robert Brown',
    'robert.brown@example.com',
    '+1122334455',
    '1995-03-30',
    'Sydney, Australia',
    'Nature, Adventure',
    3,
    '2023-11-05',
    'Inactive'
  ),
];

export default function DenseTable() {
  const [rows, setRows] = React.useState(initialRows);

  // Function to handle deletion
  const handleDelete = (travellerID) => {
    setRows(rows.filter((row) => row.travellerID !== travellerID));
  };

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Traveller ID</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email Address</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Age/Date of Birth</TableCell>
            <TableCell>City/Country</TableCell>
            <TableCell>Travel Preferences</TableCell>
            <TableCell align="right">Total Bookings</TableCell>
            <TableCell align="right">Last Travel Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.travellerID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.travellerID}
              </TableCell>
              <TableCell>{row.fullName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.ageDOB}</TableCell>
              <TableCell>{row.cityCountry}</TableCell>
              <TableCell>{row.preferences}</TableCell>
              <TableCell align="right">{row.totalBookings}</TableCell>
              <TableCell align="right">{row.lastTravelDate}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <PopupState variant="popper" popupId={`popper-${row.travellerID}`}>
                  {(popupState) => (
                    <div>
                      <Button
                        variant="contained"
                        {...bindToggle(popupState)}
                        sx={{
                          backgroundColor: 'red',
                          color: 'white',
                          textTransform: 'none',
                          fontWeight: 'bold',
                          '&:hover': {
                            backgroundColor: 'darkred',
                          },
                        }}
                      >
                        Delete
                      </Button>
                      <Popper {...bindPopper(popupState)} transition>
                        {({ TransitionProps }) => (
                          <Fade {...TransitionProps} timeout={350}>
                            <Paper sx={{ padding: 2 }}>
                              <Typography>
                                Are you sure you want to delete this traveller?
                              </Typography>
                              <div style={{ marginTop: 10 }}>
                                <Button
                                  variant="contained"
                                  sx={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    marginRight: 1,
                                    '&:hover': { backgroundColor: 'darkred' },
                                  }}
                                  onClick={() => {
                                    handleDelete(row.travellerID);
                                    popupState.close();
                                  }}
                                >
                                  Yes
                                </Button>
                                <Button
                                  variant="outlined"
                                  onClick={popupState.close}
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
