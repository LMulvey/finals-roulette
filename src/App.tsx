import { Header } from './components/header';
import { useRouter } from './hooks/useRouter';
import { AllPage } from './pages/all';
import { MainPage } from './pages/main';

const App = () => {
  const router = useRouter();

  return (
    <main className="w-screen flex flex-col items-center justify-center">
      <Header />
      {router.pathname === '/all' ? <AllPage /> : null}
      {router.pathname === '/' ? <MainPage /> : null}
    </main>
  );
};

export default App;
