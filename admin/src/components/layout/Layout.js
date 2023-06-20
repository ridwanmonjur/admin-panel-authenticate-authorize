import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function Layout({ children }) {
  return (
    <>
      <div className='min-h-[95vh]'>
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
}
