import { useRef, useEffect } from 'react';
import GrainFX from './grain';

const Grain = () => {
    const root = useRef(null);
    const grainfx = useRef(null);

    useEffect(() => {
        grainfx.current = new GrainFX();

        return () => {};
    }, []);

    return (
        <canvas
            ref={root}
            id='grainfx'
            className='fixed inset-0 z-[10014] pointer-events-none js-grain'
        ></canvas>
    );
};

export default Grain;
