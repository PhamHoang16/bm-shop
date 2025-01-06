'use client';  // Ensure this is a client-side component

import * as React from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardHeader from "@mui/material/CardHeader";
import MainListItem from "@/components/dashboard/main-list-item";
import Stack from "@mui/material/Stack";
import {ListMainItem} from "@/app/dashboard/page";

interface CustomTableProps {
  title: string;
  rows?: ListMainItem[];
}

export function MainList({
                           rows = [], title
                         }: CustomTableProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader title={title} />
      <Divider />
      <Stack spacing={2} paddingY={2}>
        {rows.map((row, index) => (
          <MainListItem
            username={row.username}
            content={row.detail}
            time={row.time}
          />
        ))}
      </Stack>
    </Card>
  );
}
