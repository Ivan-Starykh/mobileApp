import React, { useRef } from "react";
import styled from "styled-components/native";
import {
  Animated,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const tabBarHeight = 75;

const Project = ({ image, title, author, text }) => {
  const cardWidth = useRef(new Animated.Value(315)).current;
  const cardHeight = useRef(new Animated.Value(460)).current;
  const titleTop = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const openCard = () => {
    Animated.spring(cardWidth, {
      toValue: screenWidth,
      useNativeDriver: false,
    }).start();
    Animated.spring(cardHeight, {
      toValue: screenHeight - tabBarHeight,
      useNativeDriver: false,
    }).start();
    Animated.spring(titleTop, {
      toValue: 45,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: false,
    }).start();

    StatusBar.setHidden(true);
  };

  closeCard = () => {
    Animated.spring(cardWidth, {
      toValue: 315,
      useNativeDriver: false,
    }).start();
    Animated.spring(cardHeight, {
      toValue: 460,
      useNativeDriver: false,
    }).start();
    Animated.spring(titleTop, {
      toValue: 20,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: 0,
      useNativeDriver: false,
    }).start();

    StatusBar.setHidden(false);
  };

  return (
    <TouchableWithoutFeedback onPress={openCard}>
      <AnimatedContainer style={{ width: cardWidth, height: cardHeight }}>
        <Cover>
          <Image source={image} />
          <AnimatedTitle style={{ top: titleTop }}>{title}</AnimatedTitle>
          <Author>by {author}</Author>
        </Cover>
        <Text>{text}</Text>
        <TouchableOpacity
          style={{ position: "absolute", top: 20, right: 20 }}
          onPress={this.closeCard}
        >
          <AnimatedCloseView style={{ opacity: opacity }}>
            <Ionicons name="close-sharp" size={32} color="#546bfb" />
          </AnimatedCloseView>
        </TouchableOpacity>
      </AnimatedContainer>
    </TouchableWithoutFeedback>
  );
};

export default Project;

const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

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

const AnimatedTitle = Animated.createAnimatedComponent(Title);

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

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);
