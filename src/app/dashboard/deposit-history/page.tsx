'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DepositTable } from "@/components/dashboard/deposit-table";
import { Deposit } from "@/types/deposit";
import { useUser } from '@/hooks/use-user';
import api from '@/lib/api';

export default function Page(): React.JSX.Element {
  const [depositList, setDepositList] = React.useState<Deposit[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { user } = useUser();

  React.useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return; // Wait until user is available

      setLoading(true);
      try {
        const response = await api.get(`/users/deposit?userId=${user.id}`);
        setDepositList(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]); // Re-run the effect when user changes

  if (loading) return <div>Loading...</div>;

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Lịch sử nạp tiền</Typography>
        </Stack>
      </Stack>
      <DepositTable rows={depositList} />
    </Stack>
  );
}
