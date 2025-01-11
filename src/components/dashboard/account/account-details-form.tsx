'use client';

import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';
import { User } from '@/types/user';
import { toast } from 'react-toastify';

export interface UserInfoProps {
  userInfo: User;
}

export function AccountDetailsForm({ userInfo }: UserInfoProps): React.JSX.Element {
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [isChanged, setIsChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setIsChanged(true);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsChanged(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.put(`http://localhost:8080/users/${userInfo.username}`, {
        name,
        email,
      });

      // Update user info with the new data
      const updatedUser = response.data;
      setName(updatedUser.name);
      setEmail(updatedUser.email);
      setIsChanged(false);
      toast.success('Thông tin cá nhân đã được cập nhật', {
        position: 'top-right',
        autoClose: 3000,
        onClose: () => {
          window.location.reload(); // Reload trang khi toast đóng
        },
      });
    } catch (error) {
      toast.error('Cập nhật thông tin không thành công', {
        position: 'top-right',
        autoClose: 3000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="Thông tin cá nhân" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Tên</InputLabel>
                <OutlinedInput
                  label="Tên"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                />
              </FormControl>
            </Grid>

            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  label="Địa chỉ email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={!isChanged || isSubmitting}
          >
            {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}