import { FlatList, Image, StyleSheet, Text, TouchableHighlight, View, useAnimatedValue } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { supabase } from '../../Utils/SupabaseConfig';
import VideoThumbnailItem from './VideoThumbnailItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = () => {
    const {user} = useUser();
    const [videoList, setVideoList] = useState([]);
    const [loading, setLoading] = useState(false)
    const [loadCount, setLoadCount] = useState(0)

    useEffect(()=>{
        user && updateProfileImage();
        setLoadCount(0);
    },[user])

    useEffect(() => {
      GetLatestVideoList();
    }, [loadCount])
    
    // function to update profileImage column on Users table in database
    const updateProfileImage =async()=>{
        const {data, error} = await supabase
        .from('Users') 
        .update({'profileImage':user?.imageUrl}) // update profileImage column as user.imageUrl
        .eq('email',user?.primaryEmailAddress?.emailAddress) // update only if email column of Users table matches to user.primaryEmailAddress.emailAddress
        .is('profileImage',null) // update only if profileImage is null
        .select();
        // console.log(data);
        if(data){
          setLoading(false)
        }
    }

    const GetLatestVideoList=async()=>{
      setLoading(true);
      const { data, error } = await supabase
      .from('PostList')
      .select('*, Users(username,name,profileImage),VideoLikes(postIdRef, userEmail)')
      .range(loadCount, loadCount+6)
      .order('id', {ascending: false})

      // console.log(data);
      setVideoList(videoList=>[...videoList,...data]);
      // console.log(error);
      if(data){
        setLoading(false)
      }
        
    }
  return (
    <View 
      style={{padding:20, paddingVertical:30}}
    >
      <View style={{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center'
      }}>
        <Text style={{fontSize:35, fontFamily:'outfit-bold'}}>Tik Tok</Text>
        <Image
          source={{uri: user?.imageUrl}}
          style={{
            width:50,
            height: 50,
            borderRadius: 99
          }}
        />
      </View>
      <View>
        <FlatList
        numColumns={2}
          data={videoList}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index})=>(
            <VideoThumbnailItem video={item}/>
          )}
          onRefresh={GetLatestVideoList}
          refreshing={loading}
          onEndReached={()=>setLoadCount(loadCount+6)}
        />
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})