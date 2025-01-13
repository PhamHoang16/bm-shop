'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { User } from '@/types/user';
import api from '@/lib/api';
import axios from 'axios';

export default function Page(): React.JSX.Element {
  const [userList, setUserList] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  React.useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const response = await api.get('/users');
        setUserList(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Quản lý người dùng</Typography>
        </Stack>
      </Stack>
      <CustomersFilters onSearch={setSearchTerm} />
      <CustomersTable rows={userList} searchTerm={searchTerm} />
    </Stack >
  );
}