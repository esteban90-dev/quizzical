import React from 'react';
import Question from './components/Question';
import blobTopRight from './images/blob-top-right.svg';
import blobBottomLeft from './images/blob-bottom-left.svg';

export default function App() {
  const [questions, setQuestions] = React.useState([]);
  // quizStatus can either be 'not started', 'started', or 'complete'
  const [quizStatus, setQuizStatus] = React.useState('not started');

  // on initial render of App, fetch 5 questions from open trivia db
  // and store them in questions state variable
  React.useEffect(() => {
    // only run fetch call when quizStatus changes to 'started'
    if (quizStatus === 'started') {
      fetch('https://opentdb.com/api.php?amount=5')
        .then( res => res.json())
        .then( json => setQuestions(buildQuestions(json.results)));
    }
  }, [quizStatus]);

  function shuffle(arr) {
    // return a randomly shuffled array
    let prevArr = arr.slice(0);
    const newArr = [];

    while (prevArr.length > 0) {
      // 1. get a random index in the array
      let randomIndex = parseInt(Math.random() * prevArr.length);

      // 2. push value at random index into new array
      newArr.push(prevArr[randomIndex]);

      // 3. filter prev array to exclude chosen random index
      prevArr = prevArr.filter((item, index) => index !== randomIndex);
    }
    
    return newArr;
  }

  function buildQuestions(questionData) {
    // build question objects from api data
    const questions = [];
    let decodedQuestions = [];
    
    for (let i=0; i<questionData.length; i++) {
      questions.push({
        id: i + 1,
        question: questionData[i].question,
        type: questionData[i].type,
        answers: shuffle(questionData[i].incorrect_answers.concat(questionData[i].correct_answer)),
        selectedAnswer: "",
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

  function selectAnswer(event, questionId, answerId) {
    setQuestions(prevQuestions => {
      return prevQuestions.map(prevQuestion => {
        if (prevQuestion.id === questionId) {
          return {...prevQuestion, selectedAnswer: prevQuestion.answers[answerId]};
        }
        else {
          return prevQuestion;
        }
      });
    });
  }

  function scoreQuiz() {
    setQuizStatus('complete');
  }

  function numCorrectAnswers() {
    if (quizStatus !== 'complete') {
      return undefined;
    }
    else {
      return questions.filter(
        question => question.selectedAnswer === question.correct_answer
      ).length;
    }
  }

  function playAgain() {
    setQuizStatus('started');
  }

  function startQuiz() {
    setQuizStatus('started');
  }

  // only build question elements if there are questions,
  // i.e. after the quiz is started and the fetch call is complete 
  // if no questions exist yet, set questionElements to an 
  // empty array

  const questionElements = questions.length > 0 ? 
    questions.map( question => (
      <Question
        key={question.id}
        question={question}
        quizStatus={quizStatus}
        selectAnswer={selectAnswer}
      />
    ))
  : [];

  return (
    <main>
      <img src={blobTopRight} className="blobTopRight" alt="this is a yellow blob"></img>
      <img src={blobBottomLeft} className="blobBottomLeft" alt="this is a blue blob"></img>
      
      
      {quizStatus === 'not started' && 
        <section className="title__container">
          <h1 className="title__heading">Quizzical</h1>
          <p className="title__description">Quiz yourself on random trivia questions</p>
          <button className="quiz__startBtn" onClick={startQuiz}>Start Quiz</button>
        </section>
        
      }

      {(quizStatus === 'started' && questionElements.length > 0) &&
        <section className="quiz__container">
          {questionElements}
          <div className="quiz__scoreContainer">
            <button className="quiz__scoreBtn" onClick={scoreQuiz}>Check answers</button>
          </div>
        </section>
      }

      {quizStatus === 'complete' &&
        <section className="quiz__container">
          {questionElements}
          <div className="quiz__scoreContainer">
            <p>You scored {numCorrectAnswers()}/{questions.length} correct answers</p>
            <button className="quiz__playAgainBtn" onClick={playAgain}>Play again</button>
          </div>
        </section>
        
      }
    </main>
  )
}