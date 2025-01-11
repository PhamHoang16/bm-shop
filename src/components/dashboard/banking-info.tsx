"use client"

import React from 'react';
import { Card, Grid, Box, Typography, IconButton, Divider } from '@mui/material';
import { User } from '@/types/user';
import { authClient } from '@/lib/auth/client';

export default function BankingInfo() {
	const [user, setUser] = React.useState<User | null>(null);
	React.useEffect(() => {
		const fetchUser = async () => {
			const { data, error } = await authClient.getUser();
			if (error) {
				console.error('Error fetching user:', error);
				return;
			}
			if (data) {
				setUser(data);
			}
		};
		fetchUser();
	}, []);
	return (
		<Card sx={{ padding: 2 }}>
			<Grid container spacing={2} alignItems="stretch" justifyContent="center" sx={{ height: '100%' }}>
				<Grid item xs={12} md={5} sx={{ display: 'flex' }}>
					<Box
						sx={{
							padding: '15px',
							background: 'linear-gradient(134deg, #04a468 0%, #0d788c 100%)',
							borderRadius: '10px',
							color: 'white',
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-start',
							fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
							fontSize: '1rem',
							fontWeight: 400,
							lineHeight: 1.5,
							textAlign: 'left',
							textRendering: 'optimizeLegibility',
							WebkitFontSmoothing: 'antialiased',
							boxSizing: 'border-box',
						}}
					>
						<Typography variant="h5" sx={{ marginBottom: 10, textAlign: 'center' }}>
							THÔNG TIN NẠP TIỀN
						</Typography>
						<Box>
							<Typography variant="body1">
								Ngân hàng: <strong>ACB - Á Châu</strong>
							</Typography>
							<Divider sx={{ marginTop: '10px', marginBottom: '30px' }} />

							<Typography variant="body1">
								Chủ tài khoản: <br />
								<strong>TRAN VAN MINH TUAN</strong>
							</Typography>
							<Divider sx={{ marginTop: '10px', marginBottom: '30px' }} />

							<Typography variant="body1">
								Số tài khoản: <br />
								<strong>121292118</strong>
								<IconButton
									sx={{ color: 'white', marginLeft: 1 }}
								>
								</IconButton>
							</Typography>
							<Divider sx={{ marginTop: '10px', marginBottom: '30px' }} />

							<Typography variant="body1">
								Nội dung chuyển khoản: <br />
								<strong>BM SHOP TKQC {user?.name}</strong>
								<IconButton
									sx={{ color: 'white', marginLeft: 1 }}
								>
								</IconButton>
							</Typography>
							<Divider sx={{ margin: '10px 0' }} />
						</Box>
						<Typography variant="body2" sx={{ marginTop: 10 }}>
							Hệ thống sẽ tự động cộng tiền vào tài khoản của bạn sau khoảng 1-5 phút. Nếu quá 2 tiếng tiền chưa được cộng vui lòng liên hệ admin để được hỗ trợ.
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} md={7} sx={{ display: 'flex' }}>
					<Box sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
						<Typography variant="h6" sx={{ marginBottom: 2 }}>
							Quét mã QR để thanh toán
						</Typography>
						<Typography variant="body2" sx={{ marginBottom: 2, color: '#04a468' }}>Sử dụng <strong>App Internet Banking</strong> hoặc ứng dụng camera hỗ trợ QR code để quét mã</Typography>
						<img
							src="/assets/qr-bank.jpg"
							alt="QR code"
							style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
						/>
					</Box>
				</Grid>
			</Grid>
		</Card>
	);
}