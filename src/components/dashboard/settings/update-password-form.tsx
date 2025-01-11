'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import {toast} from "react-toastify";
import axios from "@/lib/axios";

export function UpdatePasswordForm(): React.JSX.Element {
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp', {
        position: 'top-right',
        autoClose: 3000,
      })
      return;
    }

    const username = sessionStorage.getItem('username');
    if (!username) {
      toast.error('Không tìm thấy tên người dùng', {
        position: 'top-right',
        autoClose: 3000,
      })
    }

    try {
      const response = await axios.put(`/users/change-password?username=${username}`, {
        currentPassword,
        newPassword,
      });

      if (response.status != 200) {
        throw new Error('Failed to update password');
      }

      toast.success('Cập nhật mật khẩu thành công!', {
        position: 'top-right',
        autoClose: 3000,
        onClose: () => {
          window.location.reload(); // Reload trang khi toast đóng
        },
      })
    } catch (error) {
      // @ts-ignore
      toast.error(error.response.data.message, {
        position: 'top-right',
        autoClose: 3000,
      })
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Đổi mật khẩu" title="Mật khẩu" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
            <FormControl fullWidth>
              <InputLabel>Mật khẩu hiện tại</InputLabel>
              <OutlinedInput
                label="Current Password"
                name="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Mật khẩu mới</InputLabel>
              <OutlinedInput
                label="New password"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Xác nhận mật khẩu</InputLabel>
              <OutlinedInput
                label="Confirm password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">Cập nhật</Button>
        </CardActions>
      </Card>
    </form>
  );
}
