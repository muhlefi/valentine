'use client';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import BG from '@/assets/bg.png';
import Link from 'next/link';

const flowerEmojis = ['🌸', '🌺', '🌷', '🌹', '💐'];
const unlockAtMs = Date.parse('2026-06-28T15:59:00Z');

function formatCountdown(ms: number) {
  if (ms <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00' };
  }

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}

export default function Home() {
  const sadTexts = [
    'Hiks... No? 😢',
    'Yakin No? 🥺',
    'Duh... No? 😞',
    'Kasihan... 😥',
    'Sedih banget... 😔',
    'Hati ini terluka 💔',
    'No lagi? 😭',
    'Njir kok gitu sih? 🥲',
    'Huhu... Kenapa No? 😩',
    'Plis jangan No... 😣',
    'Yaudah deh... 😟',
    'Nyesek banget... 😓',
    'No terus? 🥹',
    'Serius No? 😧',
    'Gak percaya... 😢',
    'Huft... 😞',
    'Hiks hiks... 😭',
    'Ah masa No... 🤧',
    'Gak tega... 😿',
    'Sedih mode... 😿',
  ];

  const happyTexts = [
    'Yeay! 😍',
    'Senangnya! 😁',
    'Asik banget! 🥳',
    'Wah, seneng! 🤩',
    'Hore! 🎉',
    'Wow, makasih! 🥰',
    'Gembira banget! 😆',
    'Bahagia! 😊',
    'Wuuuhuu! 🎊',
    'Cinta banget! 💖',
    'Ah, kamu manis! 😍',
    'Bunga-bunga! 🌸',
    'Seneng banget! 😄',
    'Wah, beneran?! 🤗',
    'Yes! 💕',
    'Love you! 😘',
    'Beneran? 🥰',
    'Awww... 🫶',
    'Uwuwuwu! 💞',
    'Jadi Pacar Akuh! 💝',
  ];

  const romanticTexts = ['Yeayy happy birthday sayangg 🎂🎂'];

  const [noText, setNoText] = useState('No');
  const [yesText, setYesText] = useState('Yes');
  const [noScale, setNoScale] = useState(1);
  const [yesScale, setYesScale] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [romanticText, setRomanticText] = useState('');
  const [flowers, setFlowers] = useState<
    Array<{ id: number; emoji: string; x: number; y: number; size: number }>
  >([]);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const generated = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      emoji: flowerEmojis[i % flowerEmojis.length],
      x: 10 + i * 16,
      y: 12 + (i % 2) * 70,
      size: 1 + (i % 3) * 0.2,
    }));
    setFlowers(generated);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNowMs(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const getRandomText = (textsArray: string[]) => {
    const randomIndex = Math.floor(Math.random() * textsArray.length);
    return textsArray[randomIndex];
  };

  const handleNoClick = useCallback(() => {
    if (isDisabled) return;

    setIsDisabled(true);
    setNoText(getRandomText(sadTexts));
    setYesText(getRandomText(happyTexts));
    setNoScale((prev) => (prev > 0.01 ? prev - 0.05 : prev));
    setYesScale((prev) => (prev < 3 ? prev + 0.1 : prev));

    const timeout = window.setTimeout(() => {
      setIsDisabled(false);
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [isDisabled]);

  const handleYesClick = useCallback(() => {
    if (isDisabled) return;

    setIsDisabled(true);
    setRomanticText(getRandomText(romanticTexts));
    setShowModal(true);
    setConfetti(true);

    const timeout = window.setTimeout(() => {
      setIsDisabled(false);
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [isDisabled]);

  useEffect(() => {
    if (!confetti) return;

    const confettiTimeout = window.setTimeout(() => {
      setConfetti(false);
    }, 5000);

    return () => window.clearTimeout(confettiTimeout);
  }, [confetti]);

  const isUnlocked = nowMs >= unlockAtMs;
  const countdown = formatCountdown(unlockAtMs - nowMs);

  const malaysiaTime = useMemo(() => {
    return new Intl.DateTimeFormat('en-MY', {
      timeZone: 'Asia/Kuala_Lumpur',
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(nowMs);
  }, [nowMs]);

  return (
    <div
      style={{ backgroundImage: `url(${BG.src})` }}
      className="min-h-screen bg-cover bg-no-repeat flex flex-col justify-center items-center px-4 py-12 sm:py-20 relative overflow-hidden"
    >
      {flowers.map((f) => (
        <div
          key={f.id}
          className="absolute pointer-events-none select-none opacity-70"
          style={{ left: `${f.x}%`, top: `${f.y}%`, fontSize: `${f.size}rem` }}
        >
          {f.emoji}
        </div>
      ))}

      {!isUnlocked ? (
        <section className="w-full max-w-2xl flex flex-col items-center gap-6 z-10">
          <motion.div
            className="w-full rounded-[28px] border border-pink-200/60 bg-white/35 backdrop-blur-md shadow-xl px-6 py-8 text-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="font-fredoka text-sm uppercase tracking-[0.25em] text-pink-500">
              Locked Until Malaysia Time
            </p>
            <h1 className="mt-3 font-patrick text-4xl sm:text-5xl font-bold text-pink-700">
              Surprise opens on 28 June 2026, 23:59
            </h1>
            <p className="mt-4 font-fredoka text-pink-700">
              Current Malaysia time: {malaysiaTime}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Minutes', value: countdown.minutes },
                { label: 'Seconds', value: countdown.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-pink-200/70 bg-white/60 px-4 py-4 shadow-sm"
                >
                  <div className="font-patrick text-4xl text-pink-700">{item.value}</div>
                  <div className="font-fredoka text-sm text-pink-500">{item.label}</div>
                </div>
              ))}
            </div>

            <p className="mt-6 font-fredoka text-pink-600">
              Belum bisa masuk halaman utama sebelum waktunya ya sayang.
            </p>
          </motion.div>
        </section>
      ) : (
        <>
          <div className="w-full max-w-xl flex flex-col items-center gap-6 z-10">
            <h1 className="font-patrick text-4xl sm:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-400 to-pink-300 drop-shadow-sm">
              Hyee sayang first of all awak kena mengaku awak comell 🫣
            </h1>

            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={handleNoClick}
                className="font-fredoka font-semibold text-pink-400 border-2 border-pink-300/60 py-3 px-12 rounded-full transition-all duration-300 backdrop-blur-sm bg-pink-100/20 hover:bg-pink-100/40 shadow-md"
                initial={{ scale: 1 }}
                animate={{ scale: noScale }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                disabled={isDisabled}
              >
                {noText}
              </motion.button>
              <motion.button
                onClick={handleYesClick}
                className="font-fredoka font-bold text-white py-3 px-12 rounded-full transition-all duration-300 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 shadow-lg hover:shadow-xl"
                initial={{ scale: 1 }}
                animate={{ scale: yesScale }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                disabled={isDisabled}
              >
                {yesText}
              </motion.button>
            </div>
          </div>

          <div className="mt-8 text-4xl z-10">💗</div>

          <AnimatePresence>
            {showModal && (
              <motion.div
                className="fixed inset-0 flex justify-center items-center bg-black/10 backdrop-blur-sm z-50"
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <motion.div className="flex flex-col gap-4 p-8 sm:p-10 text-center rounded-2xl backdrop-blur-lg bg-white/30 border border-pink-200/50 shadow-2xl mx-4">
                  <h2 className="font-patrick text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-400">
                    💖 Yeay! 💖
                  </h2>
                  <p className="font-fredoka text-xl text-pink-600 font-medium drop-shadow-sm">
                    {romanticText}
                  </p>
                  <Link
                    href="/love"
                    className="font-fredoka font-bold bg-gradient-to-r from-pink-400 to-rose-400 px-10 py-2.5 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-pink-500 hover:to-rose-500"
                  >
                    Next
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {confetti && <Confetti />}
        </>
      )}
    </div>
  );
}
