import { View, Text, StyleSheet, TextInput } from "react-native";
import React,{useState} from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons';

// expression régulierèreemail
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function InfosPersonnels({ 
  nomcomplet, 
  setNomComplet, 
  email, 
  setEmail, 
  contactWhats, 
  setContactWhats, 
  lieu, 
  setLieu, 
  quartHab, 
  setQuartHab
}) {
      // Message de suggestions
      const [error, setError] = useState(null);

       // Vérification du password et message d'erreur
       const handleEmailChange = (text) => {
        setEmail(text);
        if (!emailRegex.test(text)) {
          setError('Email invalide');
        } else {
          setError('Email valide');
        }
      };

  return (
    <View style={{padding:10, marginBottom:20}}>
       {/* Nom et Prénoms */}
      <Text style={{ fontFamily: "MontserratRegular", fontSize: 16 }}>
        Nom et Prénoms
      </Text>
      <View style={styles.Input}>
        <Ionicons name="person-outline" size={25} color="black" />
        <TextInput
          value={nomcomplet}
          onChangeText={(nomcomplet) => {
            setNomComplet(nomcomplet)
          }}
          placeholder="Nom et prénoms"
          style={{
            fontSize: 16,
            fontFamily: "MontserratRegular",
            left: 10,
            width: "100%",
          }}
        />
      </View>
      {/* {
        errors.formData.nom_complet ? <Text>{errors.formData.nom_complet}</Text> : null
      } */}

      {/* Gmail */}
      <Text style={{ fontFamily: "MontserratRegular", fontSize: 16 }}>
      Gmail 
      </Text>
      <View style={styles.Input}>
        <Ionicons name="mail-outline" size={25} color="black" />
        <TextInput
          keyboardType="email-address"
          value={email}
          onChangeText={(email) => {
            setEmail(email)
            handleEmailChange(email)
          }}
          placeholder="Ex: monrépétiteur@gmail.com"
          style={{
            fontSize: 16,
            fontFamily: "MontserratRegular",
            left: 10,
            width: "100%",
          }}
        />
      </View>
      {/* Message erreur d'email */}
      { error 
        ? <Text style={{ 
          fontWeight:'bold',
          color:
          error === "Email valide"
            ? "green"
            : "red"
         }}>
            {error}
          </Text>
        : null
      }

      {/* Contact */}
      <Text style={{ fontFamily: "MontserratRegular", fontSize: 16 }}>
      Contact WhatSapp  
      </Text>
      <View style={styles.Input}>
        <Ionicons name="call-outline" size={25} color="black" />
        <TextInput
          maxLength={10}
          keyboardType="phone-pad"
          value={contactWhats}
          onChangeText={(contactWhats) => {
            setContactWhats(contactWhats)
          }}
          placeholder="Contact WhatSapp"
          style={{
            fontSize: 16,
            fontFamily: "MontserratRegular",
            left: 10,
            width: "100%",
          }}
        />
      </View>
      
      {/* Lieu ville et Commune */}
      <Text style={{ fontFamily: "MontserratRegular", fontSize: 16 }}>
      Ville ou Commune
      </Text>
      <View style={styles.Input}>
        <Ionicons name="home-outline" size={25} color="black" />
        <TextInput
          value={lieu}
          onChangeText={(lieu) => {
            setLieu(lieu)
          }}
          placeholder="Ville ou commune "
          style={{
            fontSize: 16,
            fontFamily: "MontserratRegular",
            left: 10,
            width: "100%",
          }}
        />
      </View>

       {/* Quartier d'habitation */}
       <Text style={{ fontFamily: "MontserratRegular", fontSize: 16 }}>
        Quartier d'habitation
      </Text>
      <View style={styles.Input}>
        <Ionicons name="home-outline" size={25} color="black" />
        <TextInput
          value={quartHab}
          onChangeText={(quartHab) => {
            setQuartHab(quartHab)
          }}
          placeholder="Quartier d'habitation"
          style={{
            fontSize: 16,
            fontFamily: "MontserratRegular",
            left: 10,
            width: "100%",
          }}
        />
      </View>

    </View>
  );
}

const styles= StyleSheet.create({
    Input:{
        display:"flex",
        flexDirection:"row",
        // borderWidth:1,
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:20,
        marginTop:8,
        marginBottom:8,
        backgroundColor: "#eee"
    }
  })
