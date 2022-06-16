import React from 'react';
import Question from './components/Question';
import blobTopRight from './images/blob-top-right.svg';
import blobBottomLeft from './images/blob-bottom-left.svg';

export default function App() {
  const [questions, setQuestions] = React.useState([]);
  const [selections, setSelections] = React.useState([]);

  // on initial render of App, fetch 5 questions from open trivia db
  // and store them in questions state variable
  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then( res => res.json())
      .then( json => setQuestions(buildQuestions(json.results)));
  }, []);

  function buildQuestions(questionData) {
    // build question objects from api data
    const questions = [];
    let decodedQuestions = [];
    
    for (let i=0; i<questionData.length; i++) {
      questions.push({
        id: i + 1,
        question: questionData[i].question,
        type: questionData[i].type,
        answers: questionData[i].incorrect_answers.concat(questionData[i].correct_answer),
        selectedAnswers: Array(questionData[i].incorrect_answers.length + 1).fill(false),
        correct_answer: questionData[i].correct_answer,
      });
    }

    // questions and answers may contain html entities
    // that need to be decoded
    decodedQuestions = questions.map(question => {
      question.question = decode(question.question);
      question.correct_answer = decode(question.correct_answer);
      question.answers = question.answers.map(answer => decode(answer));
      return question
    });

    return decodedQuestions;
  }

  function decode(string) {
    //convert html entity encodings
    return string.replaceAll("&quot;", "\"")
      .replaceAll("&#039;", "\'")
      .replaceAll("&amp;", "\&")
      .replaceAll("&shy;", "")
      .replaceAll("&ldquo;", "\"")
      .replaceAll("&rdquo;", "\"");
  }

  function selectAnswer(event, questionId, answerIndex) {
    // update selectedAnswer array
    setQuestions(prevQuestions => {
      return prevQuestions.map( question => {
        if (question.id === questionId) {
          question.selectedAnswers.fill(false)
          question.selectedAnswers[answerIndex] = true;
          return question;
        }
        else {
          return question;
        }
      });
    });
  }

  // only build question elements if there are questions,
  // i.e. after the fetch call is complete 
  // if no questions exist yet, set questionElements to an 
  // empty array

  const questionElements = questions.length > 0 ? 
    questions.map( question => (
      <Question
        key={question.id}
        question={question}
        selectAnswer={selectAnswer}
      />
    ))
  : [];

  return (
    <main>
      <img src={blobTopRight} className="blobTopRight" alt="this is a yellow blob"></img>
      <img src={blobBottomLeft} className="blobBottomLeft" alt="this is a blue blob"></img>
      {questionElements}
    </main>
  )
}