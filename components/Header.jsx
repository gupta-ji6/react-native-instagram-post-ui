import React from 'react';
import { View, Text, Image } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

export const Header = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      <Image
        source={{
          uri: 'https://github.com/gupta-ji6.png',
        }}
        style={{
          width: 30,
          height: 30,
          borderRadius: 30 / 2,
          marginRight: 10,
        }}
      />
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'stretch',
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>_.guptaji._</Text>
        <Text style={{ fontSize: 12 }}>Sethan, Himachal Pradesh</Text>
      </View>

      <View style={{ marginLeft: 'auto' }}>
        <SimpleLineIcons name='options' size={16} color='black' />
      </View>
    </View>
  );
};
