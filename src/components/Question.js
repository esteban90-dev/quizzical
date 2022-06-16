import React from 'react';

export default function Question(props) {
  const buttonElements = props.question.answers.map( answer => {
    return (
      <button 
        className="question__answerBtn"
        key={props.question.answers.indexOf(answer)}
      >
        {answer}
      </button>
    );
  });

  return (
    <section className="question">
      <p>{props.question.question}</p>
      <div className="question__answerContainer">
        {buttonElements}
      </div>
      <hr className="question__rule"></hr>
    </section>
  );
}