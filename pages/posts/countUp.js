import { useState, useEffect } from 'react';

// カウントアップの処理
export default function CountUp() {
    const [time, setTime] = useState(0); // カウントアップの初期値を3に設定

    useEffect(() => {
        let interval = null;
        
        interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        }, 1000);
        
        return () => clearInterval(interval);
        }, []);
    
    return time;
}