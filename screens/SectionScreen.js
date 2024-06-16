import React, { useRef } from "react";
import styled from "styled-components/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Linking, ScrollView, StatusBar, TouchableOpacity } from "react-native";
import Markdown from "react-native-showdown";

const SectionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { section } = route.params;
  const webViewRef = useRef(null);

  const handleNavigationStateChange = (event) => {
    console.log(event);
    if (event.url !== "about:blank") {
      webViewRef.current.stopLoading();
      Linking.openURL(event.url);
    }
  };
  // useEffect(() => {
  //   StatusBar.setBarStyle("light-content", true);
  //
  //   return () => {
  //     StatusBar.setBarStyle("dark-content", true);
  //   };
  // }, []);

  return (
    <ScrollView>
      <Container>
        <StatusBar />
        <Cover>
          <Image source={section.image} />
          <Wrapper>
            <Logo source={section.logo} />
            <Subtitle>{section.subtitle}</Subtitle>
          </Wrapper>
          <Title>{section.title}</Title>
          <Caption>{section.caption}</Caption>
        </Cover>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ position: "absolute", top: 20, right: 20 }}
        >
          <CloseView>
            <Ionicons
              name="close-sharp"
              size={36}
              color="#4775f2"
              style={{ marginTop: -2, marginLeft: -2 }}
            />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {/*<WebView*/}
          {/*  ref={webViewRef}*/}
          {/*  source={{ html: section.content + htmlStyles }}*/}
          {/*  scalesPageToFit={false}*/}
          {/*  scrollEnabled={false}*/}
          {/*  onNavigationStateChange={handleNavigationStateChange}*/}
          {/*/>*/}
          <Markdown
            body={section.content}
            pureCSS={htmlStyles}
            scalesPageToFit={false}
            scrollEnabled={false}
          />
        </Content>
      </Container>
    </ScrollView>
  );
};

export default SectionScreen;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;

const Caption = styled.Text`
  font-size: 17px;
  color: white;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`;
const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;
const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;

const Content = styled.View`
  height: 1000px;
  padding: 20px;
`;

// const WebView = styled.View``;

const htmlContent = `
<h2>This is a title</h2>
<p>This <strong>is</strong> a <a href="https://innastarykh.ru">link </a></p>
<img src="https://drive.google.com/uc?export=download&id=1_SxOP3quf08sSu0JBigA4w_OUzifj1EN" alt="image"/>
`;

const htmlStyles = `
* {
font-family: -apple-system, Roboto, serif;
font-size: 17px;
margin: 0;
padding: 0;
font-weight: normal;
color: #3c4560;
line-height: 24px;
}

h2 {
font-size: 20px;
text-transform: uppercase;
font-weight: 600;
margin-top: 50px;
color: #b8bece;
}

p {
margin-top:20px;
}

a {
color: #4775f2;
font-weight: 600;
text-decoration: none;
}

strong {
font-weight: 700;
}

img{
width: 100%;
border-radius: 10px;
margin-top: 12px;
}

pre {
  padding: 20px;
  background: #212c4f;
  overflow: hidden;
  word-wrap: break-word;
  border-radius: 10px;
  margin-top: 20px
}

code {
  color: white;
}
`;
