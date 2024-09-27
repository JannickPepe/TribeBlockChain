import { useEffect, useLayoutEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";


export const Hexagon = (props: ComponentPropsWithoutRef<'svg'> & { size?: number; reverse?: boolean; duration?: number }) => {
    // Set our different props state for initual value
    const { className, size = 800, reverse = false, duration = 30 } = props;

    // Have the useRef to also be a SVG for other cases
    const pathRef = useRef<SVGPathElement>(null);

    // Have the useState to also be a number for other cases
    const [totalPathLength, setTotalPathLength] = useState<number>();

    // Get measurement of the path so we can add that to our Ref
    useEffect(() => {
        const pathLength = pathRef.current?.getTotalLength();
        if (!pathLength) return;
        const scalePathLength = (pathLength * size) / 82;
        setTotalPathLength(scalePathLength);
    }, [])

    return (
        <div className="inline-flex relative">
            <svg 
                className={twMerge("text-fuchsia-500/10 -rotate-6", className)} 
                style={{
                    height: size,
                    width: size
                }}
                width="82" 
                height="72" 
                viewBox="0 0 82 72" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="6" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M3.44337 38.5C2.55021 36.953 2.55021 35.047 3.44338 33.5L20.0566 4.72501C20.9498 3.178 22.6004 2.22501 24.3868 2.22501H57.6132C59.3996 2.22501 61.0502 3.178 61.9434 4.72501L78.5566 33.5C79.4498 35.047 79.4498 36.953 78.5566 38.5L61.9434 67.275C61.0502 68.822 59.3996 69.775 57.6132 69.775H24.3867C22.6004 69.775 20.9498 68.822 20.0566 67.275L3.44337 38.5Z"  
                    vectorEffect="non-scaling-stroke" 
                    ref={pathRef}
                />
            </svg>

            {totalPathLength && (
                <motion.svg 
                    className={twMerge("absolute text-fuchsia-500/30 -rotate-6", className)} 
                    initial={{
                        strokeDashoffset: 0
                    }}
                    animate={{
                        strokeDashoffset: reverse ? totalPathLength : totalPathLength * -1
                    }} 
                    transition={{
                        repeat: Infinity,
                        duration,
                        ease: 'linear',
                    }}
                    style={{
                        strokeDasharray: `500 ${totalPathLength - 500}`,
                        height: size,
                        width: size
                    }}
                    width="82" 
                    height="72" 
                    viewBox="0 0 82 72" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="6" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M3.44337 38.5C2.55021 36.953 2.55021 35.047 3.44338 33.5L20.0566 4.72501C20.9498 3.178 22.6004 2.22501 24.3868 2.22501H57.6132C59.3996 2.22501 61.0502 3.178 61.9434 4.72501L78.5566 33.5C79.4498 35.047 79.4498 36.953 78.5566 38.5L61.9434 67.275C61.0502 68.822 59.3996 69.775 57.6132 69.775H24.3867C22.6004 69.775 20.9498 68.822 20.0566 67.275L3.44337 38.5Z"  vectorEffect="non-scaling-stroke" />
                </motion.svg>
            )}
        </div>
    )
}


