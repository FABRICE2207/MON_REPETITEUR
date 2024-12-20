import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { Colors } from "@/constants/Colors";
import AntDesign from '@expo/vector-icons/AntDesign';

// Les niveau d'étude 
const data = [
    { label: 'BAC', value: 'BAC' },
    { label: 'LICENCE 1', value: 'LICENCE 1' },
    { label: 'LICENCE 2', value: 'LICENCE 2' },
    { label: 'LICENCE 3', value: 'LICENCE 3' },
    { label: 'MASTER 1', value: 'MASTER 1' },
    { label: 'MASTER 2', value: 'MASTER 2' },
    { label: 'DOCTORAT', value: 'DOCTORAT' }
  ];

const SelectNiveauEtude = ({nivEtud, setNivEtud}) => {
    return (
        <View>
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Sélectionner votre niveau d'étude"
            searchPlaceholder="Sélectionner votre niveau d'étude"
            value={nivEtud}
            onChange={nivEtud => {
              setNivEtud(nivEtud);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
            selectedStyle={styles.selectedStyle}
          />
        </View>
      );
    };

export default SelectNiveauEtude

const styles = StyleSheet.create({
    dropdown: {
      height: 50,
      paddingHorizontal:10,
      paddingVertical:10,
      borderRadius:20,
      backgroundColor: "#eee"
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 14,
      color:'#fff'
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    icon: {
      marginRight: 5,
    },
    selectedStyle: {
      borderRadius: 20,
      backgroundColor:Colors.ORANGE
    },
  });