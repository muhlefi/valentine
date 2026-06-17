'use client';
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import BG from '@/assets/bg.png';
import Link from 'next/link';

const flowerEmojis = ['🌸', '🌺', '🌷', '🌹', '💐', '🌻', '🌼'];

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
  const [flowers, setFlowers] = useState<Array<{ id: number; emoji: string; x: number; y: number; delay: number; size: number }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      size: 1 + Math.random() * 1.5,
    }));
    setFlowers(generated);
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

    const timeout = setTimeout(() => {
      setIsDisabled(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [isDisabled]);

  const handleYesClick = useCallback(() => {
    if (isDisabled) return;

    setIsDisabled(true);
    setRomanticText(getRandomText(romanticTexts));
    setShowModal(true);
    setConfetti(true);

    const timeout = setTimeout(() => {
      setIsDisabled(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [isDisabled]);

  useEffect(() => {
    if (confetti) {
      const confettiTimeout = setTimeout(() => {
        setConfetti(false);
      }, 5000);
      return () => clearTimeout(confettiTimeout);
    }
  }, [confetti]);

  return (
    <div
      style={{ backgroundImage: `url(${BG.src})` }}
      className="min-h-screen bg-cover bg-no-repeat flex flex-col justify-center items-center px-4 py-12 sm:py-20 relative overflow-hidden"
    >
      {flowers.map((f) => (
        <motion.div
          key={f.id}
          className="absolute pointer-events-none select-none"
          style={{ left: `${f.x}%`, top: `${f.y}%`, fontSize: `${f.size}rem` }}
          animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 3 + f.delay, delay: f.delay, ease: 'easeInOut' }}
        >
          {f.emoji}
        </motion.div>
      ))}

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

      <motion.div
        className="mt-8 text-4xl z-10"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        💗
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center bg-black/10 backdrop-blur-sm z-50"
            initial={{ y: -1000, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 1000, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <motion.div className="flex flex-col gap-4 p-8 sm:p-10 text-center rounded-2xl backdrop-blur-lg bg-white/30 border border-pink-200/50 shadow-2xl mx-4">
              <h2 className="font-patrick text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-400">
                💖 Yeay! 💖
              </h2>
              <p className="font-fredoka text-xl text-pink-600 font-medium drop-shadow-sm">
                {romanticText}
              </p>
              <Link
                href={'/love'}
                className="font-fredoka font-bold bg-gradient-to-r from-pink-400 to-rose-400 px-10 py-2.5 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-pink-500 hover:to-rose-500"
              >
                Next
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {confetti && <Confetti />}
    </div>
  );
}
