"use client";

import { useRouter } from "next/navigation"; // Thay đổi import
import React, { useEffect, useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import { CategorySection } from "@/components/dashboard/categories/categories-card";
import { Category } from "@/types/category";
import Button from "@mui/material/Button";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";

export default function Page(): React.JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
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

    fetchCategories();
  }, []);

  const handleAddClick = () => {
    router.push("/product/add"); // Điều hướng
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="xl">
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
    </Container>
  );
}
