import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";

import { launchImageLibrary } from "react-native-image-picker";

import { fetch } from "react-native-fetch-api";

const App = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [image, setImage] = useState(null);

  const handleChooseImage = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setImage(response);
      }
    });
  };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("name", name);

    formData.append("email", email);

    formData.append("image", {
      uri: image.uri,

      type: image.type,

      name: image.fileName,
    });

    fetch("https://your-api-url.com/submit-form", {
      method: "POST",

      body: formData,

      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => response.json())

      .then((data) => console.log(data))

      .catch((error) => console.error(error));
  };

  return (
    <View>
      <Text>Name:</Text>

      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter your name"
      />

      <Text>Email:</Text>

      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter your email"
      />

      <TouchableOpacity onPress={handleChooseImage}>
        <Text>Choose Image</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 300, height: 300 }}
        />
      )}

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};
