import { Dimensions, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, {useState, useRef} from 'react'
import { Video, ResizeMode } from 'expo-av'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Colors from '../../Utils/Colors';
import {Ionicons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

const PlayVideoListItem = ({video, activeIndex, index, userLikeHandler, user}) => {
    // console.log(video.videoUrl);
    const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  const BottomTabHeight = useBottomTabBarHeight();
  const ScreenHeight = Dimensions.get('window').height-BottomTabHeight;

  const checkIsUserAlreadyLike=()=>{
    const result = video.VideoLikes?.find(item=>item.userEmail==user.primaryEmailAddress.emailAddress)
    return result;
  }

  const navigation = useNavigation();
  const onOtherUserProfileClick=(OtherUser)=>{
      navigation.navigate('other-user',{
      user:OtherUser
    })
  }
  return (
    <View>
        <View style={{position:'absolute', zIndex:10, bottom:20, padding:20, display:'flex', flexDirection:'row', alignItems:'flex-end', justifyContent:'space-between', width:'100%'}}>
            <View>
                <View
                    style={{
                        display:'flex',
                        alignItems:'center',
                        flexDirection:'row',
                        gap:5
                    }}
                >
                  <TouchableOpacity onPress={()=>onOtherUserProfileClick(video?.Users)}>
                    <Image
                        source={{uri: video?.Users?.profileImage}}
                        style={{backgroundColor:Colors.WHITE, borderRadius:99, width:40, height:40}}
                    />
                  </TouchableOpacity>
                    
                    <Text style={{fontFamily:'outfit', fontSize:16, color:Colors.WHITE, paddingLeft:5}}>{video?.Users?.name}</Text>
                </View>
                <Text style={{fontFamily:'outfit', fontSize:16, color:Colors.WHITE, marginTop:8}}>{video?.description}</Text>
            </View>
            <View style={{display:'flex', gap:25}}>
                    <>
                      {checkIsUserAlreadyLike(video)?
                        <TouchableHighlight onPress={()=>userLikeHandler(video,true)}>
                        <Ionicons name='heart' size={35} color="red"/>
                        </TouchableHighlight>
                        :
                        <TouchableHighlight onPress={()=>userLikeHandler(video,false)}>
                        <Ionicons name='heart-outline' size={35} color="white"/>
                        </TouchableHighlight>
                      }
                      <Text style={{color:Colors.WHITE, textAlign:'center', marginTop:-20}}>{video?.VideoLikes?.length}</Text>
                    </>
                
                <Ionicons name='chatbubble-outline' size={35} color="white"/>
                <Ionicons name='paper-plane-outline' size={35} color="white"/>
            </View>
        </View>
      <Video
        ref={videoRef}
        style={[styles.video, {height:ScreenHeight+24}]}
        source={{
          uri: video?.videoUrl,
        }}
        useNativeControls={false}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={activeIndex==index}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    </View>
  )
}

export default PlayVideoListItem

const styles = StyleSheet.create({
    video: {
        alignSelf: 'center',
        width: Dimensions.get('window').width,
      },
})