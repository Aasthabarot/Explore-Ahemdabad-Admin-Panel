import * as React from 'react';
import { Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, Typography , TableCell, TableContainer, TableHead, TableRow, Paper, Popper, Fade } from '@mui/material';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';


// Sample data for bookings
const bookingData = [
  { id: 101, packageName: 'Heritage Walk', citizenType: 'Indian', members: 4, amountPaid: 800 },
  { id: 102, packageName: 'Cultural Walk', citizenType: 'Foreign', members: 2, amountPaid: 600 },
  { id: 103, packageName: 'City Tour', citizenType: 'Indian', members: 5,amountPaid: 1000 },
  { id: 104, packageName: 'Heritage Walk', citizenType: 'Foreign', members: 3, amountPaid: 900 },
  { id: 105, packageName: 'Cultural Walk', citizenType: 'Indian', members: 6, amountPaid: 1200 },
];

export default function BookingPage() {
  const [bookingList, setBookingList] = React.useState(bookingData);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState(null);
  const [editPackageName, setEditPackageName] = React.useState('');
  const [editCitizenType, setEditCitizenType] = React.useState('');
  const [editMembers, setEditMembers] = React.useState('');
  // const [editPaymentStatus, setEditPaymentStatus] = React.useState('');
  const [editAmountPaid, setEditAmountPaid] = React.useState('');

  const handleDelete = (id) => {
    setBookingList(prev => prev.filter(item => item.id !== id));
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setEditPackageName(booking.packageName);
    setEditCitizenType(booking.citizenType);
    setEditMembers(booking.members);
    // setEditPaymentStatus(booking.paymentStatus);
    setEditAmountPaid(booking.amountPaid);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    const updatedBookings = bookingList.map(booking =>
      booking.id === selectedBooking.id
        ? { ...booking, packageName: editPackageName, citizenType: editCitizenType, members: editMembers,amountPaid: editAmountPaid }
        : booking
    );
    setBookingList(updatedBookings);
    setOpenEditDialog(false);
  };

  return (
    <Box p={3}>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Package Name</TableCell>
              <TableCell>Citizen Type</TableCell>
              <TableCell>No. of Members</TableCell>
              {/* <TableCell>Payment Status</TableCell> */}
              <TableCell>Amount Paid</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookingList.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.packageName}</TableCell>
                <TableCell>{booking.citizenType}</TableCell>
                <TableCell>{booking.members}</TableCell>
                {/* <TableCell>{booking.paymentStatus}</TableCell> */}
                <TableCell>₹{booking.amountPaid}</TableCell>
                <TableCell>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(booking)} // Open edit dialog
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button> */}

                  <PopupState variant="popper" popupId={`delete-popup-${booking.id}`}>
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
                                <Typography>Are you sure you want to delete this booking?</Typography>
                                <div style={{ marginTop: 10 }}>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDelete(booking.id)}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Booking</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Package Name"
            value={editPackageName}
            onChange={(e) => setEditPackageName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Citizen Type"
            value={editCitizenType}
            onChange={(e) => setEditCitizenType(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="No. of Members"
            type="number"
            value={editMembers}
            onChange={(e) => setEditMembers(e.target.value)}
            margin="normal"
          />
          {/* <TextField
            fullWidth
            label="Payment Status"
            value={editPaymentStatus}
            onChange={(e) => setEditPaymentStatus(e.target.value)}
            margin="normal"
          /> */}
          <TextField
            fullWidth
            label="Amount Paid"
            type="number"
            value={editAmountPaid}
            onChange={(e) => setEditAmountPaid(e.target.value)}
            margin="normal"
          />
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
