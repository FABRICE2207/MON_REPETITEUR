import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { Colors } from "@/constants/Colors";
import AntDesign from '@expo/vector-icons/AntDesign';

// Les classes du primaires
const data = [
  { label: '6ième', value: '6ième' },
  { label: '5ième', value: '5ième' },
  { label: '4ième', value: '4ième' },
  { label: '3ième', value: '3ième' },
  { label: '2nde A', value: '2nde A' },
  { label: '2nde C', value: '2nde C' },
  { label: '2nde F2', value: '2nde F2' },
  { label: '2nde G1', value: '2nde G1' },
  { label: '2nde G2', value: '2nde G2' },
  { label: '1ère A', value: '1ère A' },
  { label: '1ère D', value: '1ère D' },
  { label: '1ère C', value: '1ère C' },
  { label: '1ère F2', value: '1ère F2' },
  { label: '1ère G1', value: '1ère G1' },
  { label: '1ère G2', value: '1ère G2' },
  { label: 'Tle A', value: 'Tle A' },
  { label: 'Tle C', value: 'Tle C' },
  { label: 'Tle D', value: 'Tle D' },
  { label: 'Tle F2', value: 'Tle F2' },
  { label: 'Tle G1', value: 'Tle G1' },
  { label: 'Tle G2', value: 'Tle G2' },
];

const SelectClassSecondaire = ({classSecond, setClassSecond}) => {
    // const [] = useState([]);

  return (
    <View style={{paddingBottom:10}}>
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
        value={classSecond}
        onChange={classSecond => {
          setClassSecond(classSecond);
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

export default SelectClassSecondaire;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    paddingHorizontal:10,
    paddingVertical:10,
    borderRadius:20,
    top:5,
    backgroundColor:'#eee'
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
    backgroundColor:Colors.ORANGE,
  },
});