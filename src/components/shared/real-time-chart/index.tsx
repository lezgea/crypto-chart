"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { generateCandlestick } from '@utils/generateCandlestick';
import { ApexOptions } from 'apexcharts';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Candlestick {
    open: number;
    close: number;
    high: number;
    low: number;
    time: string;
    isNew?: boolean;
}

const RealTimeChartComponent: React.FC = () => {
    const [data, setData] = useState<Candlestick[]>([]);
    const [increaseMode, setIncreaseMode] = useState<boolean>(false);

    useEffect(() => {
        const initialData: Candlestick[] = [];
        let previousClose = 100; // Starting price for the first candlestick
        let initialTime = new Date();

        for (let i = 0; i < 10; i++) {
            const isIncreasing = Math.random() > 0.5; // Randomly decide if it's increasing
            const candlestick = generateCandlestick(previousClose, isIncreasing);
            candlestick.time = new Date(initialTime.getTime() + i * 60000).toISOString(); // Increase time by 1 minute for each candlestick
            previousClose = candlestick.close; // Update the previous close for the next candlestick
            initialData.push(candlestick);
        }

        setData(initialData); // Set the initial 10 candlesticks

        const interval = setInterval(() => {
            setData((prevData) => {
                const lastClose = prevData[prevData.length - 1]?.close || 100;
                const newCandlestick = generateCandlestick(lastClose, increaseMode, true);
                const lastTime = new Date(prevData[prevData.length - 1]?.time).getTime();
                newCandlestick.time = new Date(lastTime + 60000).toISOString(); // Increase time by 1 minute

                const newData = [...prevData, newCandlestick];
                if (newData.length > 10) newData.shift();
                return newData;
            });
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const handleTap = () => {
        setIncreaseMode(true); // Set to increase mode on tap
        setData((prevData) => {
            const lastClose = prevData[prevData.length - 1]?.close || 100;
            const newCandlestick = generateCandlestick(lastClose, true, true); // Force an upward candlestick
            const lastTime = new Date(prevData[prevData.length - 1]?.time).getTime();
            newCandlestick.time = new Date(lastTime + 60000).toISOString(); // Increase time by 1 minute

            const newData = [...prevData, newCandlestick];
            if (newData.length > 10) newData.shift();
            return newData;
        });

        setTimeout(() => {
            setIncreaseMode(false); // Reset after a period of time
        }, 10000);
    };

    const series = [
        {
            data: data.map((candle) => ({
                x: new Date(candle.time).getTime(),
                y: [candle.open, candle.high, candle.low, candle.close],
                fillColor: increaseMode || candle.isNew ? '#71B82A' : (candle.close > candle.open ? '#71B82A' : '#EC5231'),
            })),
        },
    ];

    const options: ApexOptions = {
        chart: {
            type: 'candlestick',
            height: 350,
            toolbar: {
                show: false,
            },
            events: {
                click: handleTap,
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150,
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350,
                },
            },
        },
        xaxis: {
            type: 'datetime',
            labels: {
                style: {
                    colors: '#000',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#000',
                },
                formatter: (value: number): string => {
                    if (Number.isInteger(value)) {
                        return value.toString(); // Convert integer to string
                    } else {
                        return parseFloat(value.toFixed(2)).toString(); // Convert float to string
                    }
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#71B82A',
                    downward: '#EC5231',
                },
            },
        },
        grid: {
            borderColor: 'rgba(0, 0, 0, 0.1)',
        },
        tooltip: {
            theme: 'dark', // Apply dark theme for tooltip
            onDatasetHover: {
                highlightDataSeries: true,
            },
            x: {
                show: true,
                format: 'dd MMM yyyy HH:mm',
            },
            y: {
                formatter: (value) => `Price: ${value}`,
            },
            marker: {
                show: true,
                fillColors: ['#808080'], // Set marker color to gray
            },
        },
    };

    return (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }} className="w-full h-[100vh]">
            <ApexCharts options={options} series={series} type="candlestick" height={"100%"} />
        </div>
    );
};

export default RealTimeChartComponent;
