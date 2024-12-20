import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { Colors } from "@/constants/Colors";
import AntDesign from '@expo/vector-icons/AntDesign';

// Les classes du primaires
const data = [
  { label: 'CP1', value: 'CP1' },
  { label: 'CP2', value: 'CP2' },
  { label: 'CE1', value: 'CE1' },
  { label: 'CE2', value: 'CE2' },
  { label: 'CM1', value: 'CM1' },
  { label: 'CM2', value: 'CM2' },
];

const SelectOptionOne = ({classPrim, setClassPrim}) => {
    // const [] = useState([]);

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
        placeholder="Sélectionner la ou les classses"
        searchPlaceholder="Rechercher une classe"
        value={classPrim}
        onChange={classPrim => {
          setClassPrim(classPrim);
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

export default SelectOptionOne;

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