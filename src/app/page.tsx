import RealTimeChart from "@components/shared/real-time-chart";


export default function Home() {
  return (
    <main className="flex h-screen max-h-screen flex-col items-center justify-between lg:p-5">
      <RealTimeChart />
    </main>
  );
}
