import React, { useState } from "react";
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Item,
  Message,
  Segment,
} from "semantic-ui-react";
import mindImg from "./images/mind.svg";
import CATEGORIES from "./constants/categories";
import NUM_OF_QUESTIONS from "./constants/numOfQuestions";
import DIFFICULTY from "./constants/difficulty";
import QUESTIONS_TYPE from "./constants/questionsType";
import COUNTDOWN_TIME from "./constants/countdownTime";
import shuffle from "./utils/shuffle";

const Main = ({ startQuiz }) => {
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("0");
  const [processing, setProcessing] = useState(false);
  const [numOfQuestions, setNUmOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("easy");
  const [questionsType, setQuestionsType] = useState("0");
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 120,
    seconds: 0,
  });
  const [offline,setOffline] = useState(false);

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  let allFieldSelected = false;
  if (
    category &&
    numOfQuestions &&
    difficulty &&
    questionsType &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
  ) {
    allFieldSelected = true;
  }

  const fetchData = () => {
    setProcessing(true);

    if (error) {
      setError(null);
    }

    const API = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionsType}`;

    fetch(API)
      .then((response) => response.json())
      .then((data) =>
        setTimeout(() => {
          const { response_code, results } = data;

          if (response_code === 1) {
            const message = (
              <p>
                The API doesn't have enough questions for your query. (Ex.
                Asking for 50 questions in a category that only has 20
                questions.)
                <br />
                <br />
                Please change the <strong>No. of Questions</strong>,{" "}
                <strong>Difficulty Level</strong>,or{" "}
                <strong>Type of Questions</strong>.
              </p>
            );
            setProcessing(false);
            setError({ message: message });

            return;
          }

          results.forEach(element => {
            element.options = shuffle([
                element.correct_answer,
                ...element.incorrect_answers,
            ]);
          });

          setProcessing(false);
          startQuiz(
            results,
            countdownTime.hours + countdownTime.minutes + countdownTime.seconds
          );
        },1000)
      )
      .catch(error => 
        setTimeout(() => {
            if(!navigator.onLine){
                setOffline(true);
            }
            else{
                setProcessing(false)
                setError(error)
            }
        },1000)
      );
  };

  return (
    <Container>
      <Segment>
        <Item.Group divided>
          <Item>
            <Item.Image src={mindImg} />
            <Item.Content>
              <Item.Header>
                <h1>The Ultimate Trivia Quiz</h1>
              </Item.Header>
              {error && (
                <Message error onDismiss={() => setError(null)}>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )}
              <Divider />
              <Item.Meta>
                <p>In which category do you want to play the quiz?</p>
                <Dropdown
                  fluid
                  selection
                  name="category"
                  placeholder="Select quiz category"
                  header="Select quiz category"
                  options={CATEGORIES}
                  value={category}
                  onChange={(e, { value }) => setCategory(value)}
                  disabled={processing}
                />
                <br />
                <p>How many questions do you want in your quiz?</p>
                <Dropdown
                  fluid
                  selection
                  name="numofQuestions"
                  placeholder="Select Number of Questions"
                  header="Select Numbber of Questions"
                  options={NUM_OF_QUESTIONS}
                  value={numOfQuestions}
                  onChange={(e, { value }) => setNUmOfQuestions(value)}
                  disabled={processing}
                />
                <br />
                <p>How difficult do you want your quiz to be?</p>
                <Dropdown
                  fluid
                  selection
                  name="Difficulty"
                  placeholder="Please Select Difficulty Level"
                  header="Select Difficulty Level"
                  options={DIFFICULTY}
                  value={difficulty}
                  onChange={(e, { value }) => setDifficulty(value)}
                  disabled={processing}
                />
                <br />
                <p>Which type of questions do you want in your Quiz?</p>
                <Dropdown
                  fluid
                  selection
                  name="Question Type"
                  placeholder="Select Questions Type"
                  header="Select Questions Type"
                  options={QUESTIONS_TYPE}
                  value={questionsType}
                  onChange={(e, { value }) => setQuestionsType(value)}
                  disabled={processing}
                />
                <br />
                <p>Please Select the countdown Time for your Quiz</p>
                <Dropdown
                  search
                  selection
                  name="hours"
                  placeholder="Select hours"
                  header="Select hours"
                  options={COUNTDOWN_TIME.hours}
                  value={countdownTime.hours}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
                <Dropdown
                  search
                  selection
                  name="minutes"
                  placeholder="Select Minutes"
                  header="Select Minutes"
                  options={COUNTDOWN_TIME.minutes}
                  value={countdownTime.minutes}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
                <Dropdown
                  search
                  selection
                  name="seconds"
                  placeholder="Select Seconds"
                  header="Select Seconds"
                  options={COUNTDOWN_TIME.seconds}
                  value={countdownTime.seconds}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
              </Item.Meta>
              <Divider />
              <Item.Extra>
                <Button
                  primary
                  size="big"
                  icon="play"
                  labelPosition="left"
                  content={processing ? "Processing..." : "Play Now"}
                  onClick={fetchData}
                  disabled={!allFieldSelected || processing}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Container>
  );
};

export default Main;
