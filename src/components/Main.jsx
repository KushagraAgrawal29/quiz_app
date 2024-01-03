import React, { useState } from "react";
import { Button, Container, Divider, Dropdown, Item, Message, Segment } from "semantic-ui-react";
import mindImg from "./images/mind.svg";
import CATEGORIES from "./constants/categories";
import NUM_OF_QUESTIONS from "./constants/numOfQuestions";
import DIFFICULTY from "./constants/difficulty";
import QUESTIONS_TYPE from "./constants/questionsType";
import COUNTDOWN_TIME from "./constants/countdownTime";

const Main = () => {
    const [error,setError] = useState(null);
    const [category,setCategory] = useState('0');
    const [processing,setProcessing] = useState(false);
    const [numOfQuestions,setNUmOfQuestions] = useState(5);
    const [difficulty,setDifficulty] = useState('easy');
    const [questionsType,setQuestionsType] = useState('0');
    const [countdownTime,setCountdownTime] = useState({
        hours:0,
        minutes:120,
        seconds:0,
    });

    const handleTimeChange = (e ,{ name,value}) => {
        setCountdownTime({...countdownTime,[name]:value})
    }

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
              <Divider/>
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
                    onChange={(e ,{ value }) => setCategory(value)}
                    disabled={processing}
                />
                <br/>
                <p>How many questions do you want in your quiz?</p>
                <Dropdown
                    fluid
                    selection
                    name="numofQuestions"
                    placeholder='Select Number of Questions'
                    header='Select Numbber of Questions'
                    options={NUM_OF_QUESTIONS}
                    value={numOfQuestions}
                    onChange={(e ,{ value }) => setNUmOfQuestions(value)}
                    disabled={processing}
                />
                <br/>
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
                <br/>
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
                <br/>
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
              <Divider/>
              <Item.Extra>
                <Button
                    primary
                    size="big"
                    icon="play"
                    labelPosition="left"
                    content={processing ? 'Processing...' : 'Play Now'}
                    // onClick={fetchData}
                    // disabled={!allFieldSelected || processing}
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
