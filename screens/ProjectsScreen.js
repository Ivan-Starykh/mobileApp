import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const ProjectScreen = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Text>Project Screen</Text>
    </Container>
  );
};

export default ProjectScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 20px;
`;
