import React, { useState, useEffect } from 'react';
import { Shuffle } from 'lucide-react';
import Button from '@/components/ui/button';
import Card from '@/components/ui/Card';
import './App.css';

const emojis = ['🍎', '🍌', '🍒', '🍓', '🍊', '🍋', '🍍', '🍉', '🍇', '🍐', '🥝', '🥥'];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setCards(shuffledEmojis.map((emoji, index) => ({ id: index, emoji })));
    setFlipped([]);
    setSolved([]);
    setWrongAttempts(0);
  };

  const handleClick = (id) => {
    if (disabled || solved.includes(id) || flipped.includes(id)) return;

    if (flipped.length === 0) {
      setFlipped([id]);
    } else if (flipped.length === 1) {
      setDisabled(true);
      const newFlipped = [...flipped, id];
      setFlipped(newFlipped);
      if (cards[newFlipped[0]].emoji === cards[newFlipped[1]].emoji) {
        setSolved([...solved, ...newFlipped]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1500); // Aumente o tempo aqui (1500ms = 1.5s)
        setWrongAttempts((prev) => prev + 1);
      }
    }
  };

  const handleRestart = () => {
    initializeGame();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-full p-4">
      <h1 className="text-4xl font-bold mb-4 text-white title">Jogo da Memória 🕹️</h1>
      <div className="mb-4 text-white text-xl sub-title">Tentativas erradas: {wrongAttempts}</div>
      <div className="grid grid-cols-6 gap-4 mb-8">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`w-20 h-28 flex items-center justify-center text-3xl cursor-pointer transition-all duration-300 rounded-lg shadow-lg ${
              flipped.includes(card.id) || solved.includes(card.id)
                ? 'bg-white'
                : 'bg-gradient-to-br from-blue-400 to-indigo-500'
            }`}
            onClick={() => handleClick(card.id)}
          >
            {flipped.includes(card.id) || solved.includes(card.id) ? (
              <div className="transform transition-transform duration-300 rotate-y-180">
                {card.emoji}
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                <div className="w-16 h-24 bg-white rounded-md shadow-inner"></div>
              </div>
            )}
          </Card>
        ))}
      </div>
      <Button
        onClick={handleRestart}
        className="flex items-center gap-2 bg-white text-purple-600 hover:bg-gray-100 mt-8"
      >
        <Shuffle size={20} />
        Reiniciar
      </Button>
    </div>
  );
};

export default MemoryGame;
