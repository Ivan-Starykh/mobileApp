import React from "react";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import { Animated, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

class Success extends React.Component {
  state = {
    translateY: new Animated.Value(screenHeight),
    opacity: new Animated.Value(0),
  };

  componentDidUpdate(prevProps) {
    if (this.props.isActive && !prevProps.isActive) {
      // Slide in and fade in animation
      Animated.timing(this.state.translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      this.animation.play();
    } else if (!this.props.isActive && prevProps.isActive) {
      // Slide out and fade out animation
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(this.state.translateY, {
          toValue: screenHeight,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  }

  render() {
    return (
      <AnimatedContainer
        style={{
          transform: [{ translateY: this.state.translateY }],
          opacity: this.state.opacity,
        }}
      >
        <SuccessView>
          <LottieView
            style={{ flex: 1 }}
            source={require("../assets/lottie-checked-done.json")}
            autoPlay={false}
            loop={false}
            ref={(animation) => {
              this.animation = animation;
            }}
          />
        </SuccessView>
      </AnimatedContainer>
    );
  }
}

export default Success;

const Container = styled.View`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const SuccessView = styled.View`
  height: 300px;
  aspect-ratio: 1;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
