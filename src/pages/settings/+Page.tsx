import { clientOnly } from 'vike-react/clientOnly';

const Settings = clientOnly(
  async () => (await import('@/components/settings')).Settings,
);

export const Page = () => {
  return <Settings />;
};
