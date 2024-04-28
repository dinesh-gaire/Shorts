import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import PlayVideoListItem from './PlayVideoListItem';
import {Ionicons} from '@expo/vector-icons'
import { supabase } from '../../Utils/SupabaseConfig';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useUser } from '@clerk/clerk-expo';

const PlayVideoList = () => {
    const params = useRoute().params;
    const [videoList, setVideoList] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)
    const windowHeight = Dimensions.get('window').height;
    const BottomTabHeight = useBottomTabBarHeight();
    const [currentVideoIndex, setCurrentVideoIndex] = useState();
    const {user} = useUser();

    useEffect(() => {
      setVideoList([params.selectedVideo])
      GetLatestVideoList();
    }, [])

    const GetLatestVideoList=async()=>{
      setLoading(true);
      const { data, error } = await supabase
      .from('PostList')
      .select('*,Users(username,name,profileImage,email),VideoLikes(postIdRef, userEmail)')
      .range(0, 6)
      .order('id', {ascending: false})

      // const result = data.filter((item=>item.id!=params.selectedVideo))

      // console.log(data);
      setVideoList(videoList=>[...videoList,...data]);
      // console.log(error);
      if(data){
        setLoading(false)
      }
        
    }

    const userLikeHandler=async(videoPost, isLike)=>{
      if(!isLike){
        const {data, error} = await supabase
        .from('VideoLikes')
        .insert([{
          postIdRef:videoPost.id,
          userEmail:user.primaryEmailAddress.emailAddress
        }])
        .select();
        GetLatestVideoList();
      }
      else{
        
        const { error } = await supabase
        .from('VideoLikes')
        .delete()
        .eq('postIdRef', videoPost.id)
        .eq('userEmail', user?.primaryEmailAddress?.emailAddress)
        GetLatestVideoList();
      }
    }

    
  return (
    <View>
        <TouchableOpacity style={{position:'absolute', zIndex:20, padding:20, paddingTop:50}}
            onPress={()=>navigation.goBack()}
        >
            <Ionicons name='arrow-back' size={24} color="black"/>
        </TouchableOpacity>
      <FlatList
        style={{zIndex:-1}}
        data={videoList}
        onScroll={e=>{
          const index = Math.round(e.nativeEvent.contentOffset.y/(windowHeight-BottomTabHeight))
          setCurrentVideoIndex(index);
        }}
        renderItem={({item, index})=>(
            <PlayVideoListItem 
            video={item} 
            key={index} 
            index={index} 
            activeIndex={currentVideoIndex} 
            userLikeHandler={userLikeHandler}
            user={user}
            />
        )}
        pagingEnabled
      />
    </View>
  )
}

export default PlayVideoList

const styles = StyleSheet.create({})