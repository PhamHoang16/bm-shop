'use client';

import {ThemeProvider} from 'next-themes';
import {JSX} from "react";


export function ThemeContext({children}: {
  children: JSX.Element,
}) {
  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  );
}