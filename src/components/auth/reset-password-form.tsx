'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { authClient } from '@/lib/auth/client';
import { toast } from 'react-toastify';
import Link from "@mui/material/Link";
import RouterLink from "next/link";
import {paths} from "@/paths";

const schema = zod.object({ email: zod.string().min(1, { message: 'Email is required' }).email() });

type Values = zod.infer<typeof schema>;

const defaultValues = { email: '' } satisfies Values;

export function ResetPasswordForm(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [resultMessage, setResultMessage] = React.useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      setResultMessage(null);

      const { error } = await authClient.resetPassword(values);

      if (error) {
        setResultMessage(error);
        setIsPending(false);
        return;
      } else {
        setResultMessage('Mật khẩu mới đã được gửi về email của bạn');
      }
      // Redirect to confirm password reset
    },
    [setError]
  );

  return (
    <Stack spacing={4}>

      <Typography variant="h5">Đặt lại mật khẩu</Typography>
      <Typography color="text.secondary" variant="body2">
        <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
          Đăng nhập ngay
        </Link>
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email</InputLabel>
                <OutlinedInput {...field} label="Email" type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {errors.root ? <Alert color="error" sx={{ width: '100%', textAlign: 'center' }}>{errors.root.message}</Alert> : null}
          {resultMessage &&
            <Alert severity="success" sx={{ width: '100%', textAlign: 'center' }}>{resultMessage}</Alert>}
          <Button disabled={isPending} type="submit" variant="contained">
            Đặt lại mật khẩu
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
