import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import SectionScreen from "../screens/SectionScreen";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      >
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Section" component={SectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
