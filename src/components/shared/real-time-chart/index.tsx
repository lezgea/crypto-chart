"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import { generateCandlestick } from '@utils/generateCandlestick';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

interface Candlestick {
    open: number,
    close: number,
    high: number,
    low: number,
    time: string,
}

const RealTimeChart = () => {
    const [data, setData] = React.useState<Candlestick[]>([])

    React.useEffect(() => {
        setData((prevData) => [...prevData, generateCandlestick()])

        const interval = setInterval(() => {
            setData((prevData) => {
                const newData = [...prevData, generateCandlestick()]
                if (newData.length > 10) newData.shift()
                return newData;
            })
        }, 10000);

        return () => clearInterval(interval)
    }, [])

    const chartData = {
        labels: data.map((candle) => candle.time),
        datasets: [
            {
                label: ' ',
                data: data.map((candle) => candle.close),
                borderColor: '#fff',
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'category' as const,
                labels: data.map((candle) => candle.time),
                ticks: {
                    color: '#fff',
                },
                grid: {
                    color: 'rgba(255,255,255,.3)',
                },
                title: {
                    display: true,
                    text: 'Time',
                    color: '#fff',
                    font: {
                        size: 14,
                    },
                    padding: { top: 5 },
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#fff',
                },
                grid: {
                    color: 'rgba(255,255,255,.3)',
                },
                title: {
                    display: true,
                    text: 'Price',
                    color: '#fff',
                    font: {
                        size: 14,
                    },
                    padding: { bottom: 5 },
                },
            },
        },
    }

    return <Line data={chartData} options={chartOptions} />
};

export default RealTimeChart;
