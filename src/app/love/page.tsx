'use client';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import BG from '@/assets/bg.png';
import Foto1 from '@/assets/1.jpeg';
import Foto2 from '@/assets/2.jpeg';
import Foto3 from '@/assets/3.jpeg';
import Foto4 from '@/assets/4.jpeg';
import Foto5 from '@/assets/5.jpeg';
import Foto6 from '@/assets/6.jpeg';
import Foto7 from '@/assets/7.jpeg';
import Foto8 from '@/assets/8.jpeg';

const letterContent =
  'Happy Birthday sayangg.\n\n' +
  'thankss sebab alwayss ada dengan saya walaupun kita selalu gaduhh tapi saya janjii saya always support awak and try untuk buat awak happy everyday sorry kalau hadiah saya ni tak seberapa hihih just nak awak tau buat kali yang ke 10000 saya sayangg awakk sangatt sangattt\n\n' +
  "in every other universe i'll always choose you,my nadira.\n\n" +
  'Dengan semua cinta,\n' +
  'Capi ❤️❤️';

const texts = [
  'Swipe me gently, I am fragile... just like your boyfriend heart. 😉',
  'You are my favorite notification, even when it is just "wyd". 💌',
  'If you were a Wi-Fi signal, I would stand very close forever. 📶',
  'You are the reason my phone battery and my heart both run out fast. 🔋',
  'I love you more than naps, and that is a very serious statement. 😴',
  'You are cute in a way that should probably be illegal. 🚨',
  'Every love song is basically me being dramatic about you. 🎶',
  'You are my green flag, red velvet cake, and happy ending. 🍰',
  'If I had to choose again, I would still pick you and your cute face. 😚',
  'You make ordinary days feel like surprise dates. ✨',
  'My favorite place is anywhere you are being adorable. 📍',
  'You are the plot twist that made my life way better. 💞',
  'I fell for you and honestly I would do it again for entertainment. 😌',
  'You are my person, my peace, and my tiny daily chaos. 🤍',
  'I still get excited talking to you like a teenager with unlimited SMS. 📱',
  'You are sweeter than cake and more addictive than late-night chats. 🍓',
  'Loving you is my easiest habit and my favorite one. 🫶',
  'In a room full of people, I would still look for your face first. 👀',
  'You are my cutest hello and my hardest goodbye. 🌷',
];

const images = [Foto1, Foto2, Foto3, Foto4, Foto5, Foto6, Foto7, Foto8];
const floatingHearts = ['💗', '💕', '💖', '💞'];

const allCards = [
  ...texts.map((text, index) => ({ type: 'text' as const, text, id: `text-${index}` })),
  ...images.map((img, index) => ({ type: 'image' as const, img, index, id: `img-${index}` })),
];

export default function Love() {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [view, setView] = useState<'letter' | 'cards'>('letter');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioStarted = useRef(false);

  const ornaments = useMemo(
    () =>
      Array.from({ length: 5 }, (_, index) => ({
        id: index,
        emoji: floatingHearts[index % floatingHearts.length],
        left: 12 + index * 18,
        top: 12 + (index % 2) * 70,
      })),
    [],
  );

  const visibleCards = useMemo(() => {
    return allCards.slice(activeCardIndex, activeCardIndex + 3);
  }, [activeCardIndex]);

  useEffect(() => {
    const audio = new Audio('/pretty-little-baby.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.remove();
    };
  }, []);

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
    }, 35);

    return () => clearInterval(timer);
  }, []);

  const startMusic = () => {
    if (!audioStarted.current && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          audioStarted.current = true;
        })
        .catch(() => {});
    }
  };

  const showNextCard = () => {
    setActiveCardIndex((prev) => {
      if (prev >= allCards.length - 1) return 0;
      return prev + 1;
    });
  };

  return (
    <div
      style={{ backgroundImage: `url(${BG.src})` }}
      className="h-screen bg-cover bg-no-repeat bg-pink-100 flex flex-col items-center relative overflow-hidden"
    >
      {ornaments.map((item) => (
        <div
          key={item.id}
          className="absolute pointer-events-none opacity-70"
          style={{ left: `${item.left}%`, top: `${item.top}px` }}
        >
          {item.emoji}
        </div>
      ))}

      {view === 'letter' && (
        <section className="w-full max-w-sm h-full flex flex-col items-center justify-center gap-6 px-4 py-12 z-20">
          <motion.h1
            className="font-patrick text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-400 to-pink-300 drop-shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ❤️❤️ Dari Hati Capi
          </motion.h1>

          <motion.div
            className="w-full backdrop-blur-md bg-white/20 border border-pink-200/40 shadow-xl rounded-2xl p-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <pre className="font-fredoka text-pink-800 text-sm leading-relaxed whitespace-pre-wrap font-medium">
              {displayedText}
              {!isTypingComplete && <span className="inline-block ml-0.5">|</span>}
            </pre>
          </motion.div>

          <div className="text-3xl">💗</div>

          {isTypingComplete && (
            <motion.button
              onClick={() => {
                setView('cards');
                startMusic();
              }}
              className="font-fredoka font-bold text-white bg-gradient-to-r from-pink-400 to-rose-400 py-3 px-8 rounded-full shadow-lg transition-all active:scale-95"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              Lihat Momen Kita 💕
            </motion.button>
          )}
        </section>
      )}

      {view === 'cards' && (
        <section className="w-full max-w-sm h-full flex flex-col items-center px-4 py-6 z-20">
          <div className="flex flex-col items-center gap-2">
            <motion.p
              className="font-patrick text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-rose-400 to-pink-300 drop-shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              Sayaanggg 💕
            </motion.p>

            <div className="text-3xl">❤️</div>

            <motion.p
              className="font-patrick text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-300 drop-shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              Happy Birthday sayangg.
            </motion.p>
          </div>

          <div className="relative flex-1 w-full flex items-center justify-center">
            <div className="relative w-full max-h-[65vh]" style={{ aspectRatio: '3 / 4' }}>
              {visibleCards
                .slice()
                .reverse()
                .map((card, stackIndex) => {
                  const isTopCard = stackIndex === visibleCards.length - 1;

                  return (
                    <motion.div
                      key={card.id}
                      className="absolute inset-0 backdrop-blur-sm bg-pink-100/35 border border-pink-200/40 shadow-xl rounded-2xl p-5 flex items-center justify-center select-none"
                      style={{
                        transform: `translateY(${(visibleCards.length - 1 - stackIndex) * 8}px) scale(${1 - (visibleCards.length - 1 - stackIndex) * 0.03})`,
                        zIndex: stackIndex + 1,
                      }}
                      drag={isTopCard ? 'x' : false}
                      dragElastic={0.2}
                      dragConstraints={{ left: 0, right: 0 }}
                      whileTap={isTopCard ? { cursor: 'grabbing' } : undefined}
                      onDragEnd={(_, info) => {
                        if (isTopCard && Math.abs(info.offset.x) > 80) {
                          showNextCard();
                        }
                      }}
                      onClick={() => {
                        if (isTopCard) showNextCard();
                      }}
                    >
                      {card.type === 'image' ? (
                        <Image
                          draggable={false}
                          src={card.img}
                          alt={`Foto ${card.index + 1}`}
                          className="w-40 max-h-[52vh] object-contain rounded-xl shadow-md"
                          priority={activeCardIndex === 0 && card.index === 0}
                          loading={activeCardIndex === 0 && card.index === 0 ? 'eager' : 'lazy'}
                        />
                      ) : (
                        <span className="font-fredoka text-pink-700 font-medium text-sm leading-relaxed drop-shadow-sm text-center">
                          {card.text}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
            </div>
          </div>

          <button
            type="button"
            onClick={showNextCard}
            className="font-fredoka text-sm font-semibold text-pink-600 bg-white/45 border border-pink-200/60 rounded-full px-5 py-2 shadow-sm"
          >
            Next card
          </button>

          <motion.p
            className="font-patrick text-lg text-pink-500 drop-shadow-lg pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.35 }}
          >
            💗 Love You Forever 💗
          </motion.p>
        </section>
      )}
    </div>
  );
}
