import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CoursesScreen from "../screens/CoursesScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

const Tab = createBottomTabNavigator();

function TabNavigator({ navigation, route }) {
  React.useEffect(() => {
    const parent = navigation.getParent();
    if (parent) {
      parent.setOptions({
        tabBarStyle: {
          display: route.state && route.state.index === 1 ? "none" : "flex",
        },
      });
    }
  }, [navigation, route]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Courses") {
            iconName = "book";
          } else if (route.name === "Projects") {
            iconName = "briefcase";
          }

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={focused ? activeColor : inactiveColor}
            />
          );
        },
        tabBarLabel: route.name === "Home" ? "Home" : route.name,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
      })}
    >
      <Tab.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Courses"
        component={CoursesScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
