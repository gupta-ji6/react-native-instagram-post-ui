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
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const heartRotationDegress = [-35, -25, -15, 15, 25, 35];

export default function InstagramPost(props) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const scale = useSharedValue(0);
  const rotate = useSharedValue(0);
  const translateY = useSharedValue(0);

  const heartStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: Math.max(scale.value, 0), // added Math.max to avoid negative values when withSping(0) is called
      },
      {
        rotate: `${rotate.value}deg`,
      },
      {
        translateY: translateY.value,
      },
    ],
  }));

  const onDoubelTapStart = useCallback(() => {
    const randomHeartRotationDegress =
      heartRotationDegress[
        Math.floor(Math.random() * heartRotationDegress.length)
      ];

    scale.value = withSpring(1.5, undefined, (isFinished) => {
      if (isFinished) {
        rotate.value = withTiming(
          randomHeartRotationDegress,
          undefined,
          (isFinished) => {
            if (isFinished) {
              rotate.value = withTiming(0);
            }
          }
        );
        translateY.value = withTiming(
          -windowHeight / 2,
          {
            duration: 1250,
            easing: Easing.inOut(Easing.cubic),
          },
          (isFinished) => {
            if (isFinished) {
              scale.value = 0;
              translateY.value = 0;
            }
          }
        );
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
