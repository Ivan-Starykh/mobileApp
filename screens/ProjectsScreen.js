import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SectionScreen from "../screens/SectionScreen";

const ProjectsStack = createStackNavigator();

function ProjectsScreen() {
  return (
    <ProjectsStack.Navigator screenOptions={{ headerShown: false }}>
      <ProjectsStack.Screen name="ProjectsScreen" component={SectionScreen} />
    </ProjectsStack.Navigator>
  );
}

export default ProjectsScreen;
