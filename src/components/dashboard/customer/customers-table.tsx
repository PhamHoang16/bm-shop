'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import { User } from '@/types/user';
import { formatCurrency } from '@/lib/currency';

interface CustomTableProps {
  rows?: User[];
}

export function CustomersTable({
  rows = [],
}: CustomTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.id);
  }, [rows]);

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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover key={row.id}>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Avatar src='/assets/user.jpg' />
                      <Typography variant="subtitle2">{row.username}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    {row.email}
                  </TableCell>
                  <TableCell>{row.balance ? formatCurrency(row.balance) : '0đ'}</TableCell>
                  <TableCell>{row.totalOrder}</TableCell>
                  <TableCell>{dayjs(row.createdDate).format('MMM D, YYYY')}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
    </Card>
  );
}
