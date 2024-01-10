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
import { Ionicons } from '@expo/vector-icons';

const heartRotationDegress = [-35, -25, -15, 15, 25, 35];
const INITIAL_SCALE_VALUE = 0;
const INITIAL_ROTATE_VALUE = 0;
const INITIAL_TRANSLATE_Y_VALUE = 0;
const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function InstagramPost(props) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const scale = useSharedValue(INITIAL_SCALE_VALUE);
  const rotate = useSharedValue(INITIAL_ROTATE_VALUE);
  const translateY = useSharedValue(INITIAL_TRANSLATE_Y_VALUE);

  const heartStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: Math.max(scale.value, INITIAL_SCALE_VALUE), // added Math.max to avoid negative values when withSping(0) is called
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
              rotate.value = withTiming(INITIAL_ROTATE_VALUE);
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
              scale.value = INITIAL_SCALE_VALUE;
              translateY.value = INITIAL_TRANSLATE_Y_VALUE;
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
            source={require('./assets/dogs.jpeg')}
            style={{
              width: windowWidth,
              height: windowWidth,
              backgroundColor: 'transparent',
            }}
          >
            <AnimatedImage
              source={require('./assets/heart.png')}
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

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            columnGap: 10,
          }}
        >
          <Ionicons name='heart-outline' size={28} color='black' />
          <Ionicons name='chatbubble-outline' size={24} color='black' />
          <Ionicons name='share-outline' size={24} color='black' />
          <View style={{ marginLeft: 'auto' }}>
            <Ionicons name='bookmark-outline' size={24} color='black' />
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
