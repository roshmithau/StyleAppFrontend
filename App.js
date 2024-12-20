import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets[0]) {
        setImage(response.assets[0]);
      }
    });
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });

    try {
      const res = await axios.post('http://localhost:8000/fashion/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="Pick an Image" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
      <Button title="Upload Image" onPress={uploadImage} />
      {message && <Text>{message}</Text>}
    </View>
  );
};

export default App;
