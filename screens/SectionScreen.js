import React from "react";
import styled from "styled-components/native";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SectionScreen = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Text>Section Screen</Text>
      <Button
        title="Close"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </Container>
  );
};

export default SectionScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 20px;
`;
