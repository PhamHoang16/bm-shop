"use client"

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { UpdateProductForm } from '@/components/dashboard/update-product-form';
import {Product} from "@/types/product";

export default function Page({ params }: { params: { productId: string } }): React.JSX.Element {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Params:', params);
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/products/${params.productId}`);
        if (!response.ok) {
          notFound(); // Gọi notFound() nếu sản phẩm không tồn tại.
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.productId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">{product.name}</Typography>
      </div>
      <UpdateProductForm product={product} />
    </Stack>
  );
}
