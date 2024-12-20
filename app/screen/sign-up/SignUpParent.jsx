import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import {Colors} from './../../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import axios from 'axios';

export default function SignUpParent() {

  const navigation = useNavigation();

   // Les propriétés d'afficher et cacher les password
   const [showP, setShowP] = useState(false);
   const [visibleP, setVisibleP] = useState(true);
 
   // Les propriétés d'afficher et cacher les password confirmer
   const [showPC, setShowPC] = useState(false);
   const [visiblePC, setVisiblePC] = useState(true);

   // Les propriétés du parents    
   const [nomcomplet_parent, setNomcomplet_Parent] = useState("");
   const [telephone, setTelephone] = useState("");
   const [lieu, setLieu] = useState("");
   const [quartHab, setQuartHab] = useState("");
   const [password_hash, setPassword_hash] = useState("");
   const [passwordC, setPasswordC] = useState("");

   const [parents, setParents] = useState([]);


// En-Point(API) d'ajout du parent
const handleAjoutParent = async () => {

    // Formater en string
    data = {
        nomcomplet_parent: nomcomplet_parent.toString(),
        telephone: telephone.toString(),
        lieu: lieu.toString(),
        quartHab: quartHab.toString(),
        password_hash: password_hash.toString()
    }

    try{
        url = "http://192.168.1.4:5000/api/parents/create";
        await axios
          .post(url, data), {
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
        }
         // Affiche les informations dans la console
        console.log("Parent :", data);
        Alert.alert("message", 'Votre inscription a réussit.')
        setParents([...parents, data]);
        navigation.navigate('LoginParent')

    } 
    catch (error) {
        if (error.response) {
          // The server responded with a status code outside the 2xx range
          console.log("Réponse du serveur:", error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("Réponse de la requête:", error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.log("Message d'erreur:", error.message);
        }
    }
}


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
                <Image source={require('./../../../assets/images/icon_mr.png')} 
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
            marginTop:'5%',
            padding:15
        }}>

        {/* Formumaire de connexion */}
        <View>
            <Text style={{
                fontSize:18,
                fontFamily:'MontserratBold',
                textAlign:'center',
                bottom:10
            }}>
                Inscription du parent
            </Text>

            <ScrollView style={{height:'60%'}}>
                <View>
                    {/* Nom et Prénoms */}
                    <Text  style={{fontFamily:'MontserratRegular',fontSize:16}}>Nom et Prénoms</Text>
                    <View style={styles.Input}>
                        <Ionicons name="person-outline" size={25} color="black" />
                        <TextInput 
                        value={nomcomplet_parent}
                        onChangeText={(nomcomplet_parent) => {
                            setNomcomplet_Parent(nomcomplet_parent)
                        }}
                        placeholder='Nom et Prénoms'
                        style={{fontSize:16,fontFamily:'MontserratRegular',left:10,width:'100%'}}
                        />
                    </View>

                    {/* Téléphone */}
                    <Text  style={{fontFamily:'MontserratRegular',fontSize:16}}>Téléphone</Text>
                    <View style={styles.Input}>
                        <Ionicons name="call-outline" size={25} color="black" />
                        <TextInput
                        maxLength={10}
                        keyboardType="phone-pad"
                        value={telephone}
                        onChangeText={(telephone) => {
                            setTelephone(telephone)
                          }}
                        placeholder='Téléphone'
                        style={{fontSize:16,fontFamily:'MontserratRegular',left:10,width:'100%'}}
                        />
                    </View>

                    {/* Ville ou commune */}
                    <Text  style={{fontFamily:'MontserratRegular',fontSize:16}}>Ville ou commune</Text>
                    <View style={styles.Input}>
                        <Ionicons name="home-outline" size={25} color="black" />
                        <TextInput 
                        value={lieu}
                        onChangeText={(lieu) => {
                            setLieu(lieu)
                        }}
                        placeholder='Ville ou commune'
                        style={{fontSize:16,fontFamily:'MontserratRegular',left:10,width:'100%'}}
                        />
                    </View>

                    {/* Quartier d'habitation */}
                    <Text  style={{fontFamily:'MontserratRegular',fontSize:16}}>Quartier d'habitation</Text>
                    <View style={styles.Input}>
                        <Ionicons name="home-outline" size={25} color="black" />
                        <TextInput 
                        value={quartHab}
                        onChangeText={(quartHab) => {
                            setQuartHab(quartHab)
                        }}
                        placeholder="Quartier d'habitation"
                        style={{fontSize:16,fontFamily:'MontserratRegular',left:10,width:'100%'}}
                        />
                    </View>

                    {/* Mot de passe */}
                    <Text  style={{fontFamily:'MontserratRegular',fontSize:16}}>Mot de passe</Text>
                    <View style={styles.Input}>
                        <Ionicons name="lock-closed-outline" size={25} color="black" />
                        <TextInput
                        value={password_hash}
                        onChangeText={(password_hash) => {
                            setPassword_hash(password_hash);
                        // validatePassword(passwordR);
                        }}
                        placeholder='Mot de passe'
                        secureTextEntry={visibleP}
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

                    {/* Confirmation du mot de passe */}
                    <Text  style={{fontFamily:'MontserratRegular',fontSize:16}}>Confirmer du mot de passe</Text>
                    <View style={{
                        display:"flex",
                        flexDirection:"row",
                      //   borderWidth:1,
                        paddingTop:10,
                        paddingLeft:10,
                        paddingRight:50,
                        paddingBottom:10,
                        borderRadius:20,
                      //   borderColor:Colors.ORANGE,
                        marginTop:8,
                        marginBottom:'15%',
                        backgroundColor: "#eee"
                    }}>
                        <Ionicons name="lock-closed-outline" size={25} color="black" />
                        <TextInput
                        placeholder='Confirmer du mot de passe'
                        value={passwordC}
                        onChangeText={(passwordC) => {
                            setPasswordC(passwordC);
                          }}
                        secureTextEntry={visiblePC}
                        style={{fontSize:16,fontFamily:'MontserratRegular',left:10,width:'100%'}}
                        />
                        {/* Affiche et cacher le mdp */}
                        <TouchableOpacity
                        onPress={() => {
                            setVisiblePC(!visiblePC);
                            setShowPC(!showPC);
                        }}
                        style={{ right: 10 }}
                        >
                        <Ionicons
                            name={showPC === false ? "eye-outline" : "eye-off-outline"}
                            size={25}
                            color="black"
                        />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity 
            style={styles.btn}
            onPress={() => {
                // Si tout les champs sont vides
                if(!nomcomplet_parent || !telephone || !password_hash || !passwordC){
                    Alert.alert('Message', 'Veuillez renseigner les champs svp.')
                } 
                else if (!password_hash || !passwordC || password_hash.valueOf() !== passwordC.valueOf()) {
                    Alert.alert("Message", "Les mots de passe sont vide ou ne sont pas identiques")
                  }
                else {
                    handleAjoutParent();
                    }
            }}
            >
                <Text style={{
                    color:'#fff',
                    textAlign:'center',
                    fontFamily:'MontserratBold',
                    fontSize:16
                }}
                >
                    S'inscrire
                </Text>
            </TouchableOpacity>

            {/* Text en bas */}
            <View  style={{
                display:"flex", 
                flexDirection:"row", 
                justifyContent:"space-evenly",
                top:"-3%"
                }}>
                <Text>N’avez-vous pas un compte ?</Text>
                <TouchableOpacity
                onPress={() => 
                    navigation.navigate('LoginParent')}
                >
                    <Text style={{
                            fontWeight:'bold',
                            fontSize:16,
                            color:Colors.ORANGE
                            }}>Se connecter
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
      top:"-3%",
      backgroundColor:Colors.ORANGE,
      paddingHorizontal:'25%',
      padding:15,
      borderRadius:20,
      marginTop:20
  },
  Input:{
      display:"flex",
      flexDirection:"row",
    //   borderWidth:1,
      paddingTop:10,
      paddingLeft:10,
      paddingRight:50,
      paddingBottom:10,
      borderRadius:20,
    //   borderColor:Colors.ORANGE,
      marginTop:8,
      marginBottom:8,
      backgroundColor: "#eee"
  }
})