import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "./../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import Form from "./../../../components/Form";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

export default function SignUpRepeptiteur() {
  const navigation = useNavigation();

  // // Les champs première étape
  // const [step1Data, setStep1Date] = useState({nom_complet:'', telephone:'', email:'', ville_commune:''});
  // // Les champs deuxième étape
  // const [step2Data, setStep2Date] = useState({photo:'', cv:'', class_prim_1:'', class_prim_2:'', class_second_1:'', class_second_2:''});
  // // Les champs troisième étape
  // const [step3Data, setStep3Date] = useState({password_rep:'', confirm_password_rep:''});



  return (
    <View>
      <View style={{ backgroundColor: Colors.ORANGE }}>
        {/* Ioon retour */}
        <View style={{ top: "30%", left: "5%" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginRepetiteur")}
          >
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
            Top: "5%",
            padding: 15,
          }}
        >
          {/* Formumaire d'inscription */}
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontFamily: "MontserratBold",
            }}
          >
            Inscription du répétiteur
          </Text>
          <Form />

          {/* Lien connexion */}
          <View
            style={{
              marginTop: 15,
              display: "flex",
              flexDirection: "row",
              alignSelf: "center",
              gap: 5,
            }}
          >
            <Text>Avez-vous un compte ? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginRepetiteur")}
            >
              <Text
                style={{
                  fontFamily: "MontserratBold",
                  color: Colors.ORANGE,
                }}
              >
                Se connecter
              </Text>
            </TouchableOpacity>
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
    borderWidth: 1,
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
  FormStep: {},
  stepContent: {},
  labelText: {},
});
