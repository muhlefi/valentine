'use client'
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
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
  'Sayangku,\n\n' +
  'Dari pertama kali aku lihat kamu, aku udah tau kalau kamu itu beda. Senyum kamu, cara kamu ngomong, cara kamu ngeliat hal-hal kecil... semuanya bikin aku jatuh cinta setiap hari.\n\n' +
  'Aku bersyukur banget bisa kenal kamu. Kamu bikin hidup aku jadi penuh warna, penuh tawa, dan penuh cinta.\n\n' +
  'Aku mau jadi tempat kamu pulang, jadi alasan kamu senyum, jadi bagian dari setiap cerita kamu.\n\n' +
  'I love you, Sayang. More than anything.\n\n' +
  'Selamanya,\n' +
  'Your Babe 💌';

const texts = [
  'Geser untuk membuka ❤️',
  'Cinta itu kayak angin, nggak keliatan tapi kerasa banget. 🌬️',
  'Kamu selalu bikin hari-hariku lebih berarti. 💕',
  'Setiap detik sama kamu itu berasa kayak selamanya. ⏳',
  'Kamu itu jawaban dari tiap doa aku, serius! 🙏',
  'Nggak ada yang lebih indah dari sayang sama kamu. 🌹',
  'Akhir cerita? Ya cuma kamu yang aku pilih! 💖',
  'Pagi-pagi tuh lebih indah kalau langsung kepikiran kamu. 🌞',
  'Bareng kamu tuh rasanya lengkap banget. 🥰',
  'Nggak ada kata yang cukup buat gambarin sayang aku ke kamu! 📜',
  'Mau hujan badai atau panas terik, kamu tetap pelangi aku. 🌈',
  'Detik tanpa kamu tuh berasa kayak setahun. ⏰',
  'Aku sayang kamu lebih dari yang bisa aku ungkapin! ❤️',
  'Sama kamu, aku ngerasa nemu rumah di hati kamu. 🏡',
  'Kamu itu mimpi yang jadi kenyataan buat aku. 💫',
  'Sejak ada kamu, hidup aku makin berwarna banget! 🎨',
  'Kalau sayang kamu itu salah, aku nggak mau bener. ❌',
  'Semoga kita selalu bareng sampai tua nanti. 🥺❤️',
  'Jarak nggak bakal bisa ngurangin sayang aku ke kamu! 🌍',
];

const images = [Foto1, Foto2, Foto3, Foto4, Foto5, Foto6, Foto7, Foto8];
const flowerEmojis = ['🌸', '🌺', '🌷', '🌹', '🌼'];

const allCards = [
  ...texts.map((t, i) => ({ type: 'text' as const, text: t, id: `text-${i}` })),
  ...images.map((img, i) => ({ type: 'image' as const, img, index: i, id: `img-${i}` })),
];

export default function Love() {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [view, setView] = useState<'letter' | 'cards'>('letter');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioStarted = useRef(false);

  const [petals, setPetals] = useState<
    Array<{ id: number; emoji: string; x: number; delay: number; duration: number; size: number }>
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: flowerEmojis[i % flowerEmojis.length],
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 10,
      size: 0.8 + Math.random() * 1.2,
    }));
    setPetals(generated);
  }, []);

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
      if (i < letterContent.length) {
        setDisplayedText(letterContent.slice(0, i + 1));
        i++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, []);

  const startMusic = () => {
    if (!audioStarted.current && audioRef.current) {
      audioRef.current.play().then(() => {
        audioStarted.current = true;
      }).catch(() => {});
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${BG.src})` }}
      className="h-screen bg-cover bg-no-repeat bg-pink-100 flex flex-col items-center relative overflow-hidden"
    >
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="fixed pointer-events-none select-none z-10"
          style={{ left: `${p.x}%`, fontSize: `${p.size}rem` }}
          animate={{
            y: ['-10vh', '110vh'],
            x: [0, 30, -30, 20, 0],
            rotate: [0, 360],
            opacity: [0.8, 0.5, 0.2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          {p.emoji}
        </motion.div>
      ))}

      {view === 'letter' && (
        <section className="w-full max-w-sm h-full flex flex-col items-center justify-center gap-6 px-4 py-12 z-20">
          <motion.h1
            className="font-patrick text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-400 to-pink-300 drop-shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            💌 Surat Cinta
          </motion.h1>

          <motion.div
            className="w-full backdrop-blur-lg bg-white/20 border border-pink-200/40 shadow-xl rounded-2xl p-4"
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
            className="text-3xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            💗
          </motion.div>

          {isTypingComplete && (
            <motion.button
              onClick={() => { setView('cards'); startMusic(); }}
              className="font-fredoka font-bold text-white bg-gradient-to-r from-pink-400 to-rose-400 py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
              transition={{ duration: 0.5 }}
            >
              Sayaanggg 💕
            </motion.p>

            <motion.div
              className="text-3xl"
              initial={{ opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              ❤️
            </motion.div>

            <motion.p
              className="font-patrick text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-300 drop-shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Happy Birthday!
            </motion.p>
          </div>

          <div className="relative flex-1 w-full flex items-center justify-center">
            <div className="relative w-full max-h-[65vh]" style={{ aspectRatio: '3 / 4' }}>
              {allCards.map((card, i) => (
                <motion.div
                  key={card.id}
                  className="absolute inset-0 backdrop-blur-md bg-pink-100/30 border border-pink-200/40 shadow-xl rounded-2xl p-5 flex items-center justify-center select-none"
                  style={{ transform: `translateY(${i * 3}px)`, zIndex: allCards.length - i }}
                  drag
                  dragElastic={1}
                  whileTap={{ cursor: 'grabbing' }}
                >
                  {card.type === 'image' ? (
                    <Image
                      draggable={false}
                      src={card.img}
                      alt={`Foto ${card.index + 1}`}
                      className="w-36 aspect-auto object-contain rounded-xl shadow-md"
                    />
                  ) : (
                    <span className="font-fredoka text-pink-700 font-medium text-sm leading-relaxed drop-shadow-sm text-center">
                      {card.text}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.p
            className="font-patrick text-lg text-pink-500 drop-shadow-lg pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            💗 Love You Forever 💗
          </motion.p>
        </section>
      )}
    </div>
  );
}
