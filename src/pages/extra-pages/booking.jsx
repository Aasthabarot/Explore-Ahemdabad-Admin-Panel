import * as React from 'react';
import { Button, Box, TextField, Table, TableBody, Typography, TableCell, TableContainer, TableHead, TableRow, Paper, Tabs, Tab, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Sample data for bookings
const bookingData = [
  { "id": 1, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 250, "members": 3, "paymentStatus": "Failed", "bookingDate": "2025-02-15" },
  { "id": 2, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 200, "members": 2, "paymentStatus": "Failed", "bookingDate": "2025-01-21" },
  { "id": 3, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 200, "members": 2, "paymentStatus": "Completed", "bookingDate": "2025-01-11" },
  { "id": 4, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 400, "members": 1, "paymentStatus": "Completed", "bookingDate": "2025-02-02" },
  { "id": 5, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 400, "members": 2, "paymentStatus": "Pending", "bookingDate": "2025-01-13" },
  { "id": 6, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 250, "members": 6, "paymentStatus": "Pending", "bookingDate": "2025-01-14" },
  { "id": 7, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 250, "members": 3, "paymentStatus": "Completed", "bookingDate": "2025-01-26" },
  { "id": 8, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 200, "members": 6, "paymentStatus": "Completed", "bookingDate": "2025-01-21" },
  { "id": 9, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 200, "members": 1, "paymentStatus": "Pending", "bookingDate": "2025-01-06" },
  { "id": 10, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 400, "members": 1, "paymentStatus": "Completed", "bookingDate": "2025-01-11" },
  { "id": 11, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 250, "members": 2, "paymentStatus": "Failed", "bookingDate": "2025-02-09" },
  { "id": 12, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 350, "members": 2, "paymentStatus": "Pending", "bookingDate": "2025-01-22" },
  { "id": 13, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 200, "members": 2, "paymentStatus": "Pending", "bookingDate": "2025-01-12" },
  { "id": 14, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 200, "members": 4, "paymentStatus": "Completed", "bookingDate": "2025-01-28" },
  { "id": 15, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 250, "members": 2, "paymentStatus": "Pending", "bookingDate": "2025-02-11" },
  { "id": 16, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 200, "members": 4, "paymentStatus": "Completed", "bookingDate": "2025-02-23" },
  { "id": 17, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 350, "members": 3, "paymentStatus": "Pending", "bookingDate": "2025-02-23" },
  { "id": 18, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 200, "members": 6, "paymentStatus": "Pending", "bookingDate": "2025-02-20" },
  { "id": 19, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 250, "members": 5, "paymentStatus": "Pending", "bookingDate": "2025-02-18" },
  { "id": 20, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 350, "members": 5, "paymentStatus": "Completed", "bookingDate": "2025-01-21" },
  { "id": 21, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 350, "members": 2, "paymentStatus": "Pending", "bookingDate": "2025-01-18" },
  { "id": 22, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 200, "members": 5, "paymentStatus": "Pending", "bookingDate": "2025-02-18" },
  { "id": 23, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 400, "members": 6, "paymentStatus": "Pending", "bookingDate": "2025-01-26" },
  { "id": 24, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 250, "members": 5, "paymentStatus": "Pending", "bookingDate": "2025-01-08" },
  { "id": 25, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 350, "members": 5, "paymentStatus": "Pending", "bookingDate": "2025-01-24" },
  { "id": 26, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 250, "members": 2, "paymentStatus": "Pending", "bookingDate": "2025-02-06" },
  { "id": 27, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 200, "members": 4, "paymentStatus": "Completed", "bookingDate": "2025-01-04" },
  { "id": 28, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 200, "members": 2, "paymentStatus": "Pending", "bookingDate": "2025-02-17" },
  { "id": 29, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 200, "members": 5, "paymentStatus": "Completed", "bookingDate": "2025-02-08" },
  { "id": 30, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 200, "members": 4, "paymentStatus": "Completed", "bookingDate": "2025-02-16" },
  { "id": 31, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 200, "members": 6, "paymentStatus": "Pending", "bookingDate": "2025-01-05" },
  { "id": 32, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 200, "members": 4, "paymentStatus": "Completed", "bookingDate": "2025-01-27" },
  { "id": 33, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 200, "members": 4, "paymentStatus": "Completed", "bookingDate": "2025-01-19" },
  { "id": 34, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 200, "members": 3, "paymentStatus": "Completed", "bookingDate": "2025-01-02" },
  { "id": 35, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 200, "members": 5, "paymentStatus": "Completed", "bookingDate": "2025-02-19" },
  { "id": 36, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 200, "members": 6, "paymentStatus": "Completed", "bookingDate": "2025-01-29" },
  { "id": 37, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 200, "members": 6, "paymentStatus": "Pending", "bookingDate": "2025-02-12" },
  { "id": 38, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 200, "members": 4, "paymentStatus": "Completed", "bookingDate": "2025-02-05" },
  { "id": 39, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 250, "members": 2, "paymentStatus": "Pending", "bookingDate": "2025-02-11" },
  { "id": 40, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 200, "members": 4, "paymentStatus": "Completed", "bookingDate": "2025-02-23" },
  { "id": 41, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 350, "members": 3, "paymentStatus": "Pending", "bookingDate": "2025-02-23" },
  { "id": 42, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 200, "members": 6, "paymentStatus": "Pending", "bookingDate": "2025-02-20" },
  { "id": 43, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 250, "members": 5, "paymentStatus": "Pending", "bookingDate": "2025-02-18" },
  { "id": 44, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 350, "members": 5, "paymentStatus": "Completed", "bookingDate": "2025-01-21" },
  { "id": 45, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 350, "members": 2, "paymentStatus": "Pending", "bookingDate": "2025-01-18" },
  { "id": 46, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 200, "members": 5, "paymentStatus": "Pending", "bookingDate": "2025-02-18" },
  { "id": 47, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 400, "members": 6, "paymentStatus": "Pending", "bookingDate": "2025-01-26" },
  { "id": 48, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 250, "members": 5, "paymentStatus": "Pending", "bookingDate": "2025-01-08" },
  { "id": 49, "packageName": "Ahmedabad City Explorer Tour", "packagePrice": 350, "members": 5, "paymentStatus": "Pending", "bookingDate": "2025-01-24" },
  { "id": 50, "packageName": "Ahmedabad Heritage Tour", "packagePrice": 250, "members": 2, "paymentStatus": "Pending", "bookingDate": "2025-02-06" }
]


export default function BookingPage() {
  const [bookingList, setBookingList] = React.useState(bookingData);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [filteredBookings, setFilteredBookings] = React.useState([]);
  const [filterDate, setFilterDate] = React.useState('');
  const [filterPackageName, setFilterPackageName] = React.useState('');
  const [reportType, setReportType] = React.useState('');
  const [reportData, setReportData] = React.useState([]);

  const handleDelete = (id) => {
    setBookingList(prev => prev.filter(item => item.id !== id));
  };

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleFilter = () => {
    let filtered = [];
    switch (reportType) {
      case 'bookingsByDate':
        filtered = bookingList.filter(booking => booking.bookingDate === filterDate);
        setReportData([{ date: filterDate, totalBookings: filtered.length }]);
        break;
      case 'bookingsByPackage':
        filtered = bookingList.filter(booking => booking.packageName === filterPackageName);
        setReportData([{ packageName: filterPackageName, totalBookings: filtered.length }]);
        break;
      case 'revenueByDate':
        filtered = bookingList.filter(booking => booking.bookingDate === filterDate);
        const totalRevenue = filtered.reduce((sum, booking) => sum + booking.packagePrice * booking.members, 0);
        setReportData([{ date: filterDate, totalRevenue }]);
        break;
      case 'revenueByPackage':
        filtered = bookingList.filter(booking => booking.packageName === filterPackageName);
        const revenueByPackage = filtered.reduce((sum, booking) => sum + booking.packagePrice * booking.members, 0);
        setReportData([{ packageName: filterPackageName, totalRevenue: revenueByPackage }]);
        break;
      case 'paymentStatusSummary':
        const statusSummary = bookingList.reduce((acc, booking) => {
          acc[booking.paymentStatus] = (acc[booking.paymentStatus] || 0) + 1;
          return acc;
        }, {});
        setReportData(Object.entries(statusSummary).map(([status, count]) => ({ status, count })));
        break;
      default:
        setReportData([]);
    }
    setFilteredBookings(filtered);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Report Type', 'Details']],
      body: reportData.map(item => [
        reportType,
        Object.entries(item).map(([key, value]) => `${key}: ${value}`).join(', ')
      ]),
    });
    doc.save('booking_report.pdf');
  };

  const uniquePackageNames = [...new Set(bookingList.map(booking => booking.packageName))];

  return (
    <Box p={3}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Bookings" />
        <Tab label="Reports" />
      </Tabs>

      {tabIndex === 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Package Name</TableCell>
                  <TableCell>Package Price</TableCell>
                  <TableCell>No. of Members</TableCell>
                  <TableCell>Payment Status</TableCell>
                  <TableCell>Booking Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingList.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.packageName}</TableCell>
                    <TableCell>₹{booking.packagePrice}</TableCell>
                    <TableCell>{booking.members}</TableCell>
                    <TableCell>{booking.paymentStatus}</TableCell>
                    <TableCell>{booking.bookingDate}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(booking.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom>
            Generate Report
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Report Type</InputLabel>
            <Select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              label="Report Type"
            >
              <MenuItem value="bookingsByDate">Total Bookings by Date</MenuItem>
              <MenuItem value="bookingsByPackage">Total Bookings by Package Name</MenuItem>
              {/* <MenuItem value="revenueByDate">Total Revenue by Date</MenuItem> */}
              <MenuItem value="revenueByPackage">Total Revenue by Package Name</MenuItem>
              <MenuItem value="paymentStatusSummary">Payment Status Summary</MenuItem>
            </Select>
          </FormControl>

          {reportType === 'bookingsByDate' && (
            <TextField
              label="Filter by Date"
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
            />
          )}

          {(reportType === 'bookingsByPackage' || reportType === 'revenueByPackage') && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Package Name</InputLabel>
              <Select
                value={filterPackageName}
                onChange={(e) => setFilterPackageName(e.target.value)}
                label="Package Name"
              >
                {uniquePackageNames.map((name, index) => (
                  <MenuItem key={index} value={name}>{name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Button variant="contained" color="primary" onClick={handleFilter} sx={{ mt: 2 }}>
            Generate Report
          </Button>

          {reportData.length > 0 && (
            <>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="report table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Report Type</TableCell>
                      <TableCell>Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reportData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{reportType}</TableCell>
                        <TableCell>
                          {Object.entries(item).map(([key, value]) => (
                            <div key={key}>{`${key}: ${value}`}</div>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button variant="contained" color="secondary" onClick={downloadPDF} sx={{ mt: 2 }}>
                Download Report as PDF
              </Button>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}
