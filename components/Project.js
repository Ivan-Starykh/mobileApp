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
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

// Функция mapStateToProps для получения значения action из Redux state
function mapStateToProps(state) {
  return { action: state.action };
}

// Функция mapDispatchToProps для отправки action в Redux store
function mapDispatchToProps(dispatch) {
  return {
    openCard: () => dispatch({ type: "OPEN_CARD" }),
    closeCard: () => dispatch({ type: "CLOSE_CARD" }),
  };
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const tabBarHeight = 75;

const Project = ({
  image,
  title,
  author,
  text,
  canOpen,
  openCard,
  closeCard,
}) => {
  const cardWidth = useRef(new Animated.Value(315)).current;
  const cardHeight = useRef(new Animated.Value(460)).current;
  const titleTop = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const textHeight = useRef(new Animated.Value(100)).current;

  const handleOpenCard = () => {
    if (!canOpen) return;
    Animated.spring(cardWidth, {
      toValue: screenWidth,
      useNativeDriver: false,
    }).start();
    Animated.spring(cardHeight, {
      toValue: screenHeight - tabBarHeight,
      useNativeDriver: false,
    }).start();
    Animated.spring(titleTop, { toValue: 45, useNativeDriver: false }).start();
    Animated.timing(opacity, { toValue: 1, useNativeDriver: false }).start();
    Animated.spring(textHeight, {
      toValue: 1000,
      useNativeDriver: false,
    }).start();
    StatusBar.setHidden(true);
    openCard(); // Вызов функции openCard из пропсов
  };

  const handleCloseCard = () => {
    Animated.spring(cardWidth, {
      toValue: 315,
      useNativeDriver: false,
    }).start();
    Animated.spring(cardHeight, {
      toValue: 460,
      useNativeDriver: false,
    }).start();
    Animated.spring(titleTop, { toValue: 20, useNativeDriver: false }).start();
    Animated.timing(opacity, { toValue: 0, useNativeDriver: false }).start();
    Animated.spring(textHeight, {
      toValue: 100,
      useNativeDriver: false,
    }).start();
    StatusBar.setHidden(false);
    closeCard(); // Вызов функции closeCard из пропсов
  };

  return (
    <TouchableWithoutFeedback onPress={handleOpenCard}>
      <AnimatedContainer style={{ width: cardWidth, height: cardHeight }}>
        <Cover>
          <Image source={image} />
          <AnimatedTitle style={{ top: titleTop }}>{title}</AnimatedTitle>
          <Author>by {author}</Author>
        </Cover>
        <AnimatedText style={{ height: textHeight }}>{text}</AnimatedText>
        <AnimatedLinearGradient
          colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
          style={{
            position: "absolute",
            top: 330,
            width: "100%",
            height: textHeight,
          }}
        />
        <TouchableOpacity
          style={{ position: "absolute", top: 20, right: 20 }}
          onPress={handleCloseCard}
        >
          <AnimatedCloseView style={{ opacity: opacity }}>
            <Ionicons name="close-sharp" size={32} color="#546bfb" />
          </AnimatedCloseView>
        </TouchableOpacity>
      </AnimatedContainer>
    </TouchableWithoutFeedback>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);

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

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

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
