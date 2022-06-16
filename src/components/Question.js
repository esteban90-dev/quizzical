import React from 'react';

export default function Question(props) {
  const buttonElements = props.question.answers.map( answer => {
    const answerIndex = props.question.answers.indexOf(answer);
    const isSelected = props.question.selectedAnswers[answerIndex];

    return (
      <button 
        className={isSelected ? 
          "question__answerBtn question__answerBtn--selected"
            : 
          "question__answerBtn"}
        key={props.question.answers.indexOf(answer)}
        onClick={(event) => props.selectAnswer(event, props.question.id, answerIndex)}
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