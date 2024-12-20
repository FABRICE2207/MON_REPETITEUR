import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import {Colors} from './../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native'

export default function Header() {

    const route = useRoute();

  return (
    <View>
        <View style={styles.header}>
            <View style={{top:"20%",left:"5%"}}>
                <TouchableOpacity
                onPress={() => route.back()}
                >
                    <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
            </View>

            <View style={{alignItems:"center"}}>
                {/* Icon bouton retour */}
                <Image source={require('./../assets/images/icon_mr.png')} 
                style={{
                    width:150,
                    height:150,
                }}
                />
            </View>
        </View>
    </View>
  )
}
