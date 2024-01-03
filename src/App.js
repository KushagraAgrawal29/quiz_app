import { useState } from 'react';
import './App.css';
import Layout from './components/Layout';
import Loader from './components/Loader';
import Main from './components/Main';
import Quiz from './components/Quiz/Quiz';

function App() {
  const [loading,setLoading] = useState(false);
  const [loadingMessage,setLoadingMessage] = useState(null);
  const [isQuizStarted,setIsQuizStarted] = useState(false);
  const [isQuizCompleted,setIsQuizCompleted] = useState(false);
  const [countdownTime,setCountdownTime] = useState(null);
  const [data,setData] = useState(null);
  const [resultData,setResultData] = useState(false);

  const startQuiz = (data,countdownTime) => {
    setLoading(true);
    setLoadingMessage({
      title:'Loading your quiz',
      message:'It wont be long!',
    })
    setCountdownTime(countdownTime);

    setTimeout(() => {
      setData(data);
      setIsQuizStarted(true);
      setLoading(false);
    },1000);
  };

  const endQuiz = (resultData) => {
    setLoading(true);
    setLoadingMessage({
      title:"Fetching Your Result",
      message:"Just a moment",
    });

    setTimeout(()=>{
      setIsQuizStarted(false);
      setIsQuizCompleted(true);
      setResultData(resultData);
      setLoading(false);
    },2000);
  };


  return (
    <Layout>
      {loading && <Loader {...loadingMessage}/>}
      {!loading && !isQuizStarted && !isQuizCompleted && (
        <Main startQuiz={startQuiz}/>
      )}
      {!loading && isQuizStarted && (
        <Quiz data={data} countdownTime={countdownTime} endQuiz={endQuiz}/>
      )}
    </Layout>
  );
}

export default App;
