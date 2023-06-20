import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/context/auth';
import { ProtectRoute } from '@/components/ProtectRoute';
import { GlobalProvider } from '@/context/gloabl';

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <GlobalProvider>
          <ProtectRoute>
            <Component {...pageProps} />
          </ProtectRoute>
        </GlobalProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}
