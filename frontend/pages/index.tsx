import { Button } from '@/components/button';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Название</title>
      </Head>
      <h1>Заголовок</h1>
      <Button>Кнопка</Button>
    </div>
  );
}
