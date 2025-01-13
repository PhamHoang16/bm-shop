'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import axios from 'axios'; 
import { Order } from '@/types/order';
import { OrderTable } from "@/components/dashboard/order-table";
import { useUser } from '@/hooks/use-user';
import api from '@/lib/api';

export default function Page(): React.JSX.Element {
  const [orderList, setOrderList] = React.useState<Order[]>([]); 
  const [loading, setLoading] = React.useState<boolean>(false); 
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const { user } = useUser();

  React.useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const response = await api.get(`/products/order?userId=${user?.id}`);
        setOrderList(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Có lỗi xảy ra');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>; // Display loading indicator while fetching data

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Lịch sử mua hàng</Typography>
        </Stack>
      </Stack>
      {errorMessage ? (
        <Typography color="error">{errorMessage}</Typography> // Display error message
      ) : (
        <OrderTable rows={orderList} />
      )}
    </Stack>
  );
}
