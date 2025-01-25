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
  guideID,
  fullName,
  email,
  phone,
  ageDOB,
  cityCountry,
  specializations,
  experience,
  languages,
  status
) {
  return {
    guideID,
    fullName,
    email,
    phone,
    ageDOB,
    cityCountry,
    specializations,
    experience,
    languages,
    status,
  };
}

// Sample rows for guides
const initialRows = [
  createData(
    'G001',
    'Rahul Shah',
    'rahul.shah@example.com',
    '+919876543210',
    '1988-07-25',
    'Ahmedabad, India',
    'Historical Sites, Food Tours',
    10,
    'English, Hindi, Gujarati',
    'Active'
  ),
  createData(
    'G002',
    'Sneha Patel',
    'sneha.patel@example.com',
    '+917654321098',
    '1992-03-12',
    'Ahmedabad, India',
    'Culture, Architecture',
    7,
    'English, Hindi',
    'Active'
  ),
  createData(
    'G003',
    'Anil Mehta',
    'anil.mehta@example.com',
    '+917123456789',
    '1985-11-30',
    'Ahmedabad, India',
    'Adventure, Nature',
    12,
    'English, Gujarati',
    'On Leave'
  ),
];

export default function GuidesTable() {
  const [rows, setRows] = React.useState(initialRows);

  // Function to handle deletion
  const handleDelete = (guideID) => {
    setRows(rows.filter((row) => row.guideID !== guideID));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Guide ID</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email Address</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Age/Date of Birth</TableCell>
            <TableCell>City/Country</TableCell>
            <TableCell>Specializations</TableCell>
            <TableCell align="right">Experience (Years)</TableCell>
            <TableCell>Languages</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.guideID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.guideID}
              </TableCell>
              <TableCell>{row.fullName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.ageDOB}</TableCell>
              <TableCell>{row.cityCountry}</TableCell>
              <TableCell>{row.specializations}</TableCell>
              <TableCell align="right">{row.experience}</TableCell>
              <TableCell>{row.languages}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <PopupState variant="popper" popupId={`popper-${row.guideID}`}>
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
                                Are you sure you want to delete this guide?
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
                                    handleDelete(row.guideID);
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
  );
}
