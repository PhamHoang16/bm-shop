"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export function DepositForm(): React.JSX.Element {
  const [user, setUser] = React.useState<{ id: string, name: string, avatar: string, email: string, balance: string } | null>(null);
  const [amount, setAmount] = React.useState('');

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`  http://localhost:8080/users/6773e35596509e3d37d60d55`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        setUser(data);

      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const username = sessionStorage.getItem('username');
    if (!username) {
      toast.error('Username not found in session storage');
      return;
    }

    try {
      const response = await axios.put('http://localhost:8080/users/deposit', null, {
        params: {
          username,
          amount: Number(amount),
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to deposit');
      }

      toast.success('Nạp tiền thành công!', {
        position: 'top-right',
        autoClose: 3000,
      });
      window.location.reload();
    } catch (error) {
      console.error('Error depositing money:', error);
      toast.error('Failed to deposit money');
    }
  };

  if (!user) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <>
      <ToastContainer />
      <Card>
        <CardContent>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <div>
              <Avatar src={user.avatar} sx={{ height: '80px', width: '80px' }} />
            </div>
            <Stack spacing={1} sx={{ textAlign: 'center' }}>
              <Typography variant="h5">{user.name}</Typography>
              <Typography color="text.secondary" variant="body2">
                {user.email}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Số dư hiện tại: {user.balance}
              </Typography>
            </Stack>
            <TextField
              fullWidth
              label="Nhập số tiền muốn nạp"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              variant="outlined"
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions>
          <Button fullWidth variant="contained" onClick={handleSubmit}>
            Nạp tiền
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
