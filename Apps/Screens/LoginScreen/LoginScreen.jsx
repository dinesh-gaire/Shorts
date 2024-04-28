import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Video, ResizeMode } from 'expo-av'
import Colors from '../../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

import GoogleLogo from '../../../assets/images/glogo.png'
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
import { supabase } from '../../Utils/SupabaseConfig';

const LoginScreen = () => {

    useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
        if(signUp?.emailAddress){
            
            const { data, error } = await supabase
            .from('Users')
            .insert([
            { name: signUp?.firstName, 
              email: signUp?.emailAddress,
              username: (signUp?.emailAddress).split('@'[0])
            },
            ])
            .select()

            if(data){
                console.log(data);
            }
        
        }
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={{flex:1, paddingHorizontal:15}}>
      <Video
        style={styles.video}
        source={{
            uri: 'https://cdn.pixabay.com/video/2023/10/12/184734-873923034_large.mp4'
        }}
        shouldPlay
        resizeMode='cover'
        isLooping={true}
      />
      <View style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100
      }}>
        <Text style={{
            fontFamily: 'outfit-bold',
            color: Colors.WHITE,
            fontSize:35
        }}>
            Tik Tok
        </Text>
        <Text
            style={{
                fontFamily: 'outfit',
                color: Colors.WHITE,
                fontSize: 17,
                textAlign: 'center',
                marginTop:15
            }}
        >
            Ultimate Place to Share your Short Videos with Great Community
        </Text>
        <TouchableOpacity 
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                backgroundColor: Colors.WHITE,
                padding: 10,
                paddingHorizontal: 25,
                borderRadius: 99,
                position: 'absolute',
                bottom: -450
            }}
            onPress={onPress}
        >
            <Image
                source={GoogleLogo}
                style={{
                    width: 30,
                    height: 30
                }}
            />
            <Text
                style={{
                    fontFamily: 'outfit'
                }}
            >Sign In with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    video:{
        height: '100%',
        width: 1000,
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
    }
})