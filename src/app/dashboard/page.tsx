"use client";

import { useRouter } from "next/navigation"; // Thay đổi import
import React, { useEffect, useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import { CategorySection } from "@/components/dashboard/categories/categories-card";
import { Category } from "@/types/category";
import Button from "@mui/material/Button";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {MainList} from "@/components/dashboard/main-list";
import {Order} from "@/types/order";
import {Deposit} from "@/types/deposit";
import axios from "axios";

export interface ListMainItem {
  username: string;
  detail: string;
  time: string;
}

export default function Page(): React.JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const [lastOrder, setLastOrder] = useState<ListMainItem[]>([]);
  const [lastDeposit, setLastDeposit] = useState<ListMainItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter(); // Sử dụng useRouter từ next/navigation

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/products");
        const data: any[] = await response.json();

        // Map dữ liệu vào đúng interface Category
        const formattedCategories: Category[] = data.map((category) => ({
          name: category.name,
          products: category.productList.map((product: any) => ({
            id: product.id,
            categoryId: product.categoryId,
            name: product.name,
            description: product.description.split("\n"), // Tách mô tả thành mảng
            price: new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price),
            quantity: product.quantity,
          })),
        }));

        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products/orders/last-orders");
        setLastOrder(response.data); // Assuming the response data matches the expected order format
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    const fetchDeposit = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users/deposit/last-deposit");
        setLastDeposit(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchCategories();
    fetchOrders();
    fetchDeposit()
  }, []);

  const handleAddClick = () => {
    router.push("/product/add"); // Điều hướng
  };

  if (loading) {
    return <CircularProgress />;
  }

  // @ts-ignore
  return (
    <Stack spacing={2}>
        <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={handleAddClick}
          >
            Add
          </Button>
        </div>
        {categories.map((category, index) => (
          <CategorySection
            key={index}
            name={category.name}
            products={category.products}
          />
        ))}
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} >
              <Box>
                <MainList title={"Lịch sử mua hàng"} rows={lastOrder}>
                </MainList>
              </Box>
          </Grid>
          <Grid item xs={12} md={6}>
              <Box>
                <MainList title={"Lịch sử nạp tiền"} rows={lastDeposit}>
                </MainList>
              </Box>
          </Grid>
        </Grid>
    </Stack>
  );
}
