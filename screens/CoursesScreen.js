import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SectionScreen from "../screens/SectionScreen";

const CoursesStack = createStackNavigator();

function CoursesScreen() {
  return (
    <CoursesStack.Navigator screenOptions={{ headerShown: false }}>
      <CoursesStack.Screen name="CoursesScreen" component={SectionScreen} />
    </CoursesStack.Navigator>
  );
}

export default CoursesScreen;
