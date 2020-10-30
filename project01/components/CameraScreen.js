import React, { useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { RNCamera } from 'react-native-camera';

import axios from 'axios';

const CameraScreen = () => {
    const camera = useRef();

    const takePicture = async () => {
        if (camera.current) {
          const options = { quality: 0.5, base64: true, width: 400 };
          const data = await camera.current.takePictureAsync(options);
          //alert(JSON.stringify(data.base64));
          //upload to server
          const url = 'https://api.codingthailand.com/api/upload';
          const res = await axios.post(url, {
              picture: 'data:image/jpeg;base64,' + data.base64
          });
          alert(JSON.stringify(res.data));

        }
    };

    return (
        <View style={styles.container}>
        <RNCamera
          ref={ref => {
            camera.current = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> ถ่ายรูป </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
}

export default CameraScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });
