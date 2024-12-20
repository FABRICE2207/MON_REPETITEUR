import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "./../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

export default function Password({
  passwordR,
  setPasswordR,
  cpasswordR,
  setCPasswordR,
}) {
  // Les propriétés d'afficher et cacher les password
  const [showP, setShowP] = useState(false);
  const [visibleP, setVisibleP] = useState(true);

  // Les propriétés d'afficher et cacher les password confirmer
  const [showPC, setShowPC] = useState(false);
  const [visiblePC, setVisiblePC] = useState(true);

  // Message de suggestions
  const [suggestions, setSuggestions] = useState([]);
    // Taille de caractères
  const [strength, setStrength] = useState("");

  // Vérification du password et message d'erreur
  // const validatePassword = (input) => {
  //   let newSuggestions = [];
  //   if (input.length < 8) {
  //     newSuggestions.push("Le mot de passe doit comporter au moins 8 caractères");
  //   }
  //   if (!/\d/.test(input)) {
  //     newSuggestions.push("Ajouter au moins un chiffre");
  //   }

  //   if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) {
  //     newSuggestions.push("Inclure des lettres majuscules et minuscules");
  //   }

  //   if (!/[^A-Za-z0-9]/.test(input)) {
  //     newSuggestions.push("Inclure au moins un caractère spécial");
  //   }

  //   setSuggestions(newSuggestions);

  //   // Determine password strength based on suggestions
  //   if (newSuggestions.length === 0) {
  //     setStrength("Mot de passe très fort");
  //   } else if (newSuggestions.length <= 1) {
  //     setStrength("Mot de passe fort");
  //   } else if (newSuggestions.length <= 2) {
  //     setStrength("Mot de passe modéré");
  //   } else if (newSuggestions.length <= 3) {
  //     setStrength("Mot de passe faible");
  //   } else {
  //     setStrength("Mot de passe très faible");
  //   }
  // };


  return (
    <View style={{ padding: 10 }}>

      {/* Barre de progression */}
      {/* {strength && <View style={styles.strengthMeter}>
        <View
          style={{
            width: `${
              strength === "Mot de passe très fort"
                ? 100
                : strength === "Mot de passe fort"
                ? 75
                : strength === "Mot de passe modéré"
                ? 50
                : strength === "Mot de passe faible"
                ? 25
                : strength === "Mot de passe très faible"
                ? 10
                : 0
            }%`,
            height: 20,
            backgroundColor:
              strength === "Mot de passe très faible"
                ? "red"
                : strength === "Mot de passe faible"
                ? "red"
                : strength === "Mot de passe modéré"
                ? "yellow"
                : strength === "Mot de passe fort"
                ? "green"
                : "limegreen",
          }}
        ></View>
      </View>} */}


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
            // validatePassword(passwordR);
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
      <Text style={{fontWeight:'bold',fontSize:12, color:'#b6b3b3'}}>Le mot de passe doit être de 8 caratères *</Text>
      {/* Message d'erreur */}
      {/* { strength 
        ? <View>
          <Text style={{
          fontWeight:'bold',
          color:
          strength === "Mot de passe très fort"
            ? "green"
            : "red"
        }}>{strength}</Text>
  
        <Text style={styles.suggestionsText}>
          {suggestions.map((suggestion, index) => (
            <Text key={index}>
              {suggestion}
              {"\n"}
            </Text>
          ))}
        </Text>
        </View>
        : null
      } */}

      {/* Mot de passe confirmer */}
      <Text style={{ fontFamily: "MontserratRegular", fontSize: 16 }}>
        Confirmation du mot de passe
      </Text>
      <View style={styles.Input}>
        <Ionicons name="lock-closed-outline" size={25} color="black" />
        <TextInput
          value={cpasswordR}
          onChangeText={(cpasswordR) => {
            setCPasswordR(cpasswordR);
          }}
          placeholder="Confirmer le mot de passe"
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
    borderColor: Colors.ORANGE,
    marginTop: 8,
    marginBottom: 8,
  },
  strengthText: { 
    fontWeight: 'bold', 
    fontSize: 14,
    fontFamily:'MontserratBold' 
}, 
suggestionsText: { 
    color: 'red', 
}, 
strengthMeter: { 
    bottom:10,
    width: '100%', 
    height: 20, 
    backgroundColor: '#ccc', 
    marginTop: 20, 
    borderRadius: 10, 
    overflow: 'hidden', 
}, 
});
