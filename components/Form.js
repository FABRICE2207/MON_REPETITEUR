import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
import React, { useState } from "react";
import InfosPersonnels from "./InfosPersonnels";
import Password from "./Password";
import DocFournir from "./DocFournir";
import Photo from "./Photo";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import Toast from "react-native-toast-message";
import axios from "axios";

export default function Form() {
  const navigation = useNavigation();

  /*Les propriétés du répétiteur*/
  // Etape 1
  const [nomcomplet, setNomComplet] = useState("");
  const [email, setEmail] = useState("");
  const [contactWhats, setContactWhats] = useState("");
  const [lieu, setLieu] = useState("");
  const [quartHab, setQuartHab] = useState("");

  // Etape 2
  const [classPrim, setClassPrim] = useState("");
  const [classSecond, setClassSecond] = useState("");
  const [annExp, setAnnExp] = useState("");
  const [nivEtud, setNivEtud] = useState("");

  // Etpae 3
  const [passwordR, setPasswordR] = useState("");
  const [cpasswordR, setCPasswordR] = useState("");

  // Etape 4
  const [image, setImage] = useState(null);

  const [repetiteurs, setRepetiteurs] = useState([]);

  // Fontion de déclaration des données
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("nomcomplet:", nomcomplet);
    formData.append("email:", email);
    formData.append("contactWhats:", contactWhats);
    formData.append("lieu:", lieu);
    formData.append("quartHab:", quartHab);
    formData.append("classPrim:", classPrim);
    formData.append("classSecond:", classSecond);
    formData.append("annExp:", annExp);
    formData.append("nivEtud:", nivEtud);
    formData.append("passwordR:", passwordR);
    // formData.append("image:", image);
    formData.append('image',{
        uri:image,
        type:"image/jpg",
        name:"dummy.png"
      })

    // Formatage en json
    const data = {
        nomcomplet: nomcomplet.toString(),
        email: email.toString(),
        contactWhats: contactWhats.toString(),
        lieu: lieu.toString(),
        quartHab: quartHab.toString(),
        classPrim: classPrim.toString(),
        classSecond: classSecond.toString(),
        annExp: annExp.toString(),
        nivEtud: nivEtud.toString(),
        passwordR: passwordR.toString(),
        image: image.toString(),
      }
    
    // alert(JSON.stringify(data))
    // En-point d'envoie via l'API
    try {
      url = "http://192.168.1.8:5000/api/repetiteurs/create";  // Bureau
      console.log(formData);
      await axios
        .post(url, data), {
          headers: {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Content-type": "multipart/form-data"
          },
        }
        // Affiche les informations dans la console
        console.log("Répétiteur :", data);
        setRepetiteurs([...repetiteurs, data]);
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
  };

  // const [errors, setErrors] = useState({});

  // Les étapes
  const [screen, setScreen] = useState(0);
  const FormTitle = [
    "Etape 1: Informations personnelles",
    "Etape 2: Informations supplémentaires",
    "Etape 3: Ajouter votre mot de passse",
    "Etape 4: Ajouter votre photo avant d'envoyer",
  ];

  // Le déplacement des interfaces
  const ScreenDisplay = () => {
    if (screen === 0) {
      return (
        <InfosPersonnels
          nomcomplet={nomcomplet}
          setNomComplet={setNomComplet}
          email={email}
          setEmail={setEmail}
          contactWhats={contactWhats}
          setContactWhats={setContactWhats}
          lieu={lieu}
          setLieu={setLieu}
          quartHab={quartHab}
          setQuartHab={setQuartHab}
          /*setFormData={setFormData}*/
        />
      );
    } else if (screen === 1) {
      return (
        <DocFournir
          classPrim={classPrim}
          setClassPrim={setClassPrim}
          classSecond={classSecond}
          setClassSecond={setClassSecond}
          annExp={annExp}
          setAnnExp={setAnnExp}
          nivEtud={nivEtud}
          setNivEtud={setNivEtud}
        />
      );
    } else if (screen === 2) {
      return (
        <Password
          passwordR={passwordR}
          setPasswordR={setPasswordR}
          cpasswordR={cpasswordR}
          setCPasswordR={setCPasswordR}
        />
      );
    } else {
      return <Photo image={image} setImage={setImage} />;
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontFamily: "MontserratBold",
            }}
          >
            {FormTitle[screen]}
          </Text>
          <View>{ScreenDisplay()}</View>

          {/* Button */}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable
          disabled={screen === 0}
          onPress={() => {
            setScreen((currScreen) => currScreen - 1);
          }}
          style={{
            borderWidth: 1,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
            borderColor: Colors.ORANGE,
          }}
        >
          <Text
            style={{
              color: Colors.ORANGE,
              fontSize: 16,
            }}
          >
            Précédent
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
             /*La logique de vérification des champs*/
            // Si les champs de l'etape 1 sont vide
            if (!nomcomplet || !email || !contactWhats || !lieu || !quartHab) {
              Alert.alert("Message", "Veuillez renseigner les champs svp.");
            } 
              // sinon si contactWhat est inférieur à 10
              else if (contactWhats.length < 10) {
              Alert.alert("Message", "Le contact doit être de 10 chiffres");
            } 
             // sinon si le lieu est inférieur à 3 caractères
              else if (lieu.length < 3) {
              Alert.alert("Message", "Le lieu doit être de 3 lettres minimum");
            } 
             // Si les champs de l'etape 2 sont vide
              else if (screen === 1) {
              if(!classPrim && !classSecond) {
                  Alert.alert("Message", "Veuillez sélectionner au moins une classe");
                } 
                //  Alors étape suivantes
                else {
                  setScreen((currScreen) => currScreen + 1);
                }
            }
               // Si les champs de l'etape 3 sont vide
              else if (screen === 2) {
                if (!passwordR || !cpasswordR || passwordR.valueOf() !== cpasswordR.valueOf()) {
                  Alert.alert("Message", "Les mots de passe sont vide ou ne sont pas identiques")
                }
                // Si le mot de passe est inférieur ou supérieur à 8
                else if (passwordR.length < 8 || passwordR.length > 8) {
                  Alert.alert(
                    "Message",
                    "Les mots de passe doivent contenir 8 caractères"
                  );
                } 
                 //  Alors étape suivantes
                else {
                  setScreen((currScreen) => currScreen + 1);
                }
              }
              // Si nous sommes à l' étapes 3 et l'image n'existe pas
              else if (screen === 3) {
                if (!image) {
                    Alert.alert("Message", "Veuillez utiliser la gallerie ou prendre une photo de vous.");
                    console.log(image);
                }  else if (screen === FormTitle.length - 1) {
                  Alert.alert("Message", "Votre inscription a été effectué avec succés.");
                  handleSubmit();
                  navigation.navigate("LoginRepetiteur");
                } 
              }
            //  Etape précédente
              else if (screen === FormTitle.length - 1) {
                handleSubmit();
                Alert.alert("Message", "Votre inscription a été effectué avec succés.");
                navigation.navigate("LoginRepetiteur");
              } 
              //  Etape suivante
              else {
                setScreen((currScreen) => currScreen + 1);
              }
              
          }}
          style={{
            borderWidth: 1,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
            borderColor: Colors.ORANGE,
            backgroundColor: Colors.ORANGE,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
            }}
          >
            {screen === FormTitle.length - 1 ? "Envoyer" : "Suivant"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    position: "relative",
    height: "70%",
  },
  buttonContainer: {
    top: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
