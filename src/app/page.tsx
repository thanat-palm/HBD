"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const [iHear, setIhear] = useState<boolean>(true);
  const [audioCont, setAudioCont] = useState<AudioContext | null>(null);
  const [analyz, setAnalyz] = useState<AnalyserNode | null>(null);
  // const [volumeNow, setVolume] = useState(0);
  const audioRef = useRef(null);
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
      const newAudioCont = new (window.AudioContext ||
        window.webkitAudioContext)();
      setAudioCont(newAudioCont);

      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = newAudioCont.createMediaStreamSource(stream);
      const newAnalyz = newAudioCont.createAnalyser();
      newAnalyz.fftSize = 2048;
      source.connect(newAnalyz);
      setAnalyz(newAnalyz);
    }
  };

  return (
    <main className="">
      <motion.div
        className="w-full h-[20vh]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <motion.div
          className="mx-auto w-fit h-fit p-10 bg-white rounded-full mt-5 shadow-md hover:shadow-xl text-[60px]"
          transition={{ duration: 0.5, type: "spring" }}
          whileHover={{ scale: 1.1 }}
        >
          <button onClick={startListen} className=" text-[#F0C2C2] text-center">Happy Birth Day</button>
          <audio ref={audioRef} src="/hbd-song.mp3" />
        </motion.div>
      </motion.div>
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
    </main>
  );
}