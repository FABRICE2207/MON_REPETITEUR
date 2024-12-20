import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {Colors} from './../../constants/Colors'
import { useNavigation } from 'expo-router'

export default function ScreenHome() {
    const navigation = useNavigation();

  return (
    <View>
         <View style={{backgroundColor:Colors.ORANGE}}>
            <View style={{alignItems:"center",marginTop:'8%'}}>
                {/* Icon bouton retour */}
                <Image source={require('./../../assets/images/icon_mr.png')} 
                style={{
                    top:10,
                    width:150,
                    height:150,
                }}
                />
            </View>
        </View>
        
      {/* Container */}
      <View style={styles.container}>
        <View style={{
            marginTop:'40%',
            padding:40
        }}>

            <Text style={{
                textAlign:'center', 
                fontFamily:'MontserratRegular', 
                fontSize:20
            }}>Etes-vous un </Text>

            {/* Btn répétiteur */}
            <TouchableOpacity 
            style={styles.btn}
            onPress={() => navigation.navigate('LoginRepetiteur')}
            >
                <Text style={{
                    color:'#fff',
                    textAlign:'center',
                    fontFamily:'MontserratBold',
                    fontSize:16
                }}
                >
                    Répétiteur
                </Text>
            </TouchableOpacity>

            <Text style={{
                textAlign:'center', 
                fontFamily:'MontserratRegular', 
                fontSize:20, 
                top:10
            }}>ou un</Text>

             {/* Btn Parent */}
             <TouchableOpacity style={styles.btn}
             onPress={() => navigation.navigate('LoginParent')}
             >
                <Text style={{
                    color:'#fff',
                    textAlign:'center',
                    fontFamily:'MontserratBold',
                    fontSize:16
                }}
                >
                    Parent
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles= StyleSheet.create({
    container:{
        marginTop:-10,
        backgroundColor:'#fff',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        height:'100%'
    },
    btn:{
        backgroundColor:Colors.ORANGE,
        paddingHorizontal:'25%',
        padding:15,
        borderRadius:20,
        marginTop:20
    }
})