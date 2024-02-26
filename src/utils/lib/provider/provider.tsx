'use client'

import React from 'react';
import { SessionProvider } from 'next-auth/react';

interface ProviderProps { children: string | JSX.Element | JSX.Element[] | React.ReactNode };

export const Provider = ({ children }: ProviderProps) => <SessionProvider>{children}</SessionProvider>;