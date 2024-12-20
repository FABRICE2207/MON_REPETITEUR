import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import {Colors} from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

export default function LoginParent() {

  const navigation = useNavigation();

  const [cpasswordR,setCPasswordR] = useState();
  // Les propriétés d'afficher et cacher les password
  const [showP, setShowP] = useState(false);
  const [visibleP, setVisibleP] = useState(true);
  // Les propriétés d'afficher et cacher les password confirmer
  const [showPC, setShowPC] = useState(false);
  const [visiblePC, setVisiblePC] = useState(true);

  return (
    <View>
        <View style={{backgroundColor:Colors.ORANGE}}>
            {/* Icon retour */}
            <View style={{top:"30%",left:"5%"}}>
                <TouchableOpacity
                onPress={() => navigation.navigate('ScreenHome')}
                >
                 <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
            </View>

            <View style={{alignItems:"center"}}>
                {/* Icon bouton retour */}
                <Image source={require('@/assets/images/icon_mr.png')} 
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
            marginTop:'30%',
            padding:15
        }}>

        {/* Formumaire de connexion */}
        <View>
            <Text style={{
                fontSize:18,
                fontFamily:'MontserratBold',
                textAlign:'center',
                bottom:"5%"
            }}>
                Mot de passe oublié
            </Text>

            <View>
                {/* Téléphone */}
                <Text  style={{fontFamily:'MontserratRegular',fontSize:16}}>Nouveau mot de passe</Text>
                <View style={styles.Input}>
                <Ionicons name="lock-closed-outline" size={25} color="black" />
                <TextInput
                value={cpasswordR}
                onChangeText={(cpasswordR) => {
                    setCPasswordR(cpasswordR);
                }}
                placeholder="Nouveau mot de passe"
                secureTextEntry={visiblePC}
                style={{
                    fontSize: 16,
                    fontFamily: "MontserratRegular",
                    left: 10,
                    width: "100%",
                }}
                 />
                 {/* Affiche et cacher le mdp */}
                 <TouchableOpacity
                    onPress={() => {
                        setVisibleP(!visibleP);
                        setShowP(!showP);
                    }}
                    style={{ right: 10 }}
                    >
                    <Ionicons
                        name={showP === false ? "eye-outline" : "eye-off-outline"}
                        size={25}
                        color="black"
                    />
                    </TouchableOpacity>
                </View>

                {/* Mot de passe */}
                <Text  style={{fontFamily:'MontserratRegular',fontSize:16}}>Mot de passe</Text>
                <View style={styles.Input}>
                    <Ionicons name="lock-closed-outline" size={25} color="black" />
                    <TextInput 
                     placeholder='Confirmation du mot de passe'
                     secureTextEntry={true}
                     style={{fontSize:16,fontFamily:'MontserratRegular',left:10,width:'100%'}}
                     />
                     {/* Affiche et cacher le mdp */}
                    <TouchableOpacity
                    onPress={() => {
                        setVisibleP(!visibleP);
                        setShowP(!showP);
                    }}
                    style={{ right: 10 }}
                    >
                    <Ionicons
                        name={showP === false ? "eye-outline" : "eye-off-outline"}
                        size={25}
                        color="black"
                    />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity 
            style={styles.btn}
            onPress={() => navigation.navigate('LoginRepetiteur')}
            >
                <Text style={{
                    color:'#fff',
                    fontFamily:'MontserratBold',
                    fontSize:16,
                    width:'100%',
                    textAlign:'center'
                }}
                >
                    Envoyer
                </Text>
            </TouchableOpacity>

            {/* Text en bas */}
            <View  style={{
                display:"flex", 
                flexDirection:"row", 
                justifyContent:"space-evenly",
                top:10
                }}>
                <Text>N’avez-vous pas un compte ?</Text>
                <TouchableOpacity
                onPress={() => 
                    navigation.navigate('SignUpParent')}
                >
                    <Text style={{
                            fontWeight:'bold',
                            fontSize:16,
                            color:Colors.ORANGE
                            }}>S'inscrire
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
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
  },
  Input:{
      display:"flex",
      flexDirection:"row",
      borderWidth:1,
      paddingTop:10,
      paddingLeft:10,
      paddingRight:50,
      paddingBottom:10,
      borderRadius:20,
      borderColor:Colors.ORANGE,
      marginTop:8,
      marginBottom:8
  }
})