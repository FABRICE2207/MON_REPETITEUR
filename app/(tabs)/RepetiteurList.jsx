import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Modal,
  Pressable,
  FlatList,
  Linking,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import ContainerRep from "@/components/ContainerRep";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from '@expo/vector-icons/Entypo';

const RepetiteurList = () => {

  const [repetiteurId, setRepetiteurId] = useState(null)
  const [repetiteurData, setRepetiteurData] = useState({})

  // Afficher et fermer le modal
  const [modalVisible, setModalVisible] = useState(false);
  const [repetiteurList, setRepetiteurList] = useState([]);

  // Les variables des recherches
  const [repetInput, setRepetInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [fullData, setFullData] = useState([]);

  // Les variables de récupération du répétietur
  const [infosRep, setInfosRep] = useState("");

  // Les variables de récupération du répétietur
  const [infosPar, setInfosPar] = useState("");

  // Chargement de la liste
  useEffect(() => {
    setIsLoading(true);
    getRepetiteurList();
  }, []);

  // En-point pour afficher la liste des répétiteurs
  const getRepetiteurList = async () => {
    //axios.get('http://192.168.1.2:5000/api/repetiteurs/getAll') // Bureau
    axios.get("http://192.168.1.4:5000/api/repetiteurs/getAll").then((res) => {
      // console.log(res.data);
      setRepetiteurList(res.data);
      setFullData(res.data)
      setIsLoading(false);
    });
  };

  // Afficher le modal et l'Api d'affichage
  const handleShowModal = async (id) => {
    setRepetiteurId(id); // Pour l'id
    setModalVisible(true) // Afficher le modal

    // End-point pour afficher les détails du répétiteur
    try {
      // const response = await axios.get(`http://192.168.1.3:5000/api/get_repetiteur/${id}`);
      const response = await axios.get(`http://192.168.1.4:5000/api/get_repetiteur/${id}`);
      const data = response.data;
      setRepetiteurData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const ShowDetaisRep = async (id) => {
    setRepetiteurId(id); // Pour l'id
    // setModalVisible(true) // Afficher le modal
    
    // End-point pour afficher les détails du répétiteur
    try {
      // const response = await axios.get(`http://192.168.1.3:5000/api/get_repetiteur/${id}`);
      const response = await axios.get(`http://192.168.1.4:5000/api/get_repetiteur/${id}`);
      const data = response.data;
      // navigation.navigate('DetailsRepetiteur')
      setRepetiteurData(data);
    } catch (error) {
      console.error(error);
    }
  };


 // Chargement des données
 useFocusEffect(
  React.useCallback(() => {
   
    const fetchRep = async () => {
      try {
        // Récupere le token du répétietur connecté 
        const tokenR =  await AsyncStorage.getItem("tokenR");
        console.log(tokenR);

        // Récupere le token du Parent connecté 
        const tokenP =  await AsyncStorage.getItem("tokenP");
        console.log(tokenP);

        // console.log(`Bearer ${token}`);
        if(tokenR !== null){
          // Récupération des données
          const response = await axios.get('http://192.168.1.4:5000/api/getDataToken', {
            headers: {
              'Authorization': `Bearer ${tokenR}`,
              'Content-Type': 'application/json',
              }
            });
              setInfosRep(response.data);
        }

        // Récupere le token du parent connecté
        else if (tokenP !== null) {
            // Récupération des données
          const response = await axios.get('http://192.168.1.4:5000/api/getDataTokenParent', {
            headers: {
              'Authorization': `Bearer ${tokenP}`,
              'Content-Type': 'application/json',
              }
            });
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

  // Fonction de recherche et afficher de la liste
  filterData = (item) => {

    // Si le form de la recherche est vide, affiche la liste
    if(!repetInput){
        return(
          // Modal
          <Pressable onPress={() => handleShowModal(item.id)}>
                  <View style={styles.InfosRep}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      top: 5,
                      left: 5,
                    }}
                  />
                  <View style={{top: "10%"}}>
                    <View>
                    <Text>
                      {item.nomcomplet} 
                    </Text>
                    <Text>{item.lieu}, {item.quartHab}</Text>
                    </View>

                    <View style={{ display:'flex', flexDirection:'row'}}>
                      <Text style={{color:"red", top:5, fontWeight:'bold'}}>
                        {item.annExp} année(s) d'expériences
                      </Text>
                      {/* <Text style={{color:"black", top:5, fontWeight:'bold'}}>Voir plus</Text> */}
                    </View>
                  </View>
                </View>
          </Pressable>
          
        );
    }
    // Si le form commence par une lettre majuscule ou minuscule, affiche la liste
    if(item.lieu.toLowerCase().includes(repetInput.toLowerCase())){
      return(
        <Pressable onPress={() => handleShowModal(item.id)}>
                <View style={styles.InfosRep}>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    top: 5,
                    left: 5,
                  }}
                />
                <View style={{top: "10%"}}>
                  <View>
                  <Text>
                    {item.nomcomplet}
                  </Text>
                  <Text>Ville : {item.lieu}</Text>
                  </View>

                  <View style={{}}>
                    <Text style={{color:Colors.ORANGE, top:5, fontWeight:'bold'}}>Voir plus</Text>
                  </View>
                </View>
              </View>
      </Pressable>
      );
    } 
    if(!repetInput){
      return(
       <Text>ok</Text>
      );
    }

  }



  // const handleSearch = async (text) => {
  //   const url = `http://192.168.1.2:5000/api/search_repetiteur?lieu=${text}`;
  //   let data = await axios(url);
  //   alert(JSON.stringify(data))
  
  //   if(text == ""){
  //     getRepetiteurList();
  //   }
  //   // let repList = await getRepetiteurList().filter(item => {
  //   //   return item.lieu.toLowerCase().indexOf(text.toLowerCase())  > -1;
  //   // });
  //   // setFullData(repList);
  // };

  const contains = ({nomcomplet, lieu}, query) => {
    const {classPrim, classSecond} = nomcomplet;

    if(classPrim.includes(query) || classSecond.includes(query) || lieu.includes(query)) {
      return true
    }
    return false
  }

  // Bouton pour appeler et whatShap
  const actionButtonMenu = [
    {
      id: 1,
      name: "Appelez svp",
      icon: require("./../../assets/images/call.png"),
      url: "tel"+":"+`${repetiteurData.contactWhats}`
    },
  ];

  // Ouvrir le lien
  const OnPressHandle = (item) => {
    Linking.openURL(item?.url);
  };

  // Activé le loading chargement de l'icone
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="#FF6600" />
      </View>
    );
  }

  return (
    <View>
      {/* En tête */}
      <View
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: Colors.ORANGE,
          paddingTop: 30,
          paddingLeft: 10,
          paddingBottom: 40,
          paddingRight: 10,
        }}
      >
        {/* Nom du répétiteur */}
        <View
          style={{
            top:10,
          }}
          >
            <View style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}>
              {/* Icon Person */}
              {/* Si image existe affiche sinon affiche icon */}
              {
                  infosRep.image ? 
                    <Image
                    source={{uri: infosRep.image}}
                    style={{
                      marginTop:-10,
                      width: 40,
                      height: 40,
                      borderWidth: 2,
                      borderColor: "white",
                      borderRadius: 200,
                      alignSelf:'center'
                    }}
                  />
                  : 
                    <Ionicons name="person-circle" size={40} color="white" 
                      style={{
                        alignSelf:'center'
                      }}
                    />
                 }
              {/* Icon Parametres */}
              {/* <TouchableOpacity 
                onPress={() => navigation.navigate("screen/InfosRepetiteur")}
              >
                <Ionicons name="settings-outline" size={28} color="white" />
              </TouchableOpacity> */}
            </View>
            
            <Text style={{top:5, color:'#fff', fontSize:18, fontFamily:'MontserratRegular'}}>
              {infosRep.nomcomplet}
              {infosPar.nomcomplet_parent}
            </Text>
        </View>

        {/* <Text style={{top:20, color:'#fff', alignItems: "center", fontSize:18, fontFamily:'MontserratBold'}}>Liste des répétiteurs {nomcomplet}</Text> */}
      </View>

      {/* Container */}
      <View
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: "#fff",
          marginTop: -10,
          height: "100%",
        }}
      >
        
        {/* Recherche d'un étudiant par ville ou commune*/}
        <View style={styles.Input}>
          <Ionicons name="search-outline" size={25} color="black" />
          <TextInput
            placeholder="Rerchercher par ville ou commune"
            clearButtonMode="always"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setRepetInput(text)}
            style={{
              fontSize: 16,
              fontFamily: "MontserratRegular",
              left: 10,
              width: "100%",
            }}
          />
        </View>

        <Text style={{
          top:15,
          textAlign: 'center',
          fontWeight:'bold',
          fontSize:16
        }}>Liste des répétiteurs</Text>
        
        {/* Modal */}
        <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {/* Details du répétiteurs */}
                  <View>
                    <Image
                      source={{uri: repetiteurData.image}}
                      style={{
                        marginTop:-10,
                        width: 340,
                        height: 300,
                        borderColor:Colors.ORANGE,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        position: "relative"
                      }}
                    />
                  </View>

                  <View style={{ alignItems: "center", position: "absolute", top: "42%" }}>
                    {/* Nom complet */}
                    <Text
                      style={{
                        top: 5,
                        fontFamily: "MontserratBold",
                        fontSize:18,
                        backgroundColor: "white",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingLeft: "25%",
                        paddingRight: "20%",
                      }}
                    >
                      {repetiteurData.nomcomplet}
                    </Text>
                    {/* Icon Appel simple et WhaSapp */}
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        paddingTop: 15,
                      }}
                    >
                      <FlatList
                        data={actionButtonMenu}
                        numColumns={4}
                        columnWrapperStyle={{ justifyContent: "space-around" }}
                        renderItem={({ item, index }) => (
                          // Action sur les boutons
                          <Pressable
                            onPress={() => OnPressHandle(item)}
                            style={{alignItems:'center'}}
                          >
                            <Image
                              source={item?.icon}
                              style={{
                                width: 50,
                                height: 50,
                              }}
                            />
                            <Text key={index}>{item?.name}</Text>
                          </Pressable>
                        )}
                      />
                    </View>

                    {/* Les autres informations */}
                    <View style={{ alignItems: "center", top: 5 }}>
                      <Text style={{ alignItems: "center", top: 5 }}>
                        Ville ou commune
                      </Text>
                      <Text
                        style={{
                          top: 3,
                          fontSize: 16,
                          fontFamily: "MontserratBold",
                        }}
                      >
                        {repetiteurData.lieu}
                      </Text>

                      <Text style={{ alignItems: "center", top: 5 }}>
                        Quartier d'habitation
                      </Text>
                      <Text
                        style={{
                          top: 3,
                          fontSize: 16,
                          fontFamily: "MontserratBold",
                        }}
                      >
                        {repetiteurData.quartHab}
                      </Text>

                      <Text style={{ alignItems: "center", top: 10 }}>
                        Enseignement Primaire
                      </Text>
                      <Text
                        style={{
                          top: 10,
                          fontSize: 16,
                          fontFamily: "MontserratBold",
                        }}
                      >
                        {repetiteurData.classPrim}
                      </Text>

                      <Text style={{ alignItems: "center", top: 15 }}>
                        Enseignement Général
                      </Text>
                      <Text
                        style={{
                          top: 15,
                          fontSize: 16,
                          fontFamily: "MontserratBold",
                        }}
                      >
                        {repetiteurData.classSecond}
                      </Text>
                    </View>
                  </View>

                  {/* Btn pour fermer */}
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Entypo name="circle-with-cross" size={24} color="white" />
                    {/* <Text style={{ color: "white", fontSize: 18 }}>Fermer</Text> */}
                  </Pressable>
                </View>
              </View>
        </Modal>


        {/* Liste des répétiteurs */}
        <View style={styles.ListRepetiteur}>
          <FlatList
            data={repetiteurList}
            keyExtractor={(item) => item.nomcomplet}
            renderItem={({ item, index }) => filterData(item)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Input: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    top: 10,
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: Colors.ORANGE,
    position: "relative",
  },
  ListRepetiteur: {
    padding: 5,
    margin: 5,
    top: 25,
    position: "relative",
    marginBottom: "85%",
  },
  InfosRep: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 20,
    shadowOffset: {
      width: 0,
      height: 5,
      borderRadius: 5,
    },
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 4,
    height: 110,
    marginBottom: 5,
  },
  modalView: {
    margin: 10,
    height: "95%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    top: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    left: 10
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonCall: {
    backgroundColor: "#3dc1e6",
    borderRadius: 99,
    top: 25,
    padding: 10,
    width: 45,
  },
  buttonWhat: {
    backgroundColor: "green",
    borderRadius: 99,
    top: 25,
    padding: 10,
    width: 45,
  },
  buttonClose: {
    backgroundColor: Colors.ORANGE,
    position: "absolute",


  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default RepetiteurList;