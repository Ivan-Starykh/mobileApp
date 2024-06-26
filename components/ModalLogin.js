import React from "react";
import styled from "styled-components/native";
import {
  Alert,
  Animated,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import Success from "./Success";
import Loading from "./Loading";
import { connect } from "react-redux";
import { auth } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenHeight = Dimensions.get("window").height;

function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    closeLogin: () => dispatch({ type: "CLOSE_LOGIN" }),
    updateName: (name) =>
      dispatch({
        type: "UPDATE_NAME",
        name,
      }),
  };
}

class ModalLogin extends React.Component {
  state = {
    email: "",
    password: "",
    iconEmail: require("../assets/icon-email.png"),
    iconPassword: require("../assets/icon-password.png"),
    isSuccessful: false,
    isLoading: false,
    translateY: new Animated.Value(screenHeight),
    scale: new Animated.Value(1.3),
    translateYModal: new Animated.Value(0),
  };

  componentDidMount() {
    this.retrieveName();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.action === "openLogin") {
      Animated.timing(this.state.translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.spring(this.state.scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      Animated.timing(this.state.translateYModal, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    } else if (this.props.action === "closeLogin") {
      setTimeout(() => {
        Animated.timing(this.state.translateY, {
          toValue: screenHeight,
          duration: 300,
          useNativeDriver: true,
        }).start();
        Animated.spring(this.state.scale, {
          toValue: 1.3,
          useNativeDriver: true,
        }).start();
      }, 500);
      Animated.timing(this.state.translateYModal, {
        toValue: 1000,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }

  storeName = async (name) => {
    try {
      await AsyncStorage.setItem("name", name);
    } catch (error) {
      console.error("Error storing name:", error);
    }
  };

  retrieveName = async () => {
    try {
      const name = await AsyncStorage.getItem("name");
      if (name !== null) {
        console.log(name);
        this.props.updateName(name);
      }
    } catch (error) {
      console.error("Error retrieving name:", error);
    }
  };

  handleLogin = () => {
    this.setState({ isLoading: true });

    const email = this.state.email;
    const password = this.state.password;

    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        this.setState({ isLoading: false, isSuccessful: true });
        Alert.alert("Поздравляю", "Вы успешно вошли в систему");
        this.storeName(response.user.email);
        this.props.updateName(response.user.email);
        setTimeout(() => {
          this.props.closeLogin();
          this.setState({ isSuccessful: false });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        Alert.alert("Error", error.message);
      });
  };

  focusEmail = () => {
    this.setState({
      iconEmail: require("../assets/icon-email-animated.gif"),
      iconPassword: require("../assets/icon-password.png"),
    });
  };

  focusPassword = () => {
    this.setState({
      iconEmail: require("../assets/icon-email.png"),
      iconPassword: require("../assets/icon-password-animated.gif"),
    });
  };

  tapBackground = () => {
    Keyboard.dismiss();
    this.props.closeLogin();
  };

  render() {
    return (
      <AnimatedContainer
        style={{ transform: [{ translateY: this.state.translateY }] }}
      >
        <TouchableWithoutFeedback onPress={this.tapBackground}>
          <BlurView
            tint="default"
            intensity={100}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />
        </TouchableWithoutFeedback>
        <AnimatedModal
          style={{
            transform: [
              { scale: this.state.scale },
              { translateY: this.state.translateYModal },
            ],
          }}
        >
          <Logo source={require("../assets/logo.png")} />
          <Text>Start Learning. Access Pro Content.</Text>
          <TextInput
            onChangeText={(email) => this.setState({ email })}
            placeholder="Email"
            keyboardType="email-address"
            onFocus={this.focusEmail}
          />
          <TextInput
            onChangeText={(password) => this.setState({ password })}
            placeholder="Password"
            secureTextEntry={true}
            onFocus={this.focusPassword}
          />
          <IconEmail source={this.state.iconEmail} />
          <IconPassword source={this.state.iconPassword} />
          <TouchableOpacity onPress={this.handleLogin}>
            <Button>
              <ButtonText>Log In</ButtonText>
            </Button>
          </TouchableOpacity>
        </AnimatedModal>
        <Success isActive={this.state.isSuccessful} />
        <Loading isActive={this.state.isLoading} />
      </AnimatedContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin);

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Modal = styled.View`
  width: 335px;
  height: 370px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;

const AnimatedModal = Animated.createAnimatedComponent(Modal);

const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;

const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  text-align: center;
  color: #b8bece;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  padding-left: 44px;
`;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 179px;
  left: 31px;
`;

const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 239px;
  left: 35px;
`;

const Button = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px #c2cbff;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
`;
