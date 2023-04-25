import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import RegisterModal from '@/components/modal/RegisterModal';
import LoginModal from '@/components/modal/LoginModal';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  console.log({ pageProps })
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <RegisterModal />
      <LoginModal />
      {/* <Modal actionLabel='Submit' title='Test Modal' /> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
