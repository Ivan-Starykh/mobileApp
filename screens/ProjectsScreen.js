import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import Project from "../components/Project";
import { Animated, PanResponder } from "react-native";
import { connect } from "react-redux";

// Функция mapStateToProps для получения значения action из Redux state
function mapStateToProps(state) {
  return {
    action: state.action,
  };
}

// Функция, которая возвращает следующий индекс
function getNextIndex(index) {
  let nextIndex = index + 1;
  if (nextIndex >= projects.length) {
    return 0;
  }
  return nextIndex;
}

const ProjectScreen = ({ action }) => {
  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const translateY = useRef(new Animated.Value(44)).current;
  const thirdScale = useRef(new Animated.Value(0.8)).current;
  const thirdTranslateY = useRef(new Animated.Value(-50)).current;
  const [index, setIndex] = useState(0);
  const [panResponder, setPanResponder] = useState(null);

  useEffect(() => {
    const panResponderInstance = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        if (gestureState.dx === 0 && gestureState.dy === 0) {
          return false;
        } else {
          if (action === "openCard") {
            return false;
          } else {
            return true;
          }
        }
      },
      onPanResponderGrant: () => {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: false,
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
        Animated.spring(thirdScale, {
          toValue: 0.9,
          useNativeDriver: false,
        }).start();
        Animated.spring(thirdTranslateY, {
          toValue: 44,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        const positionY = pan.y.__getValue();
        if (positionY > 200) {
          Animated.timing(pan, {
            toValue: { x: 0, y: 1000 },
            useNativeDriver: false,
          }).start(() => {
            pan.setValue({ x: 0, y: 0 });
            scale.setValue(0.9);
            translateY.setValue(44);
            thirdScale.setValue(0.8);
            thirdTranslateY.setValue(-50);
            setIndex(getNextIndex(index));
          });
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
          Animated.spring(thirdScale, {
            toValue: 0.8,
            useNativeDriver: false,
          }).start();
          Animated.spring(thirdTranslateY, {
            toValue: -50,
            useNativeDriver: false,
          }).start();
        }
      },
    });

    setPanResponder(panResponderInstance);
  }, [action, pan, scale, translateY]);

  return (
    <Container>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...(panResponder ? panResponder.panHandlers : {})}
      >
        <Project
          title={projects[index].title}
          image={projects[index].image}
          author={projects[index].author}
          text={projects[index].text}
          canOpen={true}
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
          title={projects[getNextIndex(index)].title}
          image={projects[getNextIndex(index)].image}
          author={projects[getNextIndex(index)].author}
          text={projects[getNextIndex(index)].text}
          canOpen={false}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -3,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale: thirdScale }, { translateY: thirdTranslateY }],
        }}
      >
        <Project
          title={projects[getNextIndex(index + 1)].title}
          image={projects[getNextIndex(index + 1)].image}
          author={projects[getNextIndex(index + 1)].author}
          text={projects[getNextIndex(index + 1)].text}
          canOpen={false}
        />
      </Animated.View>
    </Container>
  );
};

export default connect(mapStateToProps)(ProjectScreen);

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
    text: "Thanks to me, I improved my design skill and learned to do animations for my app Price Tag, a top news app in Russia.",
  },
  {
    title: "The DM App - Ananoumous Chat",
    image: require("../assets/background6.jpg"),
    author: "Ivan Starykh",
    text: "It was the first resource I used when breaking into software. I went from knowing nothing about design or code to building a production ready app from scratch. ",
  },
  {
    title: "Finish",
    image: require("../assets/background7.jpg"),
    author: "Ivan Starykh",
    text: "Recently finished the React course by Ivan Starykh, and I 10/10 would recommend. I already rewrote my personal website in @reactjs and I'm very excited with it.",
  },
];
