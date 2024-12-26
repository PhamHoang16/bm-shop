import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';
import {Cardholder, CheckCircle, ClockCounterClockwise, Money, ShoppingCartSimple} from "@phosphor-icons/react";

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'customers': UsersIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  'shopping-cart': ShoppingCartSimple,
  'money': Money,
  'wallet': Cardholder,
  'history': ClockCounterClockwise,
  'ticket': CheckCircle,
  'tool-check': CheckCircle,

  user: UserIcon,
  users: UsersIcon,
} as Record<string, Icon>;
