'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { AccountDetailsForm } from '@/components/dashboard/account/account-details-form';
import { AccountInfo } from '@/components/dashboard/account/account-info';
import { useUser } from '@/hooks/use-user';
import { ToastContainer } from 'react-toastify';


export default function Page(): React.JSX.Element {

  const { user } = useUser();
  if (!user) {
    return <div>Not logged in</div>;
  }
  return (
    <Stack spacing={3}>
      <ToastContainer />
      <div>
        <Typography variant="h4">Tài khoản</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <AccountInfo userInfo={user} />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <AccountDetailsForm userInfo={user} />
        </Grid>
      </Grid>
    </Stack>
  );
}
