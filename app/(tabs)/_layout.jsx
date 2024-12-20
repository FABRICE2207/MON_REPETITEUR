import { View, Text, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Tabs } from 'expo-router'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import RepetiteurList from './RepetiteurList';
import CompteRep from './CompteRep';
import ParentsList from './ParentList'
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default function _layout() {

  const route = useRoute();

  const {nomcomplet} = route.params;
  // // const {email} = route.params;
  // const {nomcomplet} = route.params;

  const [tokenR, setTokenR] = useState("");

  const [tokenP, setTokenP] = useState("");

  // Récuperer le token après la connexion du repétiteur
  const getDataR = async () => {
    const getTokenR =  await AsyncStorage.getItem("tokenR");
    console.log("TOKEN", getTokenR);

    setTokenR(getTokenR);
  }

  // Récuperer le token après la connexion du Parent
  const getDataP = async () => {
    const getTokenP =  await AsyncStorage.getItem("tokenP");
    console.log("TOKEN", getTokenP);
  
    setTokenP(getTokenP);
  }

  // Chargement du token
  useEffect(() =>{
    getDataR();
    getDataP();
  }, []);


   // Chargement des données
//  useFocusEffect(
//   React.useCallback(() => {
   
//     const fetchRep = async () => {
//       try {
//         // Récupere le token du répétietur connecté 
//         const tokenR =  await AsyncStorage.getItem("tokenR");
//         console.log(tokenR);

//         // Récupere le token du Parent connecté 
//         const tokenP =  await AsyncStorage.getItem("tokenP");
//         console.log(tokenP);

//         // console.log(`Bearer ${token}`);
//         if(tokenR !== null){
//           // Récupération des données
//           const response = await axios.get('http://192.168.1.10:5000/api/getDataToken', {
//             headers: {
//               'Authorization': `Bearer ${tokenR}`,
//               'Content-Type': 'application/json',
//               }
//             });
//               console.log(response.data);
//               setInfosRep(response.data);
//         }

//         // Récupere le token du parent connecté
//         else if (tokenP !== null) {
//             // Récupération des données
//           const response = await axios.get('http://192.168.1.10:5000/api/getDataTokenParent', {
//             headers: {
//               'Authorization': `Bearer ${tokenP}`,
//               'Content-Type': 'application/json',
//               }
//             });
//               console.log(response.data);
//               setInfosPar(response.data);
//          } 
//       } catch (error) {
//         // Handle error
//         console.error("Erreur dans la recupération des données :", error);
//       }
//     };

//     fetchRep();
//   }, [])
// );


  // Tabs menu
  return (
    <NavigationContainer independent={true} tabBarStyle={{
      backgroundColor:"#fff"
    }}>
    <Tab.Navigator screenOptions = {{ 
      headerShown: false ,
      tabBarActiveTintColor: '#FFF',
      tabBarInactiveTintColor: 'black',
      tabBarActiveBackgroundColor:'#ff7f0a',
      tabBarStyle: {
      // tabBarActiveTintColor:'black',
      backgroundColor:'#fff',
      marginHorizontal:5,
      marginVertical:5,
      borderRadius:10
    },
      }}>
      <Tab.Screen options={{
        tabBarIcon: ({ color, size }) => (
            <Ionicons name="school" color={color} size={size} />
          ),
        }}
        name="Repetiteurs" component={RepetiteurList} 
      />

      <Tab.Screen options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="group" size={size} color={color} />
          ),
        }}
        name="Parents" component={ParentsList}
      />
        
      <Tab.Screen options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-circle" color={color} size={size} />
        ),
      }}
      name="Compte" component={CompteRep} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}