'use client';

import { theme } from '@/theme';
import { ConfigProvider } from 'antd';
import { PropsWithChildren } from 'react';
import { AntdRegistry } from './AntdRegistry';

export function AntdStyleProvider({ children }: PropsWithChildren) {
  return (
    <ConfigProvider theme={theme}>
      <AntdRegistry>{children}</AntdRegistry>
    </ConfigProvider>
  );
}