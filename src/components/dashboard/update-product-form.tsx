'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { Product } from '@/types/product';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const categories = [
  { value: '6770f5e9c3d9a660954724b1', label: 'VIA: 902, Bất Tử Via - Kháng: BM Page' },
  { value: '6770f5e9c3d9a660954724b2', label: 'TKQC Nolimit - 1500$ - 250$ - 50$ - momo' },
  { value: '6770f5e9c3d9a660954724b3', label: 'Via Philippines (đã lách thuế 5%)' },
  { value: '6770f5e9c3d9a660954724b4', label: 'Tài Khoản Quảng Cáo Via Việt Nam' },
  { value: '6770f5e9c3d9a660954724b5', label: 'Via Indonesia' },
  { value: '6770f5e9c3d9a660954724b6', label: 'Via Thailand' },
  { value: '6770f5e9c3d9a660954724b7', label: 'Via Mỹ - USA, Facebook Tích Xanh' },
  { value: '6770f5e9c3d9a660954724b8', label: 'Page: Cổ, Kháng, nhiều like, lượt mua live stream' },
  { value: '6770f5e9c3d9a660954724b9', label: 'Via Ấn Độ' },
  { value: '6770f5e9c3d9a660954724ba', label: 'Clone & Via Seeding, Spam - Via Scan New' },
  { value: '6770f5e9c3d9a660954724bb', label: 'BM (Tài Khoản Quảng Cáo Doanh Nghiệp)' },
  { value: '6770f5e9c3d9a660954724bc', label: 'Mail' },
  { value: '6770f5e9c3d9a660954724bd', label: 'TKCN Tiktok Ads' },
  { value: '6770f5e9c3d9a660954724be', label: 'Kênh Tiktok' },
  { value: '6770f5e9c3d9a660954724bf', label: 'TKCN Quảng Bá' },
  { value: '6770f5e9c3d9a660954724c0', label: 'BC TikTok Ads' },
  { value: '6770f5e9c3d9a660954724c1', label: 'TKCN Hoàn Tín' },
] as const;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface UpdateProductFormProps {
  product: Product;
}

export function UpdateProductForm({ product }: UpdateProductFormProps): React.JSX.Element {
  const [error, setError] = useState(false);
  const [productData, setProductData] = useState({
    categoryId: product.categoryId,
    categoryName: product.categoryName,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.items ? product.items.length : 0,
    items: product.items ? product.items.join('\n') : '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId: productData.categoryId,
          categoryName: productData.categoryName,
          name: productData.name,
          description: productData.description,
          quantity: product.items ? product.items.length : 0,
          price: productData.price,
          items: productData.items.split('\n'),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      toast.success('Cập nhật sản phẩm thành công!', {
        position: 'top-right',
        autoClose: 3000,
      });
      window.location.reload();
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <Card>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid>
              <CardHeader title="Cập nhật sản phẩm" />
            </Grid>
            <Grid>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" type="submit">Lưu</Button>
              </CardActions>
            </Grid>
          </Grid>
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Danh mục</InputLabel>
                  <Select
                    value={productData.categoryId}
                    label="Category"
                    name="category"
                    variant="outlined"
                    MenuProps={MenuProps}
                    onChange={(e) => {
                      const selectedCategory = categories.find(category => category.value === e.target.value);
                      setProductData({
                        ...productData,
                        categoryId: selectedCategory?.value || '',
                        categoryName: selectedCategory?.label || '',
                      });
                    }}
                  >
                    {categories.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Tên sản phẩm</InputLabel>
                  <OutlinedInput
                    value={productData.name}
                    label="Tên sản phẩm"
                    name="name"
                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Giá</InputLabel>
                  <OutlinedInput
                    value={productData.price}
                    label="Giá"
                    name="price"
                    onChange={(e) => setProductData({ ...productData, price: e.target.value || ''})}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Số lượng</InputLabel>
                  <OutlinedInput
                    value={productData.quantity}
                    label="Số lượng"
                    name="quantity"
                    disabled
                  />
                </FormControl>
              </Grid>
              <Grid md={12} xs={12}>
                <TextField
                  label="Mô tả"
                  multiline
                  minRows={1}
                  maxRows={10}
                  value={productData.description}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n');
                    setError(lines.length > 10);
                  }}
                  variant="outlined"
                  fullWidth
                  error={error}
                  helperText={error ? 'Mô tả không được vượt quá 10 dòng' : ''}
                />
              </Grid>
              <Grid md={12} xs={12}>
                <TextField
                  label="Item"
                  multiline
                  minRows={10}
                  maxRows={50}
                  value={productData.items}
                  onChange={(e) => setProductData({ ...productData, items: e.target.value || '' })}
                  variant="outlined"
                  fullWidth
                  sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' } }} // Reduce font size
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </Card>
      </form>
    </>
  );
}
