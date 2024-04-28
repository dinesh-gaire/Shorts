import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfileIntro from './ProfileIntro'
import { supabase } from '../../Utils/SupabaseConfig'
import { useUser } from '@clerk/clerk-expo'
import UserPostList from './UserPostList'

const ProfileScreen = () => {
  const {user} = useUser();
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    user && getUserPost();
  },[user])

  const getUserPost=async()=>{
    setLoading(true);
    const {data, error} = await supabase
    .from('PostList')
    .select('*,VideoLikes(postIdRef,userEmail),Users(*)')
    .eq('emailRef', user?.primaryEmailAddress.emailAddress)
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
      <FlatList
        data={[{id:1}]}
        showsVerticalScrollIndicator={false}
        onRefresh={()=>getUserPost()}
        refreshing={loading}
        renderItem={({item, index})=>(
          <View>
              <ProfileIntro postList={postList}/>
              <UserPostList 
                postList={postList}
                GetLatestVideoList={getUserPost}
                loading={loading}
              />
          </View>

        )}
      />
      
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})