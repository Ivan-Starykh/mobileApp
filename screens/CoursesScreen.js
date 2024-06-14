import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const CoursesScreen = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Text>Courses Screen</Text>
    </Container>
  );
};

export default CoursesScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 20px;
`;
