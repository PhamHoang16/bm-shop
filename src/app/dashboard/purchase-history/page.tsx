import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';

export const metadata = { title: `Purchase History | Dashboard | ${config.site.name}` } satisfies Metadata;

const customers = [
  {
    id: 'USR-010',
    name: 'Cristiano Ronaldo',
    avatar: '/assets/user.jpg',
    email: 'hoangp10@gmail.com',
    totalOrders: 5,
    phone: '908-691-3242',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-009',
    name: 'Lionel Messex',
    avatar: '/assets/user.jpg',
    email: 'hoangp10@gmail.com',
    totalOrders: 5,
    phone: '415-907-2647',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-008',
    name: 'Hoang Pham',
    avatar: '/assets/user.jpg',
    email: 'hoangp10@gmail.com',
    totalOrders: 5,
    phone: '770-635-2682',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-007',
    name: 'Neymar Jr',
    avatar: '/assets/user.jpg',
    email: 'hoangp10@gmail.com',
    totalOrders: 5,
    phone: '801-301-7894',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-006',
    name: 'Kylian Mbappe',
    avatar: '/assets/user.jpg',
    email: 'hoangp10@gmail.com',
    totalOrders: 5,
    phone: '313-812-8947',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-005',
    name: 'Sadio Mane',
    avatar: '/assets/user.jpg',
    email: 'hoangp10@gmail.com',
    totalOrders: 5,
    phone: '712-351-5711',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-004',
    name: 'Mohamed Salah',
    avatar: '/assets/user.jpg',
    email: 'hoangp10@gmail.com',
    totalOrders: 5,
    phone: '858-602-3409',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-003',
    name: 'Robert Lewandowski',
    avatar: '/assets/user.jpg',
    email: 'hoangp10@gmail.com',
    totalOrders: 5,
    phone: '304-428-3097',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-002',
    name: 'Kevin De Bruyne',
    avatar: '/assets/user.jpg',
    email: 'hoangp10@gmail.com',
    totalOrders: 5,
    phone: '702-661-1654',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-001',
    name: 'Luka Modric',
    avatar: '/assets/user.jpg',
    email: 'hoangp10@gmail.com',
    totalOrders: 5,
    phone: '972-333-4106',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-011',
    name: 'New User',
    avatar: '/assets/user.jpg',
    email: 'hoangp10@gmail.com', // Updated email
    totalOrders: 0,
    phone: '123-456-7890',
    createdAt: dayjs().subtract(1, 'hour').toDate(),
  }
] satisfies Customer[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Deposit History</Typography>

        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <CustomersFilters />
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
