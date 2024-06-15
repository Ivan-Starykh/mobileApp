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
import { gql, useQuery } from "@apollo/client";

const CardsQuery = gql`
  query Cards {
    cards {
      caption
      title
      subtitle
      image {
        url
      }
      logo {
        url
      }
    }
  }
`;

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

// Helper function to fetch data using fetch API
const fetchCardsData = async () => {
  const response = await fetch(
    "https://eu-west-2.cdn.hygraph.com/content/clxdjm76700ky07w6opz5fvoi/master",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MTgzNzcwNjcsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2x4ZGptNzY3MDBreTA3dzZvcHo1ZnZvaS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiYWMzNDFlOGEtNTBhYy00MWJiLTlkN2QtMjY2OTcyOTM1MjJjIiwianRpIjoiY2x4ZXRjNzgyMnA1MzA4bDNkNTZpOXJ1diJ9.al568fRBmMmTySJ40mZS7eg24PLj_7B1RTgpsqoY2O09jFA_5ujX1XkLMva0IrT6bo1GmQSFoNVyFFoZnJtkhgLYqBV9WYcfiFTfIAD_ZrPNJyHKKw-76AQewly0hh5QVHIQSs4wamcYqn7972IMjyGiJgg8ixIdtYntEfJfFcKyLLfvd8hGLe6d0HjNNzuvEVMB6ItfK_EWmkybct7kS5GSAgP5HJKXr0Qjast07uJ3qv21f6gvZhZFUL6nAs_lxmD67yevLRWL28aSwd8IpH9Oed4I3c9qNWO0snO96vGhN7tvAEtNYAEw6xgfqDXkAod0nH5aUIv9mOU7aSktkDp9Qj43GLrovkmaavHgf8F442_vdxk8eKCDg0pgVqXfDrFV_YWPb_NJx-BytUShvOncN17otivWuyN2hmNDkOfY8W6ZftgXiae_7Od016GO1EqoHdr9sK7qhUcieHr7SLbb-q55WuDuP7LIA9IXFTD72myNTlipMvBEt4tSS07rFZMIMoKazHfqD6NHyXyf1kagKOkX03t1iK4IfLOAjUmnQlF7FCI-0QWjYKtKWvXyT2twzkDa1hx6ANY2b49GSHzwY3tt9pnMDkEMoclmHOD6pyQfrQdqpCXrFqD9C668fYjR4N1agvnOx1FwPTDcJEPh8zHPuasMUCdNpPHR8PI",
      },
      body: JSON.stringify({
        query: `
        query Cards {
          cards {
            caption
            title
            subtitle
            image {
              url
            }
            logo {
              url
            }
          }
        }
      `,
      }),
    },
  );
  const data = await response.json();
  console.log("Data received:", data);
  return data;
};

function HomeScreen(props) {
  const navigation = useNavigation();
  const [scale, setScale] = React.useState(new Animated.Value(1));
  const [opacity, setOpacity] = React.useState(new Animated.Value(1));
  const [cardsData, setCardsData] = React.useState(null);

  React.useEffect(() => {
    StatusBar.setBarStyle("dark-content", true);
  }, []);

  React.useEffect(() => {
    StatusBar.setBarStyle("dark-content", true);
    fetchCardsData().then(setCardsData);
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

  const { loading, error, data } = useQuery(CardsQuery);
  if (loading) console.log("Loading data...");
  if (error) console.log(`Error: ${error.message}`);
  if (data) console.log("Data received:", data);

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
              <CardsContainer>
                {!cardsData && <Message>Loading...</Message>}
                {cardsData && cardsData.errors && (
                  <Message>Error: {cardsData.errors[0].message}</Message>
                )}
                {cardsData &&
                  cardsData.data &&
                  cardsData.data.cards.map((card, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        navigation.push("Section", { section: card })
                      }
                    >
                      <Card
                        title={card.title}
                        image={{ uri: card.image.url }}
                        caption={card.caption}
                        logo={{ uri: card.logo.url }}
                        subtitle={card.subtitle}
                      />
                    </TouchableOpacity>
                  ))}
              </CardsContainer>
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

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;

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

const CardsContainer = styled.View`
  flex-direction: row;
`;

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
