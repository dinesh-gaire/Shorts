import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Ionicons} from '@expo/vector-icons'
import Colors from '../../Utils/Colors';

const OtherUserProfileIntro = ({user, postList}) => {
    const [totalPostLikes, setTotalPostLikes] = useState(0)
    useEffect(()=>{
        countTotalLikes();
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
            source={{uri:user.profileImage}}
            style={{
                width:90,
                height:90,
                borderRadius:99
            }}
        />
        <Text style={{fontFamily:'outfit-medium', fontSize:22}}>{user?.name}</Text>
        <Text style={{
            fontFamily:'outfit', 
            fontSize:17,
            color:Colors.BACKGROUND_TRANSP
        }}>
            {user?.email}
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

export default OtherUserProfileIntro

const styles = StyleSheet.create({})