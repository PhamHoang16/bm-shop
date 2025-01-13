'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { Category } from '@/types/category';
import { CategorySection } from '@/components/dashboard/categories/categories-card';
import { MainList } from '@/components/dashboard/main-list';
import { useUser } from '@/hooks/use-user';
import api from '@/lib/api';

export interface ListMainItem {
  username: string;
  detail: string;
  time: string;
}

export default function Page(): React.JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [lastOrder, setLastOrder] = useState<ListMainItem[]>([]);
  const [lastDeposit, setLastDeposit] = useState<ListMainItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/products');
        const data: any[] = response.data;

        const formattedCategories: Category[] = data.map((category) => ({
          name: category.name,
          products: category.productList.map((product: any) => ({
            id: product.id,
            categoryId: product.categoryId,
            name: product.name,
            description: product.description.split('\n'),
            price: new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(product.price),
            quantity: product.quantity,
          })),
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await api.get('products/orders/last-orders');
        setLastOrder(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    const fetchDeposit = async () => {
      try {
        const response = await api.get('/users/deposit/last-deposit');
        setLastDeposit(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchCategories();
    fetchOrders();
    fetchDeposit();
  }, []);

  const handleAddClick = () => {
    router.push('/product/add');
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value as string);
  };

  if (loading) {
    return <CircularProgress />;
  }

  const filteredCategories = selectedCategory
    ? categories.filter((category) => category.name === selectedCategory)
    : categories;

  return (
    <Stack spacing={2}>
      <Card>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
          <FormControl sx={{ minWidth: 350 }}>
            <InputLabel id="category-select-label">Danh mục</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {user?.username === 'hoangp1' && (
            <Button
              startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
              variant="contained"
              onClick={handleAddClick}
            >
              Add
            </Button>
          )}

        </Box>
      </Card>
      {filteredCategories.map((category, index) => (
        <CategorySection key={index} name={category.name} products={category.products} />
      ))}
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Box>
            <MainList title={'Lịch sử mua hàng'} rows={lastOrder} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <MainList title={'Lịch sử nạp tiền'} rows={lastDeposit} />
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
