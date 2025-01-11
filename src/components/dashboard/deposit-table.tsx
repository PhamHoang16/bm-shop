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
import dayjs from 'dayjs';
import { Deposit } from "@/types/deposit";
import { formatCurrency } from '@/lib/currency';

interface CustomTableProps {
  rows?: Deposit[];
}

export function DepositTable({
  rows = []
}: CustomTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((deposit) => deposit.id);
  }, [rows]);

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Ngày nạp</TableCell>
              <TableCell>Tổng số tiền</TableCell>
              <TableCell>Nội dung</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover key={row.id}>
                  <TableCell>{dayjs(row.createdAt).format('HH:mm DD-MM-YYYY')}</TableCell>
                  <TableCell>{row.amount ? formatCurrency(row.amount) : '0đ'}</TableCell>
                  <TableCell>{row.detail}</TableCell>
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
