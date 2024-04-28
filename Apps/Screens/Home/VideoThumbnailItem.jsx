import { Alert, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import {Ionicons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '@clerk/clerk-expo'
import { supabase } from '../../Utils/SupabaseConfig'

const VideoThumbnailItem = ({video, refreshData}) => {
    const {user} = useUser();
    const navigation = useNavigation();

    const onDeleteHandler=(video)=>{
      Alert.alert('Do you want to Delete?', 'Do you really want to delete this video?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes',
        onPress: () => deleteVideoPost(video),
        style: 'destructive'
        },
      ]);
    }

    const deleteVideoPost=async(video)=>{
      
      await supabase
      .from('VideoLikes')
      .delete()
      .eq('postIdRef',video.id)
        
      
      const { error } = await supabase
      .from('PostList')
      .delete()
      .eq('id', video.id)

      ToastAndroid.show('Post Deleted!',ToastAndroid.SHORT)
      refreshData()
        
    }

  return (
    <View 
        style={{flex:1}}
    >
      {/* Only display delete icon if user is the owner of video */}
      {user.primaryEmailAddress.emailAddress==video?.Users?.email && 
        <TouchableOpacity 
          style={{
            position:'absolute',
            zIndex:10,
            right:0,
            padding:10
          }}
          onPress={()=>onDeleteHandler(video)}
        >
          <Ionicons name="trash" size={20} color="white"/>
        </TouchableOpacity>
      }
      
      <TouchableOpacity
        style={{flex:1, margin:5}}
        onPress={()=>navigation.navigate('play-video',{
            selectedVideo:video
        })}
      >
        <>
          <View style={{position:'absolute', zIndex:10, bottom:0, padding:5, display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:5}}>
                  <Image source={{uri:video?.Users?.profileImage}}
                      style={{width:20, height:20, backgroundColor:Colors.WHITE, borderRadius:99}}
                  />
                  <Text style={{color:Colors.WHITE, fontFamily:'outfit', fontSize:10}}>{video?.emailRef.split('@')[0]}</Text>
              </View>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:3}}>
                  <Text style={{fontFamily:'outfit', fontSize:10, color:Colors.WHITE}}>{video?.VideoLikes?.length}</Text>
                  <Ionicons name="heart-outline" size={20} color="white"/>
              </View>
          </View>
        </>
        
      <Image
        source={{uri:video?.thumbnail}}
        style={{width:'100%', height:250, borderRadius:10}}
      />
      </TouchableOpacity>
    </View>
  )
}

export default VideoThumbnailItem

const styles = StyleSheet.create({})