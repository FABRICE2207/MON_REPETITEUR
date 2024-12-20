import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from "@react-navigation/native";

const DetailsRepetiteur = () => {
    const navigation = useNavigation();

    const route = useRoute();
    const { item } = route.params;

  return (
    <View>
      <Text>DetailsRepetiteur</Text>
    </View>
  )
}

export default DetailsRepetiteur