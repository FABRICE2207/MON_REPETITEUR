import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import axios from "axios";
import { AuthContext } from "@/content/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function LoginRepetiteur() {
  const navigation = useNavigation();

  const [infosRep, setInfosRep] = useState("");
  const [infosPar, setInfosPar] = useState("");

  // Les propriétés d'afficher et cacher les password
  const [showP, setShowP] = useState(false);
  const [visibleP, setVisibleP] = useState(true);

  const [repetiteur, setRepetiteur] = [];

  // API de login du répétiteur
  const handleLogin = async () => {
    // data = {
    //     contactWhats: contactWhats.toString(),
    //     passwordR: passwordR.toString()
    // }

    var data = JSON.stringify({
      contactWhats: contactWhats,
      passwordR: passwordR,
    });

    // Controle sur les champs

    try {
      const url = "http://192.168.1.4:5000/api/login/repetiteur";

      axios({
        method: "post",
        url: url,
        headers: {
          "Content-Type": "application/json",
        },

        data: data,
      }).then((response) => {
        if (response.status == 201) {
          AsyncStorage.setItem("token", JSON.stringify(response.data)).then(
            (res) => {
              console.log("first", response);
              navigation.navigate("_Layout", {
                screen: "RepetiteurList",
              });
              // Vider les champs
              setContactWhats("");
              setPasswordR("");
            }
          );
        } else {
          Alert.alert(
            "Message",
            "Le numéro de téléphone ou le mot de passe n'existe pas."
          );
        }
      });
    } catch (error) {
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
  };

  // Chargement des données
  useFocusEffect(
    React.useCallback(() => {
      const fetchRep = async () => {
        try {
          // Récupere le token du répétietur connecté
          const tokenR = await AsyncStorage.getItem("tokenR");
          console.log(tokenR);

          // Récupere le token du répétietur connecté
          const tokenP = await AsyncStorage.getItem("tokenP");
          console.log(tokenP);

          console.log(`Bearer ${tokenR}`);

          if (tokenR !== null) {
            // Récupération des données
            const response = await axios.get(
              "http://192.168.1.4:5000/api/getDataToken",
              {
                headers: {
                  Authorization: `Bearer ${tokenR}`,
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(response.data);
            setInfosRep(response.data);
          }

          // Récupere le token du parent connecté
          else if (tokenP !== null) {
            // Récupération des données
            const response = await axios.get(
              "http://192.168.1.4:5000/api/getDataTokenParent",
              {
                headers: {
                  Authorization: `Bearer ${tokenP}`,
                  "Content-Type": "application/json",
                },
              }
            );
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
      <View style={{ backgroundColor: Colors.ORANGE }}>
        {/* Icon retour */}
        <View style={{ marginTop: "10%", left: "5%" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 25,
              color: "white",
              fontSize: 18,
              fontFamily: "MontserratBold",
            }}
          >
            Mes informations
          </Text>
        </View>
      </View>

      {/* Container */}
      <View style={styles.container}>
        <View
          style={{
            marginTop: "5%",
            padding: 15,
            fontFamily: "MontserratRegular",
          }}
        >
          <ScrollView style={{height:'65%'}}>
            {/* Formumaire de connexion */}
            <View>
              <View>
                {/* Nom complet */}
                <Text style={{ fontFamily: "MontserratRegular", fontSize: 16 }}>
                  Nom complet
                </Text>
                <View style={styles.Input}>
                  <Ionicons name="person-outline" size={25} color="black" />
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "MontserratRegular",
                      left: 10,
                      width: "100%",
                    }}
                  >
                    {infosRep.nomcomplet}
                    {infosPar.nomcomplet_parent}
                  </Text>
                </View>

                {/* Téléphone */}
                <Text style={{ fontFamily: "MontserratRegular", fontSize: 16 }}>
                  Téléphone
                </Text>
                <View style={styles.Input}>
                  <Ionicons name="call-outline" size={25} color="black" />
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "MontserratRegular",
                      left: 10,
                      width: "100%",
                    }}
                  >
                    {infosRep.contactWhats}

                    {infosPar.telephone}
                  </Text>
                </View>

                {/* Gmail */}
                {/* Si infos repetiteur existe Affiche email sinon rien */}
                {infosRep.email ? (
                  <View>
                    <Text
                      style={{ fontFamily: "MontserratRegular", fontSize: 16 }}
                    >
                      Gmail
                    </Text>
                    <View style={styles.Input}>
                      <Ionicons name="mail-outline" size={25} color="black" />
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "MontserratRegular",
                          left: 10,
                          width: "100%",
                        }}
                      >
                        {infosRep.email}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {/* Ville ou commune répétiteur*/}
                {infosRep.lieu || infosPar.lieu ? (
                  <View>
                    <Text
                      style={{ fontFamily: "MontserratRegular", fontSize: 16 }}
                    >
                      Ville ou Commune
                    </Text>
                    <View style={styles.Input}>
                      <Ionicons name="home-outline" size={25} color="black" />
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "MontserratRegular",
                          left: 10,
                          width: "100%",
                        }}
                      >
                        {infosRep.lieu}
                        {infosPar.lieu}
                      </Text>
                    </View>
                  </View>
                ) : null}
                {/* Quartier d'habitation*/}
                {infosRep.quartHab || infosPar.quartHab ? (
                  <View>
                    <Text
                      style={{ fontFamily: "MontserratRegular", fontSize: 16 }}
                    >
                      Quartier d'habitation
                    </Text>
                    <View style={styles.Input}>
                      <Ionicons name="home-outline" size={25} color="black" />
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "MontserratRegular",
                          left: 10,
                          width: "100%",
                        }}
                      >
                        {infosRep.quartHab}

                        {infosPar.quartHab}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {/* Enseignement primaire*/}
                {infosRep.classPrim ? (
                  <View>
                    <Text
                      style={{ fontFamily: "MontserratRegular", fontSize: 16 }}
                    >
                      Classe primaire
                    </Text>
                    <View style={styles.Input}>
                      <Ionicons name="school-outline" size={25} color="black" />
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "MontserratRegular",
                          left: 10,
                          width: "100%",
                        }}
                      >
                        {infosRep.classPrim}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {/* Enseignement secondaire */}
                {infosRep.classSecond ? (
                  <View>
                    <Text
                      style={{ fontFamily: "MontserratRegular", fontSize: 16 }}
                    >
                      Classe sécondaire
                    </Text>
                    <View style={styles.Input}>
                      <Ionicons name="school-outline" size={25} color="black" />
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "MontserratRegular",
                          left: 10,
                          width: "100%",
                        }}
                      >
                        {infosRep.classSecond}
                      </Text>
                    </View>
                  </View>
                ) : null}

                <View style={{
                  display:'flex',
                  flexDirection:'row',
                }}>

                   {/* Année d'expérience */}
                  <View>
                  {infosRep.annExp ? (
                  <View>
                    <Text
                      style={{ fontFamily: "MontserratRegular", fontSize: 16 }}
                    >
                     Année d'expérience
                    </Text>
                    <View style={{
                       display: "flex",
                       flexDirection: "row",
                       paddingTop: 10,
                       paddingLeft: 10,
                       paddingBottom: 10,
                       width:'65%',
                       borderRadius: 20,
                       marginTop: 8,
                       marginBottom: 8,
                       backgroundColor: "#eee",
                    }}>
                      <Ionicons name="trending-up-outline" size={25} color="black" />
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "MontserratRegular",
                          left: 10,
                          width: "100%",
                        }}
                      >
                        {infosRep.annExp} ans
                      </Text>
                    </View>
                  </View>
                ) : null}
                  </View>

                    {/* Niveau d'étude */}
                    <View>
                  {infosRep.nivEtud ? (
                  <View>
                    <Text
                      style={{ fontFamily: "MontserratRegular", fontSize: 16, left:-70 }}
                    >
                     Niveau d'étude
                    </Text>
                    <View style={{
                       display: "flex",
                       flexDirection: "row",
                       paddingTop: 10,
                       paddingLeft: 10,
                       left:-70,
                       paddingRight: 50,
                       paddingBottom: 10,
                       width:'65%',
                       borderRadius: 20,
                       marginTop: 8,
                       marginBottom: 8,
                       backgroundColor: "#eee",
                    }}>
                      <Ionicons name="document-outline" size={25} color="black" />
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "MontserratRegular",
                          left: 10,
                          width: "100%",
                        }}
                      >
                        {infosRep.nivEtud}
                      </Text>
                    </View>
                  </View>
                ) : null}
                  </View>

                {/* Etude */}
              
                </View>

              </View>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.btn}>
                <Text
                  style={{
                    color: "#bebebe",
                    textAlign: "center",
                    fontFamily: "MontserratBold",
                    fontSize: 16,
                  }}
                >
                  Modifier
                </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "100%",
  },
  btn: {
    backgroundColor: "#eee",
    paddingHorizontal: "25%",
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    bottom:10
  },
  Input: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 50,
    paddingBottom: 10,
    borderRadius: 20,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#eee",
  },
});
