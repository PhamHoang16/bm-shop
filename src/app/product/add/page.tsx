import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import {AddProductForm} from "@/components/dashboard/add-product-form";
import {ToastContainer} from "react-toastify";

export const metadata = { title: `Account | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {

  return (
    <Stack spacing={3}>
      <ToastContainer />
      <div>
        <Typography variant="h4">Thêm sản phẩm</Typography>
      </div>
          <AddProductForm />
    </Stack>
  );
}
