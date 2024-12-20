import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ContainerRep() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: Colors.ORANGE,
        alignItems: "center",
        padding: 50,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontFamily: "MontserratBold",
          color: "white",
          top: 10,
        }}
      >
        Mon compte
      </Text>
    </View>
  );
}
