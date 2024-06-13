"use client";
import Image from "next/image";
import { motion, spring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function Home() {
  const [iHear, setIhear] = useState<boolean>(true);
  const [audioCont, setAudioCont] = useState<AudioContext | null>(null);
  const [analyz, setAnalyz] = useState<AnalyserNode | null>(null);
  // const [volumeNow, setVolume] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  let stream: any;

  //ตรวจจับเสียง แปลงค่าเสียง เก็บค่าเสียง อัพเดทค่าเสียง
  useEffect(() => {
    if (audioCont && analyz) {
      const dataAry = new Uint8Array(analyz.fftSize); //สร้างตัวแปรเก็บเสียง
      const updateVolume = () => {
        analyz.getByteTimeDomainData(dataAry); //ดึงค่าเสียงที่ได้เก็บในตัวแปรที่สร้าง ในรูปแบบ timedomain
        const maxVolume = Math.max(...dataAry); //คำนวณหาค่าเสียงที่ดังที่สุด
        // setVolume(maxVolume); //อัพเดทค่าความดังเสียง
        if (maxVolume > 250) {
          setIhear(false);
        }
        requestAnimationFrame(updateVolume);
      };
      updateVolume();
    }
  }, [audioCont, analyz]);

  //เริ่มฟังเสียง
  const startListen = async () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play();
    }
    if (!audioCont) {
      const newAudioCont = new window.AudioContext();
      setAudioCont(newAudioCont);

      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = newAudioCont.createMediaStreamSource(stream);
      const newAnalyz = newAudioCont.createAnalyser();
      newAnalyz.fftSize = 2048;
      source.connect(newAnalyz);
      setAnalyz(newAnalyz);
    }
  };

  const variantImg = {
    left: {x:-100 , opacity:0 },
    right: {x:100 , opacity:0 },
    animate: {
      x:0 , 
      opacity:1 ,
      transition: {duration: 0.5 , type:"spring" , delay: 0.5},
    },
  }

  return (
    <main className="overflow-x-hidden">
      <motion.div
        className="w-full h-[20vh]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <motion.div
          className="mx-auto w-fit h-fit p-8 sm:p-10 bg-white rounded-full mt-5 shadow-md hover:shadow-xl text-[40px] sm:text-[60px]"
          transition={{ duration: 0.5, type: "spring" }}
          whileHover={{ scale: 1.1 }}
        >
          <button onClick={startListen} className=" text-[#F0C2C2] text-center">Happy Birth Day</button>
          <audio ref={audioRef} src="/hbd-song.mp3" />
        </motion.div>
      </motion.div>
      <section className="container mx-auto">
          {iHear ? (
            <div/>
            ) : (
            <Confetti/>
          )}
        <motion.div
          className="relative w-fit h-[] flex items-end justify-center mx-auto  "
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <Image src="/cakewithcandle.png" alt="cake" priority width={580} height={500} />
          {iHear ? (
            <motion.div 
              animate={{opacity: [1 , 0.9 , 1] , height: [56 , 58 , 56] , scale: [1 , 1.1 , 1]}}
              transition={{duration: 1 , repeat: Infinity, repeatDelay: 1 , times: [0 , 0.2 , 0.5 ,0.8 , 1]}}
              className=" absolute bg-[#ffffff] h-14 w-12 top-9 rounded-full border-[13px] border-[#f1c777] blur-sm" />
            ) : (
            <div/>
          )}
        </motion.div>
        {iHear ? (
            <div/>
            ) : (
              <motion.div
              className="flex flex-col my-20 text-[30ypx] gap-10 sm:text-[40px] text-[#F0C2C2] "
              // initial={{y:100 ,  opacity:0}}
              // animate={{y:0 ,  opacity:1}}
              // transition={{type:"spring" , duration: 0.4 , delay: 1}}
            >
            <div className="w-full flex items-center gap-5 sm:gap-10">
              <motion.div 
                className=""
                variants={variantImg}
                initial="left"  
                whileInView="animate"
              >
                <Image src="/1.jpg" alt="" priority width={400} height={400} className="drop-shadow-lg"/>
              </motion.div>
              <h1>HAPPY BIRTH DAY TO U MY LOVE</h1>
              <motion.div 
                className="w-full absolute bg-white h-[300px] left-0 z-[-1] origin-right"
                initial={{scaleX:0, opacity:0}}
                whileInView={{scaleX:1, opacity:1}}
                transition={{duration:1}}
              />
            </div>
            <div className="w-full flex items-center gap-5 sm:gap-10 justify-end">
              <h1 className="ml-3">โตขึ้นอีกปีแล้วนะ</h1>
              <motion.div 
                className=""
                variants={variantImg}
                initial="right"  
                whileInView="animate"
              >
                <Image src="/2.jpg" alt="" priority width={400} height={400} className="drop-shadow-lg"/>
              </motion.div> 
              <motion.div 
                className="w-full absolute bg-white h-[300px] left-0 z-[-1] origin-left"
                initial={{scaleX:0, opacity:0}}
                whileInView={{scaleX:1, opacity:1}}
                transition={{duration:1}}
              />
            </div>
            <div className="w-full flex items-center gap-5 sm:gap-10">
              <motion.div 
                className=""
                variants={variantImg}
                initial="left"      
                whileInView="animate"
              >
                <Image src="/3.jpg" alt="" priority width={400} height={400} className="drop-shadow-lg"/>
              </motion.div>
              <h1>วันเกิดปีนี้มีความสุขมากๆนะ</h1>
              <motion.div 
                className="w-full absolute bg-white h-[300px] left-0 z-[-1] origin-right"
                initial={{scaleX:0, opacity:0}}
                whileInView={{scaleX:1, opacity:1}}
                transition={{duration:1}}

              />
            </div>
            <div className="w-full flex items-center gap-5 sm:gap-10 justify-end">
              <h1 className="ml-3">อยู่ด้วยกันไปนานๆนะครับ</h1>
              <motion.div 
                className=""
                variants={variantImg}
                initial="right"
                whileInView="animate"
              >
                <Image src="/4.jpg" alt="" priority width={400} height={400} className="drop-shadow-lg"/>
              </motion.div>
              <motion.div 
                className="w-full absolute bg-white h-[300px] left-0 z-[-1] origin-left"
                initial={{scaleX:0, opacity:0}}
                whileInView={{scaleX:1, opacity:1}}
                transition={{duration:1}}
              />
            </div>
            <div className="w-full flex items-center gap-3 sm:gap-10">
              <motion.div 
                className=""
                variants={variantImg}
                initial="left"
                whileInView="animate"
              >
                <Image src="/5.jpg" alt="" priority width={400} height={400} className="drop-shadow-lg"/>
              </motion.div>
              <h1 >LOVE U FOREVER ❤❤❤</h1>
              <motion.div 
                className="w-full absolute bg-white h-[300px] left-0 z-[-1] origin-right"
                initial={{scaleX:0, opacity:0}}
                whileInView={{scaleX:1, opacity:1}}
                transition={{duration:1}}
              />
            </div>
          </motion.div>
          )}
      </section>
    </main>
  );
}