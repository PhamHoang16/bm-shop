"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function CheckLiveForm(): React.JSX.Element {
  const [uid, setUid] = React.useState('');
  const [status, setStatus] = React.useState<'live' | 'die' | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!uid.trim()) {
      toast.error('Vui lòng nhập UID!');
      return;
    }

    try {
      const response = await fetch(`https://graph2.facebook.com/v3.3/${uid}/picture?redirect=0`);
      if (!response.ok) {
        throw new Error('Failed to fetch UID status');
      }

      const data = await response.json();
      if (data?.data) {
        setStatus('live');
        toast.success('UID Live!');
      } else {
        throw new Error('UID không đúng');
      }
    } catch (error) {
      console.error('Error checking UID status:', error);
      setStatus('die');
      toast.error('UID Die!');
    }
  };

  return (
    <>
      <ToastContainer />
      <Card>
        <CardContent>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <TextField
              fullWidth
              label="Nhập UID"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              variant="outlined"
            />
            {status === 'live' && (
              <Alert severity="success" sx={{ width: '100%', textAlign: 'center' }}>
                UID is Live
              </Alert>
            )}
            {status === 'die' && (
              <Alert severity="error" sx={{ width: '100%', textAlign: 'center' }}>
                UID is Die
              </Alert>
            )}
          </Stack>
        </CardContent>
        <Divider />
        <CardActions>
          <Button fullWidth variant="contained" onClick={handleSubmit}>
            Kiểm tra UID
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
