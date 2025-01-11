'use client';  // Ensure this is a client-side component

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Order } from '@/types/order';
import { formatCurrency } from '@/lib/currency';

interface CustomTableProps {
  rows?: Order[];
}

export function OrderTable({
  rows = []
}: CustomTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((order) => order.id);
  }, [rows]);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const handleDialogOpen = (items: string[]) => {
    setSelectedItems(items);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Tổng số tiền</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Ngày đặt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover key={row.id}>
                  <TableCell>{row.productName}</TableCell>
                  <TableCell>{row.totalPrice ? formatCurrency(row.totalPrice) : '0đ'}</TableCell>
                  <TableCell>
                    {row.items.length}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: '300px',  // Set maximum width for the column
                      overflow: 'hidden', // Hide overflow content
                      textOverflow: 'ellipsis', // Add ellipsis for overflow
                      display: '-webkit-box', // Enable the box model for multiline truncation
                      WebkitBoxOrient: 'vertical', // Apply vertical orientation for text
                      WebkitLineClamp: 2, // Limit the number of lines to 2
                      whiteSpace: 'normal', // Allow wrapping of text if needed
                      wordBreak: 'break-word', // Break words if they are too long
                      cursor: 'pointer', // Indicate that the cell is clickable
                    }}
                    onClick={() => handleDialogOpen(row.items)} // Open dialog when clicking
                  >
                    {row.items.join(', ')}
                  </TableCell>
                  <TableCell>{dayjs(row.createdAt).format('HH:mm DD-MM-YYYY')}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />

      {/* Dialog to display the full items list */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Items</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {selectedItems.join(", ")}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
