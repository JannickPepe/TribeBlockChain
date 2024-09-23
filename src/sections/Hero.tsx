import { CutCornerButton } from "../components/CutCornerButton"
import IconHero from "../../public/assets/images/icosahedron.png";
import { Hexagon } from "../components/Hexagon";
import Cube from "../../public/assets/images/cube.png";
import Cuboid from "../../public/assets/images/cuboid.png";
import { Circle } from "../components/Circle";
import Torus from "../../public/assets/images/torus.png";


export const HeroSection = () => {

    return (
        <section className="py-24 md:py-52 overflow-x-clip">
            <div className="container">
                <p className="uppercase font-extrabold text-center text-zinc-500 tracking-wider">
                    Introducing BlockForge
                </p>
                <h1 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl text-center mt-4 max-w-3xl mx-auto">
                    The Future Of BlockChain Is Here
                </h1>
                <p className="text-center text-xl md:text-2xl mt-6 text-zinc-400 max-w-xl mx-auto"> 
                    BlockForge is pioneering smart contract interface digtial platform for data solutions
                </p>

                <div className="flex justify-center mt-10">
                    <CutCornerButton className="">Get started</CutCornerButton>
                </div>
                <div className="flex justify-center mt-24">
                    <div className="inline-flex relative z-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Hexagon className="size-[1100px]" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Hexagon className="size-[1800px]" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Circle className="absolute left-[200px] -top-[900px]">
                                <img className="size-[140px]" src={Cube.src} alt="Cube 3D image" />
                            </Circle>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Circle className="absolute left-[200px] top-[270px]">
                                <img className="size-[140px]" src={Cuboid.src} alt="Cuboid 3D image" />
                            </Circle>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Circle className="absolute -left-[600px] -top-[80px]">
                                <img className="size-[140px]" src={Torus.src} alt="Torus 3D image" />
                            </Circle>
                        </div>
                        <img 
                            src={IconHero.src} 
                            alt="Hero Shadow" 
                            className="absolute w-[calc(100%+100px)] max-w-none -z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 saturate-[10%] brightness-[4%] hue-rotate-[240deg]" 
                        />
                        <img src={IconHero.src} alt="Icon Hero" className="w-[500px]" />
                    </div>
                </div>

                <div className="flex justify-center flex-col items-center mt-40 md:mt-80 gap-4">
                    <div className="justify-center pt-2 h-10 w-5 outline outline-[6px] outline-fuchsia-500/10 inline-flex rounded-full">
                        <div className="h-3 w-1 bg-fuchsia-500 rounded-full"></div>
                    </div>
                    <p className="uppercase text-zinc-500 font-extrabold tracking-wider">Scroll to learn more</p>
                </div>
            </div>
        </section>
    )
}


