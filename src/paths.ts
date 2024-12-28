export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    deposit: '/dashboard/deposit',
    deposit_history: '/dashboard/deposit-history',
    settings: '/dashboard/settings',
    purchase_history: '/dashboard/purchase-history',
    check_live: '/dashboard/check-live',
    add_product: '/dashboard/add-product',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
