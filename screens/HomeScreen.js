import React from "react";
import styled from "styled-components/native";
import Card from "../components/Card";
import {
  Animated,
  Easing,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Course from "../components/Course";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import Avatar from "../components/Avatar";
import { useNavigation } from "@react-navigation/native";

function mapStateToProps(state) {
  return {
    action: state.action,
    name: state.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () => dispatch({ type: "OPEN_MENU" }),
  };
}

function HomeScreen(props) {
  const navigation = useNavigation();
  const [scale, setScale] = React.useState(new Animated.Value(1));
  const [opacity, setOpacity] = React.useState(new Animated.Value(1));

  React.useEffect(() => {
    StatusBar.setBarStyle("dark-content", true);
  }, []);

  React.useEffect(() => {
    toggleMenu();
  }, [props.action]);

  const toggleMenu = () => {
    if (props.action === "openMenu") {
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: true,
      }).start();
      Animated.spring(opacity, {
        toValue: 0.5,
        useNativeDriver: true,
      }).start();
      StatusBar.setBarStyle("light-content", true);
    }
    if (props.action === "closeMenu") {
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: true,
      }).start();
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      StatusBar.setBarStyle("dark-content", true);
    }
  };

  return (
    <RootView>
      <Menu />
      <AnimatedContainer style={{ transform: [{ scale }], opacity }}>
        <SafeAreaView>
          <ScrollView>
            <TitleBar>
              <TouchableOpacity
                onPress={props.openMenu}
                style={{ position: "absolute", top: 0, left: 0 }}
              >
                <Avatar />
              </TouchableOpacity>
              <Title>Welcome back,</Title>
              <Name>{props.name}</Name>
              <NotificationIcon
                style={{ position: "absolute", right: 20, top: 5 }}
              />
            </TitleBar>
            <ScrollView
              style={{
                flexDirection: "row",
                padding: 20,
                paddingLeft: 12,
                paddingTop: 30,
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {logos.map((logo, index) => (
                <Logo key={index} image={logo.image} text={logo.text} />
              ))}
            </ScrollView>
            <Subtitle>Continue Learning</Subtitle>
            <ScrollView
              horizontal={true}
              style={{ paddingBottom: 30 }}
              showsHorizontalScrollIndicator={false}
            >
              {cards.map((card, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.push("Section")}
                >
                  <Card
                    title={card.title}
                    image={card.image}
                    caption={card.caption}
                    logo={card.logo}
                    subtitle={card.subtitle}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Subtitle>Popular Course</Subtitle>
            {courses.map((course, index) => (
              <Course
                key={index}
                image={course.image}
                title={course.title}
                subtitle={course.subtitle}
                logo={course.logo}
                author={course.author}
                avatar={course.avatar}
                caption={course.caption}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </AnimatedContainer>
    </RootView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;
const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const logos = [
  {
    image: require("../assets/logo-framerx.png"),
    text: "Framer X",
  },
  {
    image: require("../assets/logo-figma.png"),
    text: "Figma",
  },
  {
    image: require("../assets/logo-studio.png"),
    text: "Studio",
  },
  {
    image: require("../assets/logo-react.png"),
    text: "React",
  },
  {
    image: require("../assets/logo-swift.png"),
    text: "Swift",
  },
  {
    image: require("../assets/logo-sketch.png"),
    text: "Sketch",
  },
];

const cards = [
  {
    title: "React Native for Designers",
    image: require("../assets/background11.jpg"),
    subtitle: "React Native",
    caption: "1 of 12 section",
    logo: require("../assets/logo-react.png"),
  },
  {
    title: "Styled Components",
    image: require("../assets/background12.jpg"),
    subtitle: "React Native",
    caption: "2 of 12 section",
    logo: require("../assets/logo-react.png"),
  },
  {
    title: "Props and Icons",
    image: require("../assets/background13.jpg"),
    subtitle: "React Native",
    caption: "3 of 12 section",
    logo: require("../assets/logo-react.png"),
  },
  {
    title: "Static Data and Loop",
    image: require("../assets/background14.jpg"),
    subtitle: "React Native",
    caption: "4 of 12 section",
    logo: require("../assets/logo-react.png"),
  },
];

const courses = [
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/background13.jpg"),
    logo: require("../assets/logo-studio.png"),
    author: "Ivan Starykh",
    avatar: require("../assets/avatar.jpg"),
    caption: "Design and interactive prototype",
  },
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/background14.jpg"),
    logo: require("../assets/logo-studio.png"),
    author: "Ivan Starykh",
    avatar: require("../assets/avatar.jpg"),
    caption: "Design and interactive prototype",
  },
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/background15.jpg"),
    logo: require("../assets/logo-studio.png"),
    author: "Ivan Starykh",
    avatar: require("../assets/avatar.jpg"),
    caption: "Design and interactive prototype",
  },
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/background16.jpg"),
    logo: require("../assets/logo-studio.png"),
    author: "Ivan Starykh",
    avatar: require("../assets/avatar.jpg"),
    caption: "Design and interactive prototype",
  },
];
