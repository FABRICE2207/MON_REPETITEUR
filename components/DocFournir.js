import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import SelectOptionOne from "@/components/SelectOptionOne"
import SelectClassSecondaire from "@/components/SelectClassSecondaire"
import SelectNiveauEtude from "@/components/SelectNiveauEtude"
export default function DocFournir({
  classPrim, 
  setClassPrim, 
  classSecond, 
  setClassSecond,
  annExp,
  setAnnExp,
  nivEtud,
  setNivEtud
}) {

  // Importer un fichier pdf
  //   const [selectedFile, setSelectedFile] = useState(null);
  //   const [fileContent, setFileContent] = useState("");

  //   const handleSelectFile = async () => {
  //     try {
  //       const result = await DocumentPicker.pick({
  //         type: [DocumentPicker.types.pdf],
  //       });

  //       setSelectedFile(result);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  return (
    <View style={{ padding: 10 }}>

      <ScrollView>
        {/* Classe du primaire */}
         <View>
            <Text style={{ fontFamily: "MontserratRegular", fontSize: 16, bottom:5 }}>
              Enseignement primaire
            </Text>
            <View>
            <SelectOptionOne classPrim={classPrim} setClassPrim={setClassPrim} />
            </View>

            {/* Classe du Sécondaire */}
            <View >
              <Text style={{ fontFamily: "MontserratRegular",  fontSize: 16 }}>
                Engeinement Sécondaire
              </Text>
              <SelectClassSecondaire classSecond={classSecond} setClassSecond={setClassSecond} />
            </View>

            {/* Année d'expérience dans le domaine */}
            <Text style={{ fontFamily: "MontserratRegular", fontSize: 16 }}>
                Années d'expérience dans le domaine
            </Text>
            <View style={styles.Input}>
                <Ionicons name="school-outline" size={25} color="black" />
                <TextInput
                  maxLength={2}
                  keyboardType="phone-pad"
                  value={annExp}
                  onChangeText={(annExp) => {
                    setAnnExp(annExp)
                  }}
                  placeholder="Ex: 02 années d'expériences"
                  style={{
                    fontSize: 16,
                    fontFamily: "MontserratRegular",
                    left: 10,
                    width: "100%",
                  }}
                />
            </View>

            {/* Niveau d'étude */}
            <View >
              <Text style={{ fontFamily: "MontserratRegular",  fontSize: 16 }}>
                Niveau d'étude
              </Text>
              <SelectNiveauEtude nivEtud={nivEtud} setNivEtud={setNivEtud} />
            </View>
         </View>
      </ScrollView>      
    
      {/* CV */}
      

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