import React from "react";
import { Container, Icon, Message } from "semantic-ui-react";

const Loader = ({ title, message }) => {
  return (
    <Container>
      <Message icon size="big">
        <Icon name="circle notched" loading />
        <Message.Content>
          <Message.Header>{title ? title : "Just One Second"}</Message.Header>
          {message ? message : "We are fetching that content for you."}
        </Message.Content>
      </Message>
    </Container>
  );
};

export default Loader;
