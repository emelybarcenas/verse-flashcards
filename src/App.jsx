import { use, useState } from 'react';
import Flashcard from './Flashcard';
import './App.css';
import verses from './verses';
import { get } from 'fast-levenshtein';

const handleGuessedAnswer = (e) => {
  e.preventDefault();
  const currentVerse = shuffledVerses[cardIndex];

  // Normalize both user input and the correct answer by trimming and making everything lowercase
  const normalizedUserAnswer = guessedAnswer.trim().toLowerCase();
  const normalizedCorrectAnswer = currentVerse.answer.trim().toLowerCase();

  // Calculate the Levenshtein distance between the two answers
  const distance = get(normalizedUserAnswer, normalizedCorrectAnswer);

  // Set a threshold for how many changes can be tolerated (e.g., a distance of 3 or less)
  if (distance <= 10) {
    setFeedback('Correct, Good job!');
  } else {
    setFeedback('Incorrect, try again.');
  }
};


function App() {

  const [cardIndex, setCardIndex] = useState(0);
  const [shuffledVerses, setShuffledVerses] = useState(verses);
  const [guessedAnswer, setGuessedAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleNextButton = () => {
    if (cardIndex < shuffledVerses.length - 1) {
      setCardIndex(cardIndex + 1);
    }
    setFeedback("") //Resets feedback
    setGuessedAnswer("") //Resets guessed answer
  };

  const handleShuffle = () =>{
      setShuffledVerses((prevVerses) => [...prevVerses].sort(() => Math.random() - 0.5));
    }
  
  
    const handleBackButton = () => {
      if (cardIndex > 0) {
        setCardIndex(cardIndex - 1);
      }
      setFeedback("") //Resets feedback
      setGuessedAnswer("") //Resets guessed answer
    };
  
    const handleGuessedAnswer = (e) => {
      e.preventDefault();
      const currentVerse = shuffledVerses[cardIndex];
    
      // Normalize both user input and the correct answer by trimming and making everything lowercase
      const normalizedUserAnswer = guessedAnswer.trim().toLowerCase();
      const normalizedCorrectAnswer = currentVerse.answer.trim().toLowerCase();
    
      // Calculate the Levenshtein distance between the two answers
      const distance = get(normalizedUserAnswer, normalizedCorrectAnswer);
    
      // Set a threshold for how many changes can be tolerated (e.g., a distance of 3 or less)
      if (distance <= 3) {
        setFeedback('Correct, Good job!');
      } else {
        setFeedback('Incorrect, try again.');
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
  
  <div>
    <form onSubmit={handleGuessedAnswer}>
      <label>Guess the answer here:</label>
      <input type="text" value={guessedAnswer} onChange={(e) => setGuessedAnswer(e.target.value)} name="guess" className='bg-white text-black' />
      <button type="submit" className="ml-10">Submit</button>
    </form>
    {feedback && <p>{feedback}</p>}
  </div>
  
        <div className='buttons'>
          <button onClick={handleBackButton} className='previous'>Back</button>
          <button onClick={handleNextButton} className='next'>Next</button>
          <button onClick={handleShuffle} className='shuffle'>Shuffle</button>
        </div>
      </div>
    );
  }

  
  


export default App;
