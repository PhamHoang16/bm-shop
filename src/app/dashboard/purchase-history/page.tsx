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

  // Fetch data when the component mounts
  React.useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/products/order?userId=6773e35596509e3d37d60d55'); // Replace with actual userId or query parameter
        setOrderList(response.data); // Assuming the response data matches Order type
      } catch (error) {
        console.error('Error fetching orders:', error);
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
      <OrderTable rows={orderList} />
    </Stack>
  );
}
