import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {

    // Utilisation de google fonts
  const [loaded] = useFonts({
    MontserratBold: require('./../assets/fonts/Montserrat-ExtraBold.ttf'),
    MontserratRegular: require('./../assets/fonts/Montserrat-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index"/>
    </Stack>
  );
}
