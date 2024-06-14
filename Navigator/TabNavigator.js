import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CoursesScreen from "../screens/CoursesScreen";
import ProjectsScreen from "../screens/ProjectsScreen";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="CoursesTab" component={CoursesScreen} />
      <Tab.Screen name="ProjectsTab" component={ProjectsScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
