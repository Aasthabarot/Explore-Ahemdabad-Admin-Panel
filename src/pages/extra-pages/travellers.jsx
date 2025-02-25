import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function TravellerReports() {
  const [tabIndex, setTabIndex] = useState(0);
  const [rows, setRows] = useState([]);
  const [reportType, setReportType] = useState('');
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/users');
        console.log("API Response:", response.data);

        // Extract the `data` array from the response
        const usersArray = response.data.data;

        // Format the data for the table
        const formattedRows = usersArray.map((user) => ({
          travellerID: user._id,
          fullName: user.name,
          email: user.email,
          phone: user.contact,
        }));

        console.log("Formatted Data:", formattedRows);

        // Update the state with the formatted data
        setRows(formattedRows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleReportChange = (event) => {
    setReportType(event.target.value);
  };

  const generateReport = () => {
    let reportResult = [];
    switch (reportType) {
      case 'totalTravellers':
        reportResult = [{ label: 'Total Travellers', count: rows.length }];
        break;
      case 'travellersWithEmail':
        reportResult = rows.filter(row => row.email).map(row => ({ fullName: row.fullName, email: row.email }));
        break;
      case 'travellersWithoutEmail':
        reportResult = rows.filter(row => !row.email).map(row => ({ fullName: row.fullName }));
        break;
      case 'travellersWithPhone':
        reportResult = rows.filter(row => row.phone).map(row => ({ fullName: row.fullName, phone: row.phone }));
        break;
      case 'travellersWithoutPhone':
        reportResult = rows.filter(row => !row.phone).map(row => ({ fullName: row.fullName }));
        break;
      default:
        reportResult = [];
    }
    setReportData(reportResult);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Report Details']],
      body: reportData.map(item => [
        Object.entries(item).map(([key, value]) => `${key}: ${value}`).join(', ')
      ]),
    });
    doc.save('traveller_report.pdf');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Travellers" />
        <Tab label="Reports" />
      </Tabs>

      {tabIndex === 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Traveller ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Phone Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow key={row.travellerID}>
                    <TableCell>{row.travellerID}</TableCell>
                    <TableCell>{row.fullName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">No Data Available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tabIndex === 1 && (
        <Box p={3}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Report Type</InputLabel>
            <Select value={reportType} onChange={handleReportChange} label="Report Type">
              <MenuItem value="totalTravellers">Total Travellers</MenuItem>
              <MenuItem value="travellersWithEmail">Travellers with Email</MenuItem>
              {/* <MenuItem value="travellersWithoutEmail">Travellers without Email</MenuItem> */}
              <MenuItem value="travellersWithPhone">Travellers with Phone</MenuItem>
              {/* <MenuItem value="travellersWithoutPhone">Travellers without Phone</MenuItem> */}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={generateReport} sx={{ mt: 2 }}>
            Generate Report
          </Button>

          {reportData.length > 0 && (
            <>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table sx={{ minWidth: 650 }} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Report Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reportData.map((item, index) => (
                      <TableRow key={index}>
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
