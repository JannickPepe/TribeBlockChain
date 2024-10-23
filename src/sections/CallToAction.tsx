import { Circle } from "../components/Circle"
import { CutCornerButton } from "../components/CutCornerButton"
import { Hexagon } from "../components/Hexagon"
import CuboidImg from "../../public/assets/images/cuboid.png";
import CylinderImg from "../../public/assets/images/cylinder.png";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";


export const CallToActionSection = () => {

    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [45, -45]);

    return (
        <section className="py-60 overflow-hidden" ref={sectionRef}>
            <div className="container">
                <div className="relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Hexagon size={700} />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Hexagon size={1100} reverse duration={50} />
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Circle className="absolute left-0 -top-[400px]" animate>
                            <motion.img 
                                className="size-[140px]" 
                                style={{
                                    rotate: rotate,
                                }}
                                src={CuboidImg.src} 
                                alt="CTA cubiod" 
                            />
                        </Circle>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Circle className="absolute -left-[600px] -top-[70px]" animate>
                            <motion.img 
                                className="size-[140px]" 
                                style={{
                                    rotate: rotate,
                                }}
                                src={CylinderImg.src} 
                                alt="CTA cubiod" 
                            />
                        </Circle>
                    </div>

                    <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-center">
                        Ready to <span className="block">get started?</span>
                    </h2>
                    <p className="text-xl lg:text-2xl text-zinc-400 text-center mt-8 max-w-sm mx-auto">Start building, using BlockChain technology, with BlockSmith</p>

                    <div className="flex justify-center mt-12">
                        <CutCornerButton>Get Started</CutCornerButton>
                    </div>
                </div>
            </div>
        </section>
    )
}

