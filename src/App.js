import React from 'react';
import Question from './components/Question';
import blobTopRight from './images/blob-top-right.svg';
import blobBottomLeft from './images/blob-bottom-left.svg';

export default function App() {
  return (
    <main>
      <img src={blobTopRight} className="blobTopRight" alt="this is a yellow blob"></img>
      <img src={blobBottomLeft} className="blobBottomLeft" alt="this is a blue blob"></img>
      <Question />
      <Question />
      <Question />
      <Question />
      <Question />
    </main>
  )
}