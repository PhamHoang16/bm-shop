import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { UpdatePasswordForm } from '@/components/dashboard/settings/update-password-form';
import {ToastContainer} from "react-toastify";

export const metadata = { title: `Settings | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Cài đặt</Typography>
      </div>
      <ToastContainer />
      <UpdatePasswordForm />
    </Stack>
  );
}
