import React, { useCallback } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { PostActions } from './components/PostActions';
import { Header } from './components/Header';

const heartRotationDegress = [-35, -25, -15, 15, 25, 35];
const INITIAL_SCALE_VALUE = 0;
const INITIAL_ROTATE_VALUE = 0;
const INITIAL_TRANSLATE_Y_VALUE = 0;
const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function InstagramPost(props) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const heartScale = useSharedValue(INITIAL_SCALE_VALUE);
  const heartRotate = useSharedValue(INITIAL_ROTATE_VALUE);
  const heartTranslateY = useSharedValue(INITIAL_TRANSLATE_Y_VALUE);
  const tagIconOpacity = useSharedValue(0);
  const tagOpacity = useSharedValue(0);

  const heartStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: Math.max(heartScale.value, INITIAL_SCALE_VALUE), // added Math.max to avoid negative values when withSping(0) is called
      },
      {
        rotate: `${heartRotate.value}deg`,
      },
      {
        translateY: heartTranslateY.value,
      },
    ],
  }));

  const tagIconStyles = useAnimatedStyle(() => ({
    opacity: tagIconOpacity.value,
  }));

  const tagStyles = useAnimatedStyle(() => ({
    opacity: tagOpacity.value,
    transform: [
      {
        scale: interpolate(tagOpacity.value, [0, 1], [0.5, 1]),
      },
    ],
  }));

  const onDoubelTapStart = useCallback(() => {
    const randomHeartRotationDegress =
      heartRotationDegress[
        Math.floor(Math.random() * heartRotationDegress.length)
      ];

    heartScale.value = withSpring(1.5, undefined, (isFinished) => {
      if (isFinished) {
        heartRotate.value = withTiming(
          randomHeartRotationDegress,
          undefined,
          (isFinished) => {
            if (isFinished) {
              heartRotate.value = withTiming(INITIAL_ROTATE_VALUE);
            }
          }
        );
        heartTranslateY.value = withTiming(
          -windowHeight / 2,
          {
            duration: 1250,
            easing: Easing.inOut(Easing.cubic),
          },
          (isFinished) => {
            if (isFinished) {
              heartScale.value = INITIAL_SCALE_VALUE;
              heartTranslateY.value = INITIAL_TRANSLATE_Y_VALUE;
            }
          }
        );
      }
    });
  }, []);

  const onSingleTapStart = useCallback(() => {
    tagIconOpacity.value = withTiming(1, undefined, (isFinished) => {
      if (isFinished) {
        tagIconOpacity.value = withDelay(1500, withTiming(0));
      }
    });

    tagOpacity.value = withTiming(1, undefined, (isFinished) => {
      if (isFinished) {
        tagOpacity.value = withDelay(1500, withTiming(0));
      }
    });
  }, []);

  const singleTap = Gesture.Tap().maxDuration(250).onStart(onSingleTapStart);

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

            <Animated.View
              style={[
                { position: 'absolute', left: 10, bottom: 10 },
                tagIconStyles,
              ]}
            >
              <FontAwesome name='user' size={24} color='black' />
            </Animated.View>

            <Animated.View>
              <Animated.View
                style={[
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    width: 'auto',
                    position: 'absolute',
                    left: 80,
                    bottom: 100,
                    borderRadius: 5,
                  },
                  tagStyles,
                ]}
              >
                <Text style={{ color: 'white', fontWeight: '700' }}>
                  hardikparasher
                </Text>
              </Animated.View>

              <Animated.View
                style={[
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    width: 'auto',
                    position: 'absolute',
                    left: 200,
                    bottom: 140,
                    borderRadius: 5,
                  },
                  tagStyles,
                ]}
              >
                <Text style={{ color: 'white', fontWeight: '700' }}>
                  toucheypheonix
                </Text>
              </Animated.View>
            </Animated.View>
          </ImageBackground>
        </GestureDetector>

        <PostActions />
      </View>
    </GestureHandlerRootView>
  );
}
