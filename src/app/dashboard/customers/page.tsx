'use client';

import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { User } from '@/types/user';
import axios from 'axios';

export default function Page(): React.JSX.Element {
  const [userList, setUserList] = React.useState<User[]>([]); // State to hold the orders
  const [loading, setLoading] = React.useState<boolean>(false); // State for loading indicator
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null); // State for error message

  React.useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setErrorMessage(null); // Reset error message before fetching
      try {
        const response = await axios.get('http://localhost:8080/users');
        setUserList(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data.message); // Set the error message from the response
        } else {
          setErrorMessage('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Customers</Typography>

        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <CustomersFilters />
      <CustomersTable
        rows={userList}
      />
    </Stack>
  );
}
