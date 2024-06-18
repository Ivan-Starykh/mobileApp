import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import Project from "../components/Project";
import { Animated, PanResponder } from "react-native";

const ProjectScreen = () => {
  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const translateY = useRef(new Animated.Value(44)).current;

  const [panResponder, setPanResponder] = useState(null);

  useEffect(() => {
    const panResponderInstance = PanResponder.create({
      onPanResponderGrant: () => {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: false,
        }).start();
      },
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        const positionY = pan.y.__getValue();
        if (positionY > 200) {
          Animated.timing(pan, {
            toValue: { x: pan.x, y: 1000 },
            useNativeDriver: false,
          }).start();
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
          Animated.spring(scale, {
            toValue: 0.9,
            useNativeDriver: false,
          }).start();
          Animated.spring(translateY, {
            toValue: 44,
            useNativeDriver: false,
          }).start();
        }
      },
    });

    setPanResponder(panResponderInstance);
  }, [pan, scale, translateY]);

  return (
    <Container>
      <Animated.View
        style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }] }}
        {...(panResponder ? panResponder.panHandlers : {})}
      >
        <Project
          title="Price Tag"
          image={require("../assets/background5.jpg")}
          author="Ivan Starykh"
          text="Здесь может быть любой текст, какой только захочешь. Но сейчас это статические данные"
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale: scale }, { translateY: translateY }],
        }}
      >
        <Project
          title={projects[1].title}
          image={projects[1].image}
          author={projects[1].author}
          text={projects[1].text}
        />
      </Animated.View>
    </Container>
  );
};

export default ProjectScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f0f3f5;
`;

const Text = styled.Text`
  font-size: 20px;
`;

const projects = [
  {
    title: "Price Tag",
    image: require("../assets/background5.jpg"),
    author: "Ivan Starykh",
    text: "Thanks to Design+Code, I improved my design skill and learned to do animations for my app Price Tag, a top news app in China.",
  },
  {
    title: "The DM App - Ananoumous Chat",
    image: require("../assets/background6.jpg"),
    author: "Ivan Starykh",
    text: "Design+Code was the first resource I used when breaking into software. I went from knowing nothing about design or code to building a production ready app from scratch. ",
  },
  {
    title: "Finish",
    image: require("../assets/background7.jpg"),
    author: "Ivan Starykh",
    text: "Recently finished the React course by Ivan Starykh, and I 10/10 would recommend. I already rewrote my personal website in @reactjs and I'm very excited with it.",
  },
];
