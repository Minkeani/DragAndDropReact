import  { useState } from "react";
import './styles/style.css'
import DragAndDrop from "./components/DragAndDrop";

function App() {
  const [cardList, SetCardList] = useState([
    {id: 1, order: 1, text: 'Карточка 1'}, 
    {id: 2, order: 2, text: 'Карточка 2'}, 
    {id: 3, order: 3, text: 'Карточка 3'}, 
    {id: 4, order: 4, text: 'Карточка 4'}, 

  ])
  const [currentCard, setCurrentCard] = useState(null)

  function DragStartHandle(e, card) {
    setCurrentCard(card)
  }

  function DragEndHandle(e) {
    e.target.style.background = 'white'

  }

  function DragOverHandle(e) {
    e.preventDefault()
    e.target.style.background = 'gray'
  }
 
  function DropHandle(e, card) {
    e.preventDefault()
    SetCardList(cardList.map(c => {
      if(c.id === card.id) {
        return {...c, order: currentCard.order}
      }
      if(c.id === currentCard.id) {
        return {...c, order: card.order}
      }
      return c
    }))
    e.target.style.background = 'white'

  }

  
  function sordCards(a,b) {
    if(a.order > b.order) {
      return 1
    } else {
      return -1
    }
  } 


  return (
    <div className="app">
             {cardList.sort(sordCards).map(card => 
          <div
          onDragStart={(e) => DragStartHandle(e, card)}
          onDragLeave={(e) => DragEndHandle(e)}
          onDragEnd={(e) => DragEndHandle(e)}
          onDragOver={(e) =>  DragOverHandle(e)}
          onDrop={(e) =>  DropHandle(e, card)}
          draggable={true}
          className='card'
          >
            {card.text}
          </div>
        )}
            
        
    </div>
  )
}

export default App;
