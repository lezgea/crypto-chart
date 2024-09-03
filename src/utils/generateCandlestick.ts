
export const generateCandlestick = () => {
    const open = Math.random() * 100
    const close = Math.random() * 100
    const high = Math.max(open, close) + Math.random() * 10
    const low = Math.min(open, close) - Math.random() * 10

    return { open, close, high, low, time: new Date().toLocaleTimeString() };
}
