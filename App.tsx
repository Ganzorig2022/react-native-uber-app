import 'react-native-gesture-handler';
import { KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    //from REDUX
    <Provider store={store}>
      {/* from react-navigation npm */}
      <NavigationContainer>
        {/* from react-native-elements npm */}
        <SafeAreaProvider>
          {/*  */}
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
          >
            <Stack.Navigator
              screenOptions={{
                gestureEnabled: true,
                gestureDirection: 'horizontal',
              }}
            >
              <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{ headerShown: false, gestureDirection: 'horizontal' }}
              />
              <Stack.Screen
                name='MapScreen'
                component={MapScreen}
                options={{ headerShown: false, gestureDirection: 'horizontal' }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
