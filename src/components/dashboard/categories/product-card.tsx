import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';
import IconButton from "@mui/material/IconButton";
import { PencilSimple } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import axios from 'axios';

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps): React.JSX.Element {
  const { id, name, price, quantity, description } = product;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [responseItems, setResponseItems] = useState<string[]>([]);
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEditClick = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      await router.push(`/product/${id}`);
    } catch (error) {
      console.error('Lỗi khi chuyển hướng:', error);
    } finally {
      setLoading(false); // Dừng loading sau khi push hoàn tất
    }
  };

  const handleBuyClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setResponseItems([]);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedQuantity(Number(event.target.value));
  };

  const handleConfirmPurchase = async () => {
    try {
      const userId = '6773e35596509e3d37d60d55'; // Thay thế bằng userId thực tế
      const response = await axios.put<string[]>('http://localhost:8080/products/buy', null, {
        params: {
          productId: id,
          userId: userId,
          number: selectedQuantity,
        },
      });
      setResponseItems(response.data);
      console.log('Mua hàng thành công:', response.data);
      setOpen(false);
      setResponseDialogOpen(true);
    } catch (error) {
      console.error('Lỗi khi mua hàng:', error);
      setResponseItems(['Lỗi khi mua hàng']);
    }
  };

  const handleCopyToClipboard = () => {
    const textToCopy = responseItems.join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('Đã sao chép vào bộ nhớ tạm');
    }).catch((error) => {
      console.error('Lỗi khi sao chép:', error);
    });
  };

  const handleCancel = () => {
    setResponseDialogOpen(false);
    window.location.reload();
  };

  return (
    <>
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
        <CardActions sx={{ flexDirection: 'column', alignItems: 'center', paddingBottom: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40, height: 40, border: '1px solid #ccc', borderRadius: '50%', marginBottom: 2 }}>
            <IconButton color="secondary" onClick={handleEditClick}>
              <PencilSimple size={20} />
            </IconButton>
          </Box>
          <Button variant="contained" color="primary" size="large" onClick={handleBuyClick}>
            Mua hàng
          </Button>
        </CardActions>
      </Card>

      {/* Dialog chọn số lượng */}
      <Dialog open={open} onClose={handleClose} sx={{ textAlign: 'center', padding: 10 }}>
        <DialogTitle>Chọn số lượng</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Số lượng"
            type="number"
            fullWidth
            value={selectedQuantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1, max: quantity }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleConfirmPurchase} variant="contained" color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog hiển thị kết quả mua hàng */}
      <Dialog open={responseDialogOpen} onClose={handleCancel} sx={{
        '& .MuiDialog-paper': {
          width: '1200px', // Chiều rộng tùy chỉnh
        },
      }}>
        <DialogTitle>Kết quả mua hàng</DialogTitle>
        <DialogContent>
          {responseItems.length > 0 && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6">Các mục đã mua:</Typography>
              {responseItems.map((item, index) => (
                <Typography key={index} variant="body2" color="textSecondary">
                  {item}
                </Typography>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCopyToClipboard} variant="contained" color="primary">Sao chép</Button>
          <Button onClick={handleCancel}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}