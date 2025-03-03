
import {useState} from 'react'
import verses from './verses';;

export default function Flashcard({question, answer}){

const [isFlipped, setIsFlipped] = useState(false);
const [cardNumber, setCardNumber] = useState(0);


return(

<>

<div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
<div className='card-inner'>
    <div className='card-front'>
    <p><strong>{question}</strong></p>
    </div>
    
    <div className='card-back'> 
    <p>{answer}</p>
    </div>
</div>

</div>

</>

    )
}