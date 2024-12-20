import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Colors } from "./../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginRepetiteur() {
  const navigation = useNavigation();
  const [contactWhats, setContactWhats] = useState("");
  const [passwordR, setPasswordR] = useState("");

  // Les propriétés d'afficher et cacher les password
  const [showP, setShowP] = useState(false);
  const [visibleP, setVisibleP] = useState(true);

  const [repetiteur, setRepetiteur] = [];

  const [repData, setRepData] = useState("");


  const [token, setTokenR] = useState("");

  // API de login du répétiteur
  const handleLogin = async () => {

    // Les infos du login
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
        // console.log(response.data);
        if (response.status == 201) {
          // AsyncStorage.setItem("token", JSON.stringify(response.data)).then(
          //   (res) => {
          //     console.log("INFOS DU REPETITEUR :", response.data);
          //     // Après la connexion, direction sur la liste des répétiteurs
          //     navigation.navigate("_Layout", {
          //       screen: "RepetiteurList",
          //       params: {
          //         "nomcomplet": response.data.nomcomplet
          //       }
          //     });
          //     // Vider les champs
          //     setContactWhats("");
          //     setPasswordR("");
          //     setRepData(response.data.data);
          //   }
          // );
            // Récupere depuis l'API
            AsyncStorage.setItem('tokenR', response.data.token.access);
            setTokenR(response.data.token)            
            navigation.navigate("_Layout", {
                screen: "RepetiteurList",
                // params: {
                //   "nomcomplet": response.data.nomcomplet
                // }
              });
            // Vider les champs
            setContactWhats("");
            setPasswordR("");
            // setRepData(response.data.data);
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


  return (
    <View>
      <View style={{ backgroundColor: Colors.ORANGE }}>
        {/* Icon retour */}
        <View style={{ top: "30%", left: "5%" }}>
          <TouchableOpacity onPress={() => navigation.navigate("ScreenHome")}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center" }}>
          {/* Icon bouton retour */}
          <Image
            source={require("./../../../assets/images/icon_mr.png")}
            style={{
              top: 10,
              width: 150,
              height: 150,
            }}
          />
        </View>
      </View>

      {/* Container */}
      <View style={styles.container}>
        <View
          style={{
            marginTop: "30%",
            padding: 15,
          }}
        >
          {/* Formumaire de connexion */}
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "MontserratBold",
                textAlign: "center",
                bottom: "5%",
              }}
            >
              Connexion du répétiteur
            </Text>

            <View>
              {/* Téléphone */}
              <Text style={{ fontFamily: "MontserratRegular", fontSize: 16 }}>
                Téléphone
              </Text>
              <View style={styles.Input}>
                <Ionicons name="call-outline" size={25} color="black" />
                <TextInput
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={contactWhats}
                  onChangeText={(contactWhats) => {
                    setContactWhats(contactWhats);
                  }}
                  placeholder="Téléphone whatsApp"
                  style={{
                    fontSize: 16,
                    fontFamily: "MontserratRegular",
                    left: 10,
                    width: "100%",
                  }}
                />
              </View>

              {/* Mot de passe */}
              <Text style={{ fontFamily: "MontserratRegular", fontSize: 16 }}>
                Mot de passe
              </Text>
              <View style={styles.Input}>
                <Ionicons name="lock-closed-outline" size={25} color="black" />
                <TextInput
                  value={passwordR}
                  onChangeText={(passwordR) => {
                    setPasswordR(passwordR);
                  }}
                  placeholder="Mot de passe"
                  secureTextEntry={visibleP}
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

              {/* Mot de passe oublié */}
              <TouchableOpacity
                onPress={() => navigation.navigate("PasswordForget")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    textAlign: "right",
                    color: Colors.ORANGE,
                  }}
                >
                  Mot de passe oublié
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (!contactWhats || !passwordR) {
                  Alert.alert(
                    "Message",
                    "Le numéro de téléphone ou le mot de passe n'existe pas."
                  );
                } else if (contactWhats.length < 10) {
                  Alert.alert(
                    "Message",
                    "Le contact doit contenir 10 chiffres"
                  );
                } else if (passwordR.length < 8) {
                  Alert.alert(
                    "Message",
                    "Le mot de passe doit contenir 8 caractères."
                  );
                } else {
                  handleLogin();
                }
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontFamily: "MontserratBold",
                  fontSize: 16,
                }}
              >
                Se connecter
              </Text>
            </TouchableOpacity>

            {/* Text en bas */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                top: 10,
              }}
            >
              <Text>N’avez-vous pas un compte ?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUpRepeptiteur")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    color: Colors.ORANGE,
                  }}
                >
                  S'inscrire
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
    backgroundColor: Colors.ORANGE,
    paddingHorizontal: "25%",
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
  },
  Input: {
    display: "flex",
    flexDirection: "row",
    // borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 50,
    paddingBottom: 10,
    borderRadius: 20,
    // borderColor: Colors.ORANGE,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#eee"
  },
});
