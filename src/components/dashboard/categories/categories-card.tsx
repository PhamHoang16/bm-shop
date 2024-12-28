import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ProductCard } from './product-card';
import { Product } from '@/types/product';
import { CardHeader, Divider } from '@mui/material';

export interface CategorySectionProps {
  name: string;
  products: Product[];
}

export function CategorySection({
  name,
  products,
}: CategorySectionProps): React.JSX.Element {
  return (
    <Card sx={{ marginY: 4, boxShadow: 3 }}>
      <CardContent>
        {/* Tiêu đề danh mục */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            backgroundColor: '#00b4d8',
            color: 'white',
            padding: 2,
            paddingY: 3,
            borderRadius: 1,
            boxShadow: 3,
            textAlign: 'center',
          }}
        >
          {name}
        </Typography>

        <Box sx={{ marginY: 2 }} />

        {/* Danh sách sản phẩm */}
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
