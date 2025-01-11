import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useUser } from '@/hooks/use-user';
import { User } from '@/types/user';
import { Box } from '@mui/system';
import { formatCurrency } from '@/lib/currency';

export interface UserInfoProps {
  userInfo: User;
}

export function AccountInfo({ userInfo }: UserInfoProps): React.JSX.Element {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src='/assets/user.jpg' sx={{ height: '80px', width: '80px' }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center', width: '100%' }}>
            <Typography variant="h5" color="#0466c8">{userInfo?.name}</Typography>
            <Typography color="text.secondary" variant="body1">
              {userInfo?.username}
            </Typography>
            <Typography color="text.secondary" variant="body1">
              {userInfo?.email}
            </Typography>
            <Box sx={{
              bgcolor: '#0466c8',
              padding: '5px',
              borderRadius: '25px',
              width: '60%',
              margin: 'auto'
            }}>
              <Typography color="var(--mui-palette-primary-contrastText)" variant="body2" fontWeight="bold">
                {'Số dư: ' + (userInfo?.balance ? formatCurrency(userInfo?.balance) : '0 đ')}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
    </Card>
  );
}
