'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import BG from '@/assets/bg.png';
import Link from 'next/link';

const letterContent =
  'Sayangku,\n\n' +
  'Dari pertama kali aku lihat kamu, aku udah tau kalau kamu itu beda. Senyum kamu, cara kamu ngomong, cara kamu ngeliat hal-hal kecil... semuanya bikin aku jatuh cinta setiap hari.\n\n' +
  'Aku bersyukur banget bisa kenal kamu. Kamu bikin hidup aku jadi penuh warna, penuh tawa, dan penuh cinta. Setiap momen bareng kamu tuh berasa spesial, bahkan hal-hal sederhana kayak chat random atau saling ledek aja udah cukup bikin hariku.\n\n' +
  'Aku mau jadi tempat kamu pulang, jadi alasan kamu senyum, jadi bagian dari setiap cerita kamu. Aku mau kita terus bareng, saling support, dan tumbuh sama-sama.\n\n' +
  'I love you, Sayang. More than anything.\n\n' +
  'Selamanya,\n' +
  'Your Babe 💌';

const flowerEmojis = ['🌸', '🌺', '🌷', '🌹', '🌼'];

export default function Letter() {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [flowers, setFlowers] = useState<
    Array<{ id: number; emoji: string; x: number; y: number; delay: number; size: number }>
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      size: 1 + Math.random() * 1.5,
    }));
    setFlowers(generated);
  }, []);

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      if (i < letterContent.length) {
        setDisplayedText(letterContent.slice(0, i + 1));
        i++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const audio = new Audio('/pretty-little-baby.mp3');
    audioRef.current = audio;

    audio.addEventListener('loadedmetadata', () => {
      setAudioDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    return () => {
      audio.pause();
      audio.remove();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
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
      {flowers.map((f) => (
        <motion.div
          key={f.id}
          className="absolute pointer-events-none select-none"
          style={{ left: `${f.x}%`, top: `${f.y}%`, fontSize: `${f.size}rem` }}
          animate={{ y: [0, -25, 0], rotate: [0, 20, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 4 + f.delay, delay: f.delay, ease: 'easeInOut' }}
        >
          {f.emoji}
        </motion.div>
      ))}

      <div className="w-full max-w-sm flex flex-col items-center gap-8 z-10 mb-24">
        <motion.h1
          className="font-patrick text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-400 to-pink-300 drop-shadow-sm"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          💌 Surat Cinta
        </motion.h1>

        <motion.div
          className="w-full backdrop-blur-lg bg-white/20 border border-pink-200/40 shadow-xl rounded-2xl p-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <pre className="font-fredoka text-pink-800 text-sm leading-relaxed whitespace-pre-wrap font-medium">
            {displayedText}
            {!isTypingComplete && (
              <motion.span
                className="inline-block w-0.5 h-4 bg-pink-500 ml-0.5"
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
            )}
          </pre>
        </motion.div>

        <motion.div
          className="w-full backdrop-blur-lg bg-white/20 border border-pink-200/40 shadow-xl rounded-2xl p-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
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
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
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

        <motion.div
          className="text-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          💗
        </motion.div>

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
