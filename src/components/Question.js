import React from 'react';

export default function Question() {
  return (
    <section className="question">
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
    </section>
  );
}