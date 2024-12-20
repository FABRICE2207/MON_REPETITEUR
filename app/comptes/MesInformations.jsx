import { View, Text , Link } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

export default function MesInformations() {

  const navigation = useNavigation();

  return (
    <View style={{backgroundColor:'white', height:'100%'}}>
      
      <Link href="CompteRep">
        <View style={{
          padding:20,
          top:20
        }}>  
          <Ionicons name="arrow-back" size={28} color="black" />
        </View>
      </Link>
    </View>
  )
}