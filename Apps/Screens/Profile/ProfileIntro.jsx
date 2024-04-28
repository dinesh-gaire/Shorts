import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors';
import {Ionicons} from '@expo/vector-icons'

const ProfileIntro = ({postList}) => {
    const {user} = useUser();
    const [totalPostLikes, setTotalPostLikes] = useState(0)

    useEffect(()=>{
        postList && countTotalLikes();
    },[postList])

    const countTotalLikes =()=>{
        let totalLikes = 0;
        postList.forEach(element=>{
            // console.log(element.VideoLikes?.length);
            totalLikes = totalLikes + element.VideoLikes?.length
        })
        setTotalPostLikes(totalLikes);
    }

  return (
    <View style={{marginTop:30}}>
      <Text style={{fontFamily:'outfit-bold', fontSize:24}}>Profile</Text>
      <View style={{alignItems:'center', marginTop:20}}>
        <Image
            source={{uri:user.imageUrl}}
            style={{
                width:90,
                height:90,
                borderRadius:99
            }}
        />
        <Text style={{fontFamily:'outfit-medium', fontSize:22}}>{user?.fullName}</Text>
        <Text style={{
            fontFamily:'outfit', 
            fontSize:17,
            color:Colors.BACKGROUND_TRANSP
        }}>
            {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <View style={{
        marginTop:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      }}>
        <View style={{padding:20, alignItems:'center'}}>
            <Ionicons name='videocam' size={20} color="black"/>
            <Text style={{fontFamily:'outfit-bold', fontSize:20}}>{postList?.length}</Text>
            <Text style={{fontFamily:'outfit-bold', fontSize:20}}>Post</Text>
        </View>
        <View style={{padding:20, alignItems:'center'}}>
            <Ionicons name="heart" size={20} color="black"/>
            <Text style={{fontFamily:'outfit-bold', fontSize:20}}>{totalPostLikes}</Text>
            <Text style={{fontFamily:'outfit-bold', fontSize:20}}>Like</Text>
        </View>
      </View>
    </View>
  )
}

export default ProfileIntro

const styles = StyleSheet.create({})