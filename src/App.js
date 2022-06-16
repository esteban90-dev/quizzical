import React from 'react';
import blobTopRight from './images/blob-top-right.svg';
import blobBottomLeft from './images/blob-bottom-left.svg';

export default function App() {
  return (
    <main>
      <img src={blobTopRight} className="blobTopRight" alt="this is a yellow blob"></img>
      <img src={blobBottomLeft} className="blobBottomLeft" alt="this is a blue blob"></img>
      <p>
        How would one say goodbye in Spanish?
      </p>
      <div className="question__answerContainer">
        <button className="question__answerBtn question__answerBtn--selected">Adios</button>
        <button className="question__answerBtn">Hola</button>
        <button className="question__answerBtn">Au Revoir</button>
        <button className="question__answerBtn">Salir</button>
      </div>
      <hr className="question__rule"></hr>
    </main>
  )
}