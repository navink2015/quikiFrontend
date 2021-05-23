import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React, { useState } from 'react'
import fb from '../../Assets/FB.png'
import google from '../../Assets/GOOGL.png'
import amzn from '../../Assets/AMZN.svg'

export default function DragCard() {

  const finalSpaceCharacters = [
    {
      id: 'a',
      name: 'FaceBook',
      thumb: fb,
      amount:266
    },
    {
      id: 'b',
      name: 'Google',
      thumb:  google,
      amount:1515
    },
    {
      id: 'c',
      name: 'Amazon',
      thumb: amzn,
      amount:3116
    },
    
  ]
  const [characters, setCharacters] = useState(finalSpaceCharacters)
  let handleOnDrageEnd = (result) => {
    // console.log(result)
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCharacters(items);
  }
  return (
    <div className="container">

      <h1>Drag and dropable</h1>
      <DragDropContext onDragEnd={handleOnDrageEnd}>
        <Droppable droppableId="characters" direction="horizontal">
          {(provided) => (
            <ul className="characters  d-flex justify-content-center" style={{"list-style-type": "none"}} {...provided.droppableProps} ref={provided.innerRef}>
              {characters.map(({ id, thumb, name,amount }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div className="border border-primary p-3 m-3g  "> 
                        <h1>  {name} </h1>
                         <img style={{"width":40,"height":40}} src={thumb} alt="logo"/>
                         <p className="text-primary mt-2"> {amount} USD</p>
                         </div>
                      </li>
                    )}
                  </Draggable>)
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
