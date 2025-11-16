import { useScramble } from "use-scramble";
import * as React from 'react';

//defining interface for component's props
interface ScrambleTextProps {
    text: string;
    className?: string;
}

export function ScrambleText({ text, className = "" }: ScrambleTextProps ) {
    const { ref } = useScramble({
        text,
        speed: 0.5,
        tick: 1,
        step: 1,
        scramble: 5,
        seed: 1,
        overdrive: true,
    });

    //return <span>, ref is used by hook to INJECT animated text
    return <span ref={ref as React.RefObject<HTMLSpanElement>} className={className} />;
}