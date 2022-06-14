import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import CreateUserScreen from './screens/CreateUserScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import UserList from './screens/UserList';

const Stack = createStackNavigator()

const MyStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="User List" component={UserList} />
      <Stack.Screen name="Create User" component={CreateUserScreen} />
      <Stack.Screen name="User Detail" component={UserDetailScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}


