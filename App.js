import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import TaskFromScreen from "./screens/TaskFromScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({navigation}) =>({
            title: 'Tasks App',
            headerStyle: { backgroundColor: "#222f3e" },
            headerTitleStyle: { color: "#ffffff" },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('TaskFromScreen')}>
                <Text style={{color:'#ffffff', marginRight: 20, fontSize: 15}}>Nuevo</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="TaskFromScreen" component={TaskFromScreen} 
        options={{
          title: 'Crea una nueva tarea',
          headerStyle: {
            backgroundColor: '#222f3e',
          },
          headerTitleStyle: {color: '#ffffff'},
          headerTintColor: '#ffffff',
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
