import React from 'react';

export default function Question(props) {
  const buttonElements = props.question.answers.map( answer => {
    let buttonClass = "question__answerBtn";

    // --- determine color of answer button ---
    // if quiz complete
    if (props.quizIsComplete) {
      // make the button green if selected
      if (answer === props.question.selectedAnswer) {
        buttonClass = buttonClass.concat(" question__answerBtn--correct");
      }

      // make the button red and dim if not selected and correct
      else if (answer === props.question.correct_answer && 
        answer !== props.question.selectedAnswer) {
        buttonClass = buttonClass.concat(
          " question__answerBtn--incorrect question__answerBtn--dim"
        );
      }

      // otherwise, just make button dim
      else {
        buttonClass = buttonClass.concat(" question__answerBtn--dim");
      }
    }

    // quiz not complete
    // make the button darker if quiz not complete and selected
    if (!props.quizIsComplete) {
      if (answer === props.question.selectedAnswer) {
        buttonClass = buttonClass.concat(" question__answerBtn--selected");
      }
    }

    return (
      <button 
        className={buttonClass}
        key={props.question.answers.indexOf(answer)}
        onClick={!props.quizIsComplete ? 
          ((event) => props.selectAnswer(event, props.question.id, props.question.answers.indexOf(answer)))
          : undefined
        }
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