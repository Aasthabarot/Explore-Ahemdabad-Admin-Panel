import PropTypes from 'prop-types';
// Material-UI imports
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Third-party imports
import { NumericFormat } from 'react-number-format';

// Project import
import Dot from 'components/@extended/Dot';

// Mock data for bookings
function createData(booking_id, package_name, citizen_type, members, payment_status, amount) {
  return { booking_id, package_name, citizen_type, members, payment_status, amount };
}

const rows = [
  createData(101, 'Heritage Walk', 'Indian', 4, 1, 4 * 200),
  createData(102, 'Cultural Walk', 'Foreign', 2, 1, 2 * 300),
  createData(103, 'City Tour', 'Indian', 5, 0, 5 * 200),
  createData(104, 'Heritage Walk', 'Foreign', 3, 2, 3 * 300),
  createData(105, 'Cultural Walk', 'Indian', 6, 1, 6 * 200),
  createData(101, 'Heritage Walk', 'Indian', 4, 1, 4 * 200),
  createData(102, 'Cultural Walk', 'Foreign', 2, 1, 2 * 300),
  createData(103, 'City Tour', 'Indian', 5, 0, 5 * 200),
  createData(104, 'Heritage Walk', 'Foreign', 3, 2, 3 * 300),
  createData(105, 'Cultural Walk', 'Indian', 6, 1, 6 * 200)
];



// Head cells for the new table
const headCells = [
  { id: 'booking_id', align: 'left', label: 'Booking ID' },
  { id: 'package_name', align: 'left', label: 'Package Name' },
  { id: 'citizen_type', align: 'left', label: 'Citizen Type' },
  { id: 'members', align: 'right', label: 'No. of Members' },
  { id: 'payment_status', align: 'left', label: 'Payment Status' },
  { id: 'amount', align: 'right', label: 'Amount Paid' }

];


// Table Head Component
function BookingTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// Payment Status Component
function PaymentStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Completed';
      break;
    case 2:
      color = 'error';
      title = 'Failed';
      break;
    default:
      color = 'primary';
      title = 'Unknown';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// Booking Table Component
export default function BookingTable() {
  const order = 'asc';
  const orderBy = 'booking_id';

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <BookingTableHead order={order} orderBy={orderBy} />
          <TableBody>
  {rows.map((row, index) => {
    const labelId = `enhanced-table-checkbox-${index}`;

    return (
      <TableRow
        hover
        role="checkbox"
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        tabIndex={-1}
        key={row.booking_id}
      >
        <TableCell component="th" id={labelId} scope="row">
          <Link color="secondary">{row.booking_id}</Link>
        </TableCell>
        <TableCell>{row.package_name}</TableCell>
        <TableCell>{row.citizen_type}</TableCell>
        <TableCell align="right">{row.members}</TableCell>
        <TableCell>
          <PaymentStatus status={row.payment_status} />
        </TableCell>
        <TableCell align="right">
          <NumericFormat
            value={row.amount}
            displayType="text"
            thousandSeparator
            prefix="₹"
          />
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
}

// PropTypes Validation
BookingTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };
PaymentStatus.propTypes = { status: PropTypes.number };
