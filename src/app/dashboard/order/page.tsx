'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import axios from 'axios'; // Import axios for making HTTP requests
import { Order } from '@/types/order';
import {OrderTable} from "@/components/dashboard/order-table";

export default function Page(): React.JSX.Element {
  const [orderList, setOrderList] = React.useState<Order[]>([]); // State to hold the orders
  const [loading, setLoading] = React.useState<boolean>(false); // State for loading indicator
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null); // State for error message

  // Fetch data when the component mounts
  React.useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setErrorMessage(null); // Reset error message before fetching
      try {
        const response = await axios.get('http://localhost:8080/products/order?userId=6773e35596509e3d37d60d55');
        setOrderList(response.data);
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
