import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenHome from './screen/ScreenHome'
import LoginRepetiteur from './screen/sigin-in/LoginRepetiteur'
import LoginParent from './screen/sigin-in/LoginParent'
import SignUpRepeptiteur from './screen/sign-up/SignUpRepeptiteur'
import SignUpParent from './screen/sign-up/SignUpParent'
import PasswordForget from './screen/PasswordForget'
import InfosRepetiteur from './screen/InfosRepetiteur'
import DetailsRepetiteur from './screen/DetailsRepetiteur'
import _Layout from './(tabs)/_layout'
import MesInformations from './comptes/MesInformations'

const Stack = createNativeStackNavigator();

export default function Index() {
  // Les différentes interfaces
  return (
       <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions = {{ headerShown: false }}>
        <Stack.Screen name="ScreenHome" component={ScreenHome}/>
        <Stack.Screen name="LoginRepetiteur" component={LoginRepetiteur}/>
        <Stack.Screen name="SignUpRepeptiteur" component={SignUpRepeptiteur}/>
        <Stack.Screen name="SignUpParent" component={SignUpParent}/>
        <Stack.Screen name="InfosRepetiteur" component={InfosRepetiteur}/>
        <Stack.Screen name="LoginParent" component={LoginParent}/>
        <Stack.Screen name="PasswordForget" component={PasswordForget}/>
        <Stack.Screen name="_Layout" component={_Layout}/>
        <Stack.Screen name="MesInformations" component={MesInformations}/>
        <Stack.Screen name="DetailsRepetiteur" component={DetailsRepetiteur}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}
