import dynamic from 'next/dynamic';

const RealTimeChart = dynamic(() => import('@components/shared/real-time-chart'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex h-screen max-h-screen flex-col items-center justify-between lg:p-5">
      <RealTimeChart />
    </main>
  );
}
