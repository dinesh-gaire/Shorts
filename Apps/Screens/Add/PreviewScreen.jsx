import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Colors from '../../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';

const PreviewScreen = () => {

    const params = useRoute().params;
    const navigation = useNavigation();
    const [description, setDescription] = useState('')

    const publishHandler=()=>{
        
    }

  return (
    <KeyboardAvoidingView style={{backgroundColor:Colors.WHITE, flex:1}}>
        <ScrollView style={{padding:20}}>
            <TouchableOpacity 
                style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}
                onPress={()=>navigation.goBack()}
            >
                <Ionicons name="arrow-back-circle" size={44} color="black" />
                <Text style={{fontFamily:'outfit', fontSize:20}}>Back</Text>
            </TouchableOpacity>
            <View style={{
                alignItems: 'center',
                marginTop:100,
            }}>
                <Text style={{fontFamily:'outfit-bold', fontSize:20}}>Add Details</Text>
                <Image source={{uri:params?.thumbnail}}
                    style={{
                        width: 200,
                        height: 300,
                        borderRadius: 15,
                        marginTop: 15
                    }}
                />
                <TextInput
                    numberOfLines={3}
                    placeholder='Description'
                    style={{
                        borderWidth:1,
                        width:'100%',
                        borderRadius: 10,
                        marginTop: 25,
                        borderColor: Colors.BACKGROUND_TRANSP,
                        paddingHorizontal:20
                    }}
                    onChangeText={(value)=>setDescription(value)}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor:Colors.BLACK,
                        padding:10,
                        paddingHorizontal:25,
                        borderRadius:99,
                        marginTop:20
                    }}
                    
                >
                    <Text style={{color:Colors.WHITE, fontFamily:'outfit'}}>Publish</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
    
  )
}

export default PreviewScreen

const styles = StyleSheet.create({})