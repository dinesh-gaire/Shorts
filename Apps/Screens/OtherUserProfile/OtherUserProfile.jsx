import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import OtherUserProfileIntro from './OtherUserProfileIntro';
import { supabase } from '../../Utils/SupabaseConfig';
import UserPostList from '../Profile/UserPostList';

const OtherUserProfile = () => {
    const params = useRoute().params;
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        params && getUserPost();
    },[params])

    const getUserPost=async()=>{
        setLoading(true);
        const {data, error} = await supabase
        .from('PostList')
        .select('*,VideoLikes(postIdRef,userEmail),Users(*)')
        .eq('emailRef', params.user.email)
        .order('id', {ascending: false})

        if(data){
        setPostList(data)
        setLoading(false)
        }
        if(error){
        setLoading(false)
        }
    }
  return (
    <View style={{padding:20, paddingTop:25}}>
      <OtherUserProfileIntro user={params.user} postList={postList}/>
      <UserPostList
        postList={postList}
        GetLatestVideoList={getUserPost}
        loading={loading}
      />
    </View>
  )
}

export default OtherUserProfile

const styles = StyleSheet.create({})