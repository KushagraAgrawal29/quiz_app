import React, { useState } from "react";
import { Container, Menu } from "semantic-ui-react";
import QNA from "./QNA";
import PropTypes from "prop-types"
import Stats from "./Stats";

const Result = ({
    totalQuestions,
    correctAnswers,
    timeTaken,
    questionsAndAnswers,
    replayQuiz,
    resetQuiz,
  }) => {
    const [activeTab, setActiveTab] = useState("Stats");

    const handleTabClick = (e, { name }) => {
      setActiveTab(name);
    };

    return (
      <Container>
        <Menu>
          <Menu.Item
            name="Stats"
            active={activeTab === "Stats"}
            onClick={handleTabClick}
          />
          <Menu.Item
            name="QNA"
            active={activeTab === "QNA"}
            onClick={handleTabClick}
          />
        </Menu>
        {activeTab === "Stats" && (
          <Stats
            totalQuestions={totalQuestions}
            correctAnswers={correctAnswers}
            timeTaken={timeTaken}
            replayQuiz={replayQuiz}
            resetQuiz={resetQuiz}
          />
        )}
        {activeTab === "ONA" && (
          <QNA questionsAndAnswers={questionsAndAnswers} />
        )}
        <br />
      </Container>
    );
  };

Result.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers:PropTypes.number.isRequired,
  timeTaken:PropTypes.number.isRequired,
  questionsAndAnswers:PropTypes.array.isRequired,
  replayQuiz:PropTypes.func.isRequired,
  resetQuiz:PropTypes.func.isRequired,
};

export default Result;
