import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


const Success: React.FC = () => {
    return (
        <main className="min-h-screen w-full max-h-screen flex flex-col items-center justify-center bg-blue-500">
            <h1 className="text-4xl font-medium ">Turururuururururuuruur</h1>
            {/* Left side with image */}
            <div className="w-full relative hidden lg:block">
                <section className="absolute column w-full h-full content-end text-center px-20 py-10">
                    <p className="text-lg">Some description just for testing</p>
                </section>
            </div>
        </main >
    );
};

export default Success;
