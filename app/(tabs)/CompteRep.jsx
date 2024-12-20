import { View, Text, TouchableOpacity, StyleSheet, Pressable, TouchableWithoutFeedback, FlatList, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import ContainerRep from '@/components/ContainerRep'
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from "expo-router";


export default function CompteRep() {

  const navigation = useNavigation();
  
  // Menu autres actions
  const Menu=[
    {
      id:1,
      name:'Mes informations',
      icon:'document-outline',
      path:'screen/InfosRepetiteur'
    },
    {
      id:2,
      name:'Nous contactez',
      icon:'call-outline',
      path:'/(tabs)/CompteRep'
    },
    {
      id:3,
      name:'Se deconnecter',
      icon:'log-out-outline',
      path:''
    }

  ]

  const router = useRouter();

  const [infosRep, setInfosRep] = useState("");
  const [infosPar, setInfosPar] = useState("");

  // Pour aller sur les différents page via compte
  const onPressMenu = (menu)=>{
    // Suppression du token après la déconnecion 
    if(menu.name=='Se deconnecter'){
      AsyncStorage.removeItem("tokenR");
      Alert.alert('Message', 'Vous êtes déconnecté')
    }
    router.push(menu.path)
  }


 // Chargement des données
 useFocusEffect(
  React.useCallback(() => {
   
    const fetchRep = async () => {
      try {
        // Récupere le token du répétietur connecté 
        const tokenR =  await AsyncStorage.getItem("tokenR");
        console.log(tokenR);

        // Récupere le token du Parent connecté 
        const tokenP =  await AsyncStorage.getItem("tokenP");
        console.log(tokenP);
        // console.log(`Bearer ${token}`);
        if(tokenR !== null){
          // Récupération des données
          const response = await axios.get('http://192.168.1.4:5000/api/getDataToken', {
            headers: {
              'Authorization': `Bearer ${tokenR}`,
              'Content-Type': 'application/json',
              }
            });
              console.log(response.data);
              setInfosRep(response.data);
        }
        // Récupere le token du parent connecté
         else if (tokenP !== null) {
            // Récupération des données
          const response = await axios.get('http://192.168.1.4:5000/api/getDataTokenParent', {
            headers: {
              'Authorization': `Bearer ${tokenP}`,
              'Content-Type': 'application/json',
              }
            });
              console.log(response.data);
              setInfosPar(response.data);
         } 
      } catch (error) {
        // Handle error
        console.error("Erreur dans la recupération des données :", error);
      } try {
        // Récupere le token du répétietur connecté 
        const tokenR =  await AsyncStorage.getItem("tokenR");
        console.log(tokenR);

        // Récupere le token du Parent connecté 
        const tokenP =  await AsyncStorage.getItem("tokenP");
        console.log(tokenP);
        // console.log(`Bearer ${token}`);
        if(tokenR !== null){
          // Récupération des données
          const response = await axios.get('http://192.168.1.4:5000/api/getDataToken', {
            headers: {
              'Authorization': `Bearer ${tokenR}`,
              'Content-Type': 'application/json',
              }
            });
              console.log(response.data);
              setInfosRep(response.data);
        }
        // Récupere le token du parent connecté
         else if (tokenP !== null) {
            // Récupération des données
          const response = await axios.get('http://192.168.1.4:5000/api/getDataTokenParent', {
            headers: {
              'Authorization': `Bearer ${tokenP}`,
              'Content-Type': 'application/json',
              }
            });
              console.log(response.data);
              setInfosPar(response.data);
         } 
      } catch (error) {
        // Handle error
        console.error("Erreur dans la recupération des données :", error);
      }
    };

    fetchRep();
  }, [])
);
  return (
    <View>
        <ContainerRep />

        {/* Container */}
        <View style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: "#fff",
          marginTop:-10,
          height: "100%",
        }}>

          <View style={{
            padding:'5%',
            gap:10
          }}>

            {/* Mes information */}
            <View>
              {/* Si image existe affiche sinon affiche icon */}
                 {
                  infosRep.image ? 
                    <Image
                    source={{uri: infosRep.image}}
                    style={{
                      marginTop:-10,
                      width: 100,
                      height: 100,
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 200,
                      alignSelf:'center'
                    }}
                  />
                  : 
                    <Ionicons name="person-circle" size={100} color="#eee" 
                      style={{
                        alignSelf:'center'
                      }}
                    />
                 }

              {/* Nom du repétiteur */}
              <Text style={{
                textAlign:'center',
                fontFamily:'MontserratBold',
                fontSize:16
              }}>
                {infosRep.nomcomplet}
                {infosPar.nomcomplet_parent}
              </Text>
            </View>


            <View style={{top:15}}>
              <Text style={{
                  fontFamily:'MontserratBold',
                  fontSize:13,
                  color:'#b0b0b0',
                  bottom:10
                }}>Autres actions
              </Text>
            </View>
            
            {/* Listes des menus compte */}
            <FlatList
              data={Menu}
              renderItem={({item,index})=>(
                <TouchableOpacity
                onPress={() => onPressMenu(item)} 
                key={item.id}
                style={{
                  display:'flex',
                  flexDirection:'row',
                  gap:10,
                  alignItems:'center',
                  paddingHorizontal:10,
                  paddingVertical:10,
                  borderWidth:1,
                  bottom:5,
                  borderRadius:10,
                  marginTop:5
                }}>
                  <Ionicons name={item?.icon} size={24} 
                  color="black"/>
                  <Text style={{fontFamily:'MontserratRegular'}}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

          </View>
      
        </View>
    </View>
  )
  }

const styles = StyleSheet.create({
  actions: {
    display:'flex',
    flexDirection:'row',
    gap:10,
    alignItems:'center',
    paddingHorizontal:10,
    paddingVertical:10,
    borderWidth:1,
    top:5,
    bottom:5,
    borderRadius:10,
  }
})