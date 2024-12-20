import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

export default function Photo({ image, setImage }) {
  // Infos personnels
  // nom_complet: "",
  // email: "",
  // contact_what: "",
  // ville_commune: "",

  // const [image, setImage] = useState();

  // Prendre la photo depuis la gallerie
  const pickImage = async () => {
    //No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    const image = result.assets[0].fileName;

    console.log("Le nom de votre photo:", image);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Prendre une photo camera
  const cameraPicker = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      cameraType: ImagePicker.CameraType.front,
      aspect: [1, 1],
      quality: 1,
    });

    image = result.assets[0].fileName;

    console.log("Image", image);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    // try{
    //   await ImagePicker.requestCameraPermissionsAsync();
    //   let result = await ImagePicker.launchCameraAsync({
    //     cameraType: ImagePicker.CameraType.front,
    //     aspect: [1, 1],
    //     quality: 1
    //   });

    // } catch (erro){

    // }
  };

  return (
    <View style={{bottom: 10 }}>
      <View style={{top:10}}>
        {image ? 
          <Image source={{ uri: image }}style={styles.image} />
          :
          <Ionicons
            name="person-circle-outline"
            size={200}
            color="gray"
            style={{ alignSelf: "center" }}
          />
        }

      </View>


      {/* Boutton photo */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent:'space-between',
          top:5
        }}
      >
        {/* btn gallerie */}
        <TouchableOpacity
          onPress={pickImage}
          style={styles.btn}
        >
          <Ionicons
            name="image-outline"
            size={25}
            color="black"
            style={{ alignSelf: "center" }}
          />
          <Text>Utiliser la gallerie</Text>
        </TouchableOpacity>
        
        {/* Btn camera */}
        <TouchableOpacity
          onPress={cameraPicker}
          style={styles.btn}
        >
          <Ionicons
            name="camera-outline"
            size={25}
            color="black"
            style={{ alignSelf: "center" }}
          />
          <Text>Prendre une photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn:{
      top:5,
      paddingHorizontal: 10,
      paddingVertical: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      borderWidth: 1,
      borderRadius: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 99,
    alignSelf: "center",
    borderColor:Colors.ORANGE,
    borderWidth:1
  },
});
