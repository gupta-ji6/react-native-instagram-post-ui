import React from 'react';
import { View } from 'react-native';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { Header } from './components/Header';

export default function InstagramPost(props) {
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
          <View
            style={{
              height: 120,
              width: 120,
              backgroundColor: '#b58df1',
              borderRadius: 20,
              marginBottom: 30,
            }}
          />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}
