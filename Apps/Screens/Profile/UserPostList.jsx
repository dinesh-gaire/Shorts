import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useState} from 'react'
import VideoThumbnailItem from '../Home/VideoThumbnailItem'

const UserPostList = ({postList, GetLatestVideoList, loading}) => {

  return (
    <View>
        <FlatList
        numColumns={2}
          data={postList}
          style={{display:'flex'}}
          renderItem={({item, index})=>(
            <VideoThumbnailItem video={item} refreshData={()=>GetLatestVideoList()}/>
          )}
          onRefresh={GetLatestVideoList}
          refreshing={loading}
        />
    </View>
        
  )
}

export default UserPostList

const styles = StyleSheet.create({})