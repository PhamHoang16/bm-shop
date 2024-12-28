import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Mua hàng', href: paths.dashboard.overview, icon: 'shopping-cart' },
  { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  { key: 'deposit', title: 'Nạp tiền', href: paths.dashboard.deposit, icon: 'money' },
  { key: 'deposit-history', title: 'Lịch sử nạp tiền', href: paths.dashboard.deposit_history, icon: 'wallet' },
  { key: 'purchase-history', title: 'Lịch sử mua hàng', href: paths.dashboard.purchase_history, icon: 'history' },
  { key: 'account', title: 'Tài khoản', href: paths.dashboard.account, icon: 'user' },
  { key: 'setting', title: 'Setting', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'tool-check', title: 'Check Live UID', href: paths.dashboard.check_live, icon: 'tool-check' },
  { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
