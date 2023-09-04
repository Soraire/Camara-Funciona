import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image} from 'react-native';
import { Camera } from 'expo-camera';
import axios from "axios";


export default function Camara() {

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  
  useEffect(() => {
    checkPermissions();
  }, []);

const checkPermissions = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status === 'granted');
  };
 
  const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync({base64:true})
        //console.log("data",data)
        //console.log("data uri", data.uri)
        //console.log("data base64",data.base64)
        setImage(data.uri);
        const datajson = {"dni":"44333222",
        "imagen": data.base64}
        console.log("!wtf******")

        axios.get('https://api.github.com/users/mapbox')
  .then((response) => {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
  
        axios.post("http://10.152.2.113/post_json", datajson)
        .then(function (response) {
          console.log(response);
          console.log("***then")
        })
        .catch(function (error) {
          console.log(error);
          console.log("***error")
        });
    }

    

  }
 if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (
 
    <View style={styles.container2}>
 
      <View style={styles.cameraContainer}>
        <Camera 
            ref={ref => setCamera(ref)}
            style={styles.camera} 
            type={type}
            ratio={'1:1'} />
        </View>

      <Button      style={styles.button}
            title="Flip Image"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
     </Button>
     <Button title="Take Picture" onPress={() => takePicture()} />
     {image && <Image source={{uri: image}} style={{flex:1}}/>}
    </View>

  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    //alignContent: 'center'
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});
