import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

export const PostActions = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const likeScale = useSharedValue(1);

  const likeStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: likeScale.value,
      },
    ],
  }));

  const onLikePress = () => {
    setIsLiked(!isLiked);
    likeScale.value = withSpring(
      isLiked ? 0.9 : 1.1,
      { duration: 200 },
      (isFinished) => {
        if (isFinished) {
          likeScale.value = withTiming(1);
        }
      }
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        columnGap: 10,
      }}
    >
      <TouchableOpacity onPress={onLikePress}>
        <AnimatedIonicons
          name={isLiked ? 'heart' : 'heart-outline'}
          size={28}
          color='black'
          style={[likeStyles]}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name='chatbubble-outline' size={24} color='black' />
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name='share-outline' size={24} color='black' />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginLeft: 'auto' }}
        onPress={() => setIsBookmarked(!isBookmarked)}
      >
        <Ionicons
          name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
          size={24}
          color='black'
        />
      </TouchableOpacity>
    </View>
  );
};
