import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Item,
  Menu,
  Message,
  Segment,
} from "semantic-ui-react";
import Countdown from "../Countdown";
import he from "he";
import { getLetter } from "../utils/getLetter";

const Quiz = ({ data, countdownTime, endQuiz }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(null);
  const [userSelectedAns, setUserSelectedAns] = useState(null);
  const [correctAnswers, setCorrectedAnswers] = useState(0);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);

  useEffect(() => {
    if (questionIndex > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [questionIndex]);

  const handleItemClick = (e, { name }) => {
    setUserSelectedAns(name);
  };

  const handleNext = () => {
    let point = 0;

    if (userSelectedAns === he.decode([questionIndex].correct_answer)) {
      point = 1;
    }

    const qna = questionsAndAnswers;
    qna.push({
      question: he.decode(data[questionIndex].question),
      user_answer: userSelectedAns,
      correct_answer: he.decode(data[questionIndex].correct_answer),
      point,
    });

    if (questionIndex === data.length - 1) {
      return endQuiz({
        totalQuestions: data.length,
        correctAnswers: correctAnswers + point,
        timeTaken,
        questionsAndAnswers: qna,
      });
    }

    setCorrectedAnswers(correctAnswers + point);
    setQuestionIndex(questionIndex + 1);
    setUserSelectedAns(null);
    setQuestionsAndAnswers(qna);
  };

  const timeOver = (timeTaken) => {
    return endQuiz({
      totalQuestions: data.length,
      correctAnswers,
      timeTaken,
      questionsAndAnswers,
    });
  };

  return (
    <Item.Header>
      <Container>
        <Segment>
          <Item.Group divided>
            <Item>
              <Item.Content>
                <Item.Extra>
                  <Header as="h1" block floated="left">
                    <Icon name="info-circle" />
                    <Header.Content>
                      {`Question No.${questionIndex + 1} of ${data.length}`}
                    </Header.Content>
                  </Header>
                  <Countdown
                    countdownTime={countdownTime}
                    timeOver={timeOver}
                    setTimeTaken={setTimeTaken}
                  />
                </Item.Extra>
                <br />
                <Item.Meta>
                  <Message size="huge" floating>
                    <b>{`Q. ${he.decode(data[questionIndex].question)}`}</b>
                  </Message>
                  <br />
                  <Item.Description>
                    <p>Please chooose one of the following answers:</p>
                  </Item.Description>
                  <Divider />
                  <Menu vertical fluid size="massive">
                    {data[questionIndex].options.map((option, index) => {
                      const letter = getLetter(index);
                      const decodeOption = he.decode(option);

                      return (
                        <Menu.Item
                          key={decodeOption}
                          name={decodeOption}
                          active={userSelectedAns === decodeOption}
                          onClick={handleItemClick}
                        >
                          <b style={{ marginRight: "8px" }}>{letter}</b>
                          {decodeOption}
                        </Menu.Item>
                      );
                    })}
                  </Menu>
                </Item.Meta>
                <Divider />
                <Item.Extra>
                  <Button
                    primary
                    content="Next"
                    onClick={handleNext}
                    floated="right"
                    size="big"
                    icon="right chevron"
                    disabled={!userSelectedAns}
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <br />
      </Container>
    </Item.Header>
  );
};

Quiz.propTypes = {
  data: PropTypes.array.isRequired,
  countdownTime: PropTypes.number.isRequired,
  endQuiz: PropTypes.func.isRequired,
};

export default Quiz;
