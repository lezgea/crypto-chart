export const generateCandlestick = (
    previousClose: number,
    isIncreasing: boolean,
    isNew: boolean = false 
) => {
    const variation = (Math.random() - 0.5) * 20;

    let open, close;
    if (isIncreasing) {
        open = previousClose + Math.random() * 10;
        close = open + Math.abs(variation);
    } else {
        open = previousClose - Math.random() * 10;
        close = open - Math.abs(variation);
    }

    const high = Math.max(open, close) + Math.random() * 10;
    const low = Math.min(open, close) - Math.random() * 10;

    return {
        open,
        close,
        high,
        low,
        time: new Date().toISOString(),
        isNew, 
    };
};
