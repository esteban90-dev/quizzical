import React from 'react';

export default function Question(props) {
  const buttonElements = props.question.answers.map( answer => {
    return (
      <button 
        className={props.question.selectedAnswer === answer ? 
          "question__answerBtn question__answerBtn--selected"
            : 
          "question__answerBtn"}
        key={props.question.answers.indexOf(answer)}
        onClick={(event) => props.selectAnswer(event, props.question.id)}
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