import { useState } from 'react';
import Flashcard from './Flashcard';
import './App.css';
import verses from './verses';

function App() {

  const [cardIndex, setCardIndex] = useState(0);
  const [shuffledVerses, setShuffledVerses] = useState(verses);

  const handleNextButton = () => {
    if (cardIndex === 0) {
      // Shuffle only when reaching the second card
      setShuffledVerses((prevVerses) => [...prevVerses].sort(() => Math.random() - 0.5));
    }
    
    if (cardIndex < shuffledVerses.length - 1) {
      setCardIndex(cardIndex + 1);
    }
  };

  const handleBackButton = () => {
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1);
    }
  };

  return (
    <div className='container'>
      <h1>Learn Bible Verses!</h1>
      <div className='description'>
        <h2>Memorizing scripture equips us to <br />keep our faith, hope, and love!</h2>
      </div>
      <p>Number of cards: {shuffledVerses.length} </p>

      <Flashcard
        key={cardIndex}
        question={shuffledVerses[cardIndex].question}
        answer={shuffledVerses[cardIndex].answer}
      />
      <p>{cardIndex + 1} out of {shuffledVerses.length}</p>

      <div className='buttons'>
        <button onClick={handleBackButton} className='previous'>Back</button>
        <button onClick={handleNextButton} className='next'>Next</button>
      </div>
    </div>
  );
}

export default App;
