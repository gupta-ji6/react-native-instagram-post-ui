import React from 'react';
import {
  Image,
  ImageBackground,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { Header } from './components/Header';

export default function InstagramPost(props) {
  const { width: windowWidth } = useWindowDimensions();

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      console.log('Single tap!');
    });

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      console.log('Double tap!');
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Header />
        <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
          <ImageBackground
            source={{
              uri: 'https://legacy.reactjs.org/logo-og.png',
            }}
            style={{
              width: windowWidth,
              height: windowWidth,
              backgroundColor: 'transparent',
            }}
          >
            <Image
              source={{
                uri: 'https://www.freeiconspng.com/thumbs/heart-icon/valentine-heart-icon-6.png',
              }}
              style={[
                {
                  width: windowWidth,
                  height: windowWidth,
                  shadowOffset: { width: 0, height: 20 },
                  shadowOpacity: 0.35,
                  shadowRadius: 35,
                  backgroundColor: 'transparent',
                },
              ]}
              resizeMode='center'
            />
          </ImageBackground>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}
