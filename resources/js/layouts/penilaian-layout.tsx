import { Toaster } from '@/components/ui/toaster';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children }: AppLayoutProps) => (
    <>
        {children}
        <Toaster />
    </>
);
