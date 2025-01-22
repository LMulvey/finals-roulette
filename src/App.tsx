import { Footer } from './components/footer';
import { Header } from './components/header';
import { useRouter } from './hooks/useRouter';
import { AllPage } from './pages/all';
import { MainPage } from './pages/main';

const App = () => {
  const router = useRouter();

  return (
    <main className="w-screen min-h-screen relative">
      <Header />
      {router.pathname === '/all' ? <AllPage /> : null}
      {router.pathname === '/' ? <MainPage /> : null}
      <Footer />
    </main>
  );
};

export default App;
