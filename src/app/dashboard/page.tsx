import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import { Budget } from '@/components/dashboard/categories/budget';
import { LatestOrders } from '@/components/dashboard/categories/latest-orders';
import { LatestProducts } from '@/components/dashboard/categories/latest-products';
import { Sales } from '@/components/dashboard/categories/sales';
import { TasksProgress } from '@/components/dashboard/categories/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/categories/total-customers';
import { TotalProfit } from '@/components/dashboard/categories/total-profit';
import { Traffic } from '@/components/dashboard/categories/traffic';
import { Box, Container } from '@mui/material';
import { CategorySection } from '@/components/dashboard/categories/categories-card';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';

const categories = [
  {
    title: 'VIA: 2023, Bảo Trì Và Không Bảo Hành',
    products: [
      {
        name: 'Via philipines 902 live ads',
        price: '139,000',
        quantity: 11,
        description: [
          'AE lưu ý via bị cp phone hàng ngày rất nhiều.',
          'Backup tài nguyên vài nhiều via để an toàn.',
        ],
      },
      {
        name: 'Via Đông Châu, PACE, TNCN',
        price: '133,000',
        quantity: 7,
        description: [
          'AE lưu ý via bị cp phone hàng ngày rất nhiều.',
          'Shop không bao ngâm.',
        ],
      },
      {
        name: 'Via Đông Châu, PACE, TNCN',
        price: '133,000',
        quantity: 7,
        description: [
          'AE lưu ý via bị cp phone hàng ngày rất nhiều.',
          'Shop không bao ngâm.',
        ],
      },
      {
        name: 'Via Đông Châu, PACE, TNCN',
        price: '133,000',
        quantity: 7,
        description: [
          'AE lưu ý via bị cp phone hàng ngày rất nhiều.',
          'Shop không bao ngâm.',
        ],
      },
      {
        name: 'Via philipines 902 live ads',
        price: '139,000',
        quantity: 11,
        description: [
          'AE lưu ý via bị cp phone hàng ngày rất nhiều.',
          'Backup tài nguyên vài nhiều via để an toàn.',
        ],
      },
      {
        name: 'Via Đông Châu, PACE, TNCN',
        price: '133,000',
        quantity: 7,
        description: [
          'AE lưu ý via bị cp phone hàng ngày rất nhiều.',
          'Shop không bao ngâm.',
        ],
      },
      {
        name: 'Via Đông Châu, PACE, TNCN',
        price: '133,000',
        quantity: 7,
        description: [
          'AE lưu ý via bị cp phone hàng ngày rất nhiều.',
          'Shop không bao ngâm.',
        ],
      },
      {
        name: 'Via Đông Châu, PACE, TNCN',
        price: '133,000',
        quantity: 7,
        description: [
          'AE lưu ý via bị cp phone hàng ngày rất nhiều.',
          'Shop không bao ngâm.',
        ],
      },
    ],
  },
  {
    title: 'TNCN: Newbie - 15005 - 2505 - 505 - more',
    products: [
      {
        name: 'TNCN Newbie account',
        price: '950,000',
        quantity: 5,
        description: ['Dùng để verify thông tin.', 'Backup tài nguyên để đảm bảo an toàn.'],
      },
      {
        name: 'TNCN 2025 basic account',
        price: '750,000',
        quantity: 3,
        description: ['Account hoạt động ổn định.', 'Không bao đổi trả.'],
      },
    ],
  },
];

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Container maxWidth="xl">
      <CustomersFilters />
      {categories.map((category, index) => (
        <CategorySection
          key={index}
          title={category.title}
          products={category.products}
        />
      ))}
    </Container>
  );
}