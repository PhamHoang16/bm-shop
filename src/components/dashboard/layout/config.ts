import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Category', href: paths.dashboard.overview, icon: 'shopping-cart' },
  { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  { key: 'deposit', title: 'Deposit', href: paths.dashboard.deposit, icon: 'money' },
  { key: 'integrations', title: 'Deposit History', href: paths.dashboard.deposit, icon: 'wallet' },
  { key: 'purchase-history', title: 'Purchase History', href: paths.dashboard.purchase_history, icon: 'history' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  { key: 'setting', title: 'Setting', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'tool-check', title: 'Check Live UID', href: paths.dashboard.check_live, icon: 'tool-check' },
  { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
