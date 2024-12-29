import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps): React.JSX.Element {
  const {id, name, price, quantity, description } = product;
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/product/${id}`);
  };

  return (
    <Card
      sx={{
        width: 250, // Đảm bảo chiều rộng cố định
        height: 500, // Đảm bảo chiều cao cố định
        display: 'flex',
        flexDirection: 'column', // Sắp xếp theo cột
        justifyContent: 'space-between', // Tạo khoảng cách đều giữa các phần
        borderRadius: 2,
        boxShadow: 3,
        overflow: 'hidden',
      }}
    >
      {/* Tiêu đề sản phẩm */}
      <Box sx={{ backgroundColor: '#0096c7', padding: 2 }}>
        <Typography
          variant="body1"
          color="white"
          fontWeight="bold"
          textAlign="center"
        >
          {name}
        </Typography>
      </Box>

      {/* Nội dung sản phẩm */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h5"
          color="red"
          fontWeight="bold"
          textAlign="center"
        >
          » {price}
        </Typography>

        <Typography
          variant="body1"
          color="green"
          textAlign="center"
          sx={{ marginTop: 1 }}
        >
          Còn lại: <strong>{quantity}</strong>
        </Typography>

        <Divider sx={{ my: 2 }} />
        {description?.map((desc, index) => (
          <Typography
            key={index}
            variant="body2"
            color="textSecondary"
            sx={{ marginTop: index === 0 ? 0 : 1 }}
          >
            ✔ {desc}
          </Typography>
        ))}
      </CardContent>

      {/* Nút mua hàng */}
      <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
        <Button variant="outlined" color="secondary" size="large" onClick={handleEditClick}>
          Chỉnh sửa
        </Button>
        <Button variant="contained" color="primary" size="large">
          Mua hàng
        </Button>
      </CardActions>
    </Card>
  );
}
