import type { AppProps } from 'next/app';

import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import RegisterModal from '@/components/modal/RegisterModal';
import LoginModal from '@/components/modal/LoginModal';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <Modal actionLabel='Submit' title='Test Modal' />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
