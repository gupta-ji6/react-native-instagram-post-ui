import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Header } from './components/Header';

export default function InstagramPost(props) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Header />
      </View>
    </GestureHandlerRootView>
  );
}
