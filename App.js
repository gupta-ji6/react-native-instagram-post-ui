import React, { useCallback } from 'react';
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
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function InstagramPost(props) {
  const { width: windowWidth } = useWindowDimensions();
  const scale = useSharedValue(0);

  const heartStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: Math.max(scale.value, 0), // added Math.max to avoid negative values when withSping(0) is called
      },
    ],
  }));

  const onDoubelTapStart = useCallback(() => {
    scale.value = withSpring(1.25, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      console.log('Single tap!');
    });

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(onDoubelTapStart);

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
              uri: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
            }}
            style={{
              width: windowWidth,
              height: windowWidth,
              backgroundColor: 'transparent',
            }}
          >
            <AnimatedImage
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
                heartStyles,
              ]}
              resizeMode='center'
            />
          </ImageBackground>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}
