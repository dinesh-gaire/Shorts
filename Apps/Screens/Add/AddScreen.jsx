import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import Colors from '../../Utils/Colors'
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useNavigation } from '@react-navigation/native';

const AddScreen = () => {
    const [image, setImage] = useState(null);

    const navigation = useNavigation();

    // Used to select video file from phone
    const selectVideoFile = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
            // console.log(result.assets[0].uri);
          GenerateVideoThumbnail(result.assets[0].uri);
        }
      };

      //Used to generate the thumbnail
      const GenerateVideoThumbnail =async(videoUri)=>{
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
              videoUri,
              {
                time: 10000,
              }
            );
            // setImage(uri);
            // console.log("Thumbnail",uri);

            // navigating to preview-screen after thumbnail is created
            navigation.navigate('preview-screen', {
              video:videoUri,
              thumbnail:uri
            })
          } catch (e) {
            console.warn(e);
          }
      }

  return (
    <View
        style={{
            display: 'flex',
            alignItems:'center',
            justifyContent: 'center',
            flex:1
        }}
    >
      <Image
        source={{
            uri: 'https://cdn.pixabay.com/photo/2017/06/30/10/57/icon-2457975_640.png'
        }}
        style={{
            height: 160,
            width: 160
        }}
      />
      <Text
        style={{
            fontFamily: 'outfit-bold',
            fontSize: 20,
            marginTop: 20
        }}
      >Start Uploading Short Video</Text>
      <Text
        style={{
            textAlign: 'center',
            marginTop: 13,
            paddingHorizontal: 15,
            fontFamily: 'outfit'
        }}
      >Let's upload short video and start sharing your creativity with community</Text>
      <TouchableOpacity
        style={{
            backgroundColor:Colors.BLACK,
            padding:10,
            paddingHorizontal:25,
            borderRadius:99,
            marginTop:20
        }}
        onPress={selectVideoFile}
      >
        <Text style={{color:Colors.WHITE, fontFamily:'outfit'}}>Select Video File</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddScreen

const styles = StyleSheet.create({})