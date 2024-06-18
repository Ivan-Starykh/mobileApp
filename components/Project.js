import React from "react";
import styled from "styled-components/native";

class Project extends React.Component {
  render() {
    const { image, title, author, text } = this.props;
    return (
      <Container>
        <Cover>
          <Image source={image} />
          <Title>{title}</Title>
          <Author>by {author}</Author>
        </Cover>
        <Text>{text}</Text>
      </Container>
    );
  }
}

export default Project;

const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
  height: 290px;
  border-top-right-radius: 14px;
  border-top-left-radius: 14px;
  overflow: hidden;
`;
const Image = styled.Image`
  width: 100%;
  height: 290px;
`;
const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  position: absolute;
  top: 20px;
  left: 20px;
  width: 300px;
`;
const Author = styled.Text`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin-top: 5px;
  font-weight: 600;
  text-transform: uppercase;
`;
const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24px;
  color: #3c4560;
`;
