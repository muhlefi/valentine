'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import BG from '@/assets/bg.png';
import Link from 'next/link';

const letterContent =
  'Happy Birthday sayangg.\n\n' +
  'thankss sebab alwayss ada dengan saya walaupun kita selalu gaduhh tapi saya janjii saya always support awak and try untuk buat awak happy everyday sorry kalau hadiah saya ni tak seberapa hihih just nak awak tau buat kali yang ke 10000 saya sayangg awakk sangatt sangattt\n\n' +
  "in every other universe i'll always choose you,my nadira.\n\n" +
  'Dengan semua cinta,\n' +
  'Capi ❤️❤️';

const cornerHearts = ['💗', '💕', '💖', '💞'];

export default function Letter() {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      i = Math.min(i + 3, letterContent.length);
      setDisplayedText(letterContent.slice(0, i));

      if (i >= letterContent.length) {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const audio = new Audio('/pretty-little-baby.mp3');
    audioRef.current = audio;

    const handleLoadedMetadata = () => setAudioDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.remove();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {});
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      style={{ backgroundImage: `url(${BG.src})` }}
      className="min-h-screen bg-cover bg-no-repeat flex flex-col items-center px-4 py-12 relative overflow-hidden"
    >
      {cornerHearts.map((emoji, index) => (
        <div
          key={`${emoji}-${index}`}
          className="absolute pointer-events-none opacity-70 text-2xl"
          style={{
            left: `${index % 2 === 0 ? 8 : 82}%`,
            top: `${24 + index * 80}px`,
          }}
        >
          {emoji}
        </div>
      ))}

      <div className="w-full max-w-sm flex flex-col items-center gap-8 z-10 mb-24">
        <motion.h1
          className="font-patrick text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-400 to-pink-300 drop-shadow-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          ❤️❤️ Dari Hati Capi
        </motion.h1>

        <motion.div
          className="w-full backdrop-blur-md bg-white/20 border border-pink-200/40 shadow-xl rounded-2xl p-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <pre className="font-fredoka text-pink-800 text-sm leading-relaxed whitespace-pre-wrap font-medium">
            {displayedText}
            {!isTypingComplete && <span className="inline-block ml-0.5">|</span>}
          </pre>
        </motion.div>

        <motion.div
          className="w-full backdrop-blur-md bg-white/20 border border-pink-200/40 shadow-xl rounded-2xl p-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="font-patrick text-xl text-pink-600 text-center mb-4">
            🎵 Favorite Music
          </h2>

          <div className="flex flex-col items-center gap-3">
            <p className="font-fredoka text-pink-700 font-medium text-xs">
              pretty-little-baby.mp3
            </p>

            <div className="flex items-center gap-3 w-full max-w-xs">
              <motion.button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white text-lg shadow-lg flex items-center justify-center shrink-0"
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </motion.button>

              <div className="flex-1 h-2 bg-pink-200/60 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"
                  style={{ width: `${audioDuration ? (currentTime / audioDuration) * 100 : 0}%` }}
                />
              </div>

              <span className="font-fredoka text-[10px] text-pink-500 w-14 text-right">
                {formatTime(currentTime)} / {formatTime(audioDuration)}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="text-3xl">💗</div>

        <Link
          href="/love"
          className="font-fredoka font-semibold text-pink-500 border-2 border-pink-300/60 py-2.5 px-8 rounded-full transition-all duration-300 backdrop-blur-sm bg-pink-100/20 hover:bg-pink-100/40 shadow-md"
        >
          ⬅️ Kembali
        </Link>
      </div>
    </div>
  );
}
