import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";

const PaymentHistory = () => {
  // Sample payment data (replace with actual data from your backend)
  const [paymentData] = useState([
    {
      paymentId: 1,
      bookingId: 101,
      guideId: 201,
      paymentType: "Credit Card",
      upiId: "example@upi",
      cardNumber: "**** **** **** 1234",
      amount: 50.0,
    },
    {
      paymentId: 2,
      bookingId: 102,
      guideId: 202,
      paymentType: "UPI",
      upiId: "test@upi",
      cardNumber: "**** **** **** 5678",
      amount: 75.0,
    },
    {
      paymentId: 3,
      bookingId: 103,
      guideId: 203,
      paymentType: "Debit Card",
      upiId: "user@upi",
      cardNumber: "**** **** **** 9876",
      amount: 100.0,
    },
    {
      paymentId: 4,
      bookingId: 104,
      guideId: 204,
      paymentType: "UPI",
      upiId: "example2@upi",
      cardNumber: "**** **** **** 4321",
      amount: 200.0,
    },
    {
      paymentId: 5,
      bookingId: 105,
      guideId: 205,
      paymentType: "Credit Card",
      upiId: "another@upi",
      cardNumber: "**** **** **** 8765",
      amount: 150.0,
    },
    // Add more rows as needed
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ display: "flex", flexDirection: "column" }}>
      <TableContainer
        component={Paper}
        sx={{ flexGrow: 1, height: "100%", padding: 0 }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="payment history table">
          <TableHead>
            <TableRow>
              <TableCell>Payment ID</TableCell>
              <TableCell>Booking ID</TableCell>
              <TableCell>Guide ID</TableCell>
              <TableCell>Payment Type</TableCell>
              <TableCell>UPI ID</TableCell>
              <TableCell>Card Number</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((payment) => (
                <TableRow key={payment.paymentId}>
                  <TableCell>{payment.paymentId}</TableCell>
                  <TableCell>{payment.bookingId}</TableCell>
                  <TableCell>{payment.guideId}</TableCell>
                  <TableCell>{payment.paymentType}</TableCell>
                  <TableCell>{payment.upiId}</TableCell>
                  <TableCell>{payment.cardNumber}</TableCell>
                  <TableCell>${payment.amount}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <TablePagination
        component="div"
        count={paymentData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Paper>
  );
};

export default PaymentHistory;
