'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { Money } from '@phosphor-icons/react';

import { User } from '@/types/user';
import { formatCurrency, formatCurrencyInput } from '@/lib/currency';
import { toast } from 'react-toastify';
import axios from 'axios';

interface CustomTableProps {
  rows?: User[];
  searchTerm: string;
}

export function CustomersTable({
  rows = [],
  searchTerm,
}: CustomTableProps): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [amount, setAmount] = React.useState<string>('');

  const handleOpen = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setAmount('');
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    if (numericValue === '') {
      setAmount('');
      return;
    }

    const formattedValue = formatCurrencyInput(numericValue);
    setAmount(formattedValue);
  };

  const handleAddMoney = async () => {
    if (!selectedUser) return;

    try {
      const response = await axios.put('http://localhost:8080/users/deposit', null, {
        params: {
          username: selectedUser.username,
          amount: Number(amount.replace(/[^0-9]/g, '')),
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to deposit');
      }

      toast.success('Nạp tiền thành công!', {
        position: 'top-right',
        autoClose: 3000,
      });
      window.location.reload();
    } catch (error) {
      console.error('Error depositing money:', error);
      toast.error('Failed to deposit money');
    }

    handleClose();
  };

  const filteredRows = React.useMemo(() => {
    return rows.filter((customer) =>
      customer.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rows, searchTerm]);

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số dư</TableCell>
              <TableCell>Đã mua</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => {
              return (
                <TableRow hover key={row.id}>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Avatar src='/assets/user.jpg' />
                      <Typography variant="subtitle2">{row.username}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.balance ? formatCurrency(row.balance) : '0đ'}</TableCell>
                  <TableCell>{row.totalOrder}</TableCell>
                  <TableCell>{dayjs(row.createdDate).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpen(row)}>
                      <Money size={24} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nạp tiền cho {selectedUser?.username}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Số tiền"
            type="text"
            fullWidth
            value={amount}
            onChange={handleAmountChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleAddMoney} variant="contained" color="primary">
            Nạp tiền
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}