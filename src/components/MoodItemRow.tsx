import {
  Pressable,
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
} from 'react-native';

import { FunctionComponent, useCallback } from 'react';
import { MoodOptionWithTimestamp } from '../types';
import { format } from 'date-fns';
import { theme } from '../theme';
import { useAppContext } from '../providers/App.provider';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const ReanimatedView = Reanimated.createAnimatedComponent(View);

type MoodItemRowProps = {
  item: MoodOptionWithTimestamp;
};

export const MoodItemRow: FunctionComponent<MoodItemRowProps> = ({ item }) => {
  const { handleDeleteMood } = useAppContext();

  const handleDelete = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    handleDeleteMood(item);
  }, [handleDeleteMood, item]);

  const END_POSITION = 100;
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);

  const deleteWithDelay = useCallback(() => {
    setTimeout(() => {
      handleDelete();
    }, 500);
  }, [handleDelete]);

  const panGestureEvent = Gesture.Pan()
    .onUpdate((e) => {
      if (onLeft.value) {
        position.value = e.translationX;
      } else {
        position.value = END_POSITION + e.translationX;
      }
    })
    .onEnd((e) => {
      if (Math.abs(position.value) > END_POSITION) {
        position.value = withTiming(1000 * Math.sign(position.value));
        onLeft.value = false;
        runOnJS(deleteWithDelay)();
      } else {
        position.value = withTiming(0, { duration: 100 });
        onLeft.value = true;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <GestureDetector gesture={panGestureEvent}>
      <ReanimatedView style={[styles.moodItem, animatedStyle]}>
        <View style={styles.iconAndDescription}>
          <Text style={styles.moodValue}>{item.mood.emoji}</Text>
          <Text style={styles.moodDescription}>{item.mood.description}</Text>
        </View>
        <Text style={styles.moodDate}>
          {format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
        </Text>
        <Pressable onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </ReanimatedView>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  moodValue: {
    textAlign: 'center',
    fontSize: 40,
    marginRight: 10,
  },
  moodDate: {
    textAlign: 'center',
    color: theme.colorLavender,
    fontFamily: theme.fontFamilyRegular,
  },
  moodItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodDescription: {
    fontSize: 18,
    color: theme.colorPurple,
    fontFamily: theme.fontFamilyBold,
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    color: theme.colorPurple,
    fontFamily: theme.fontFamilyBold,
    fontSize: 12,
  },
});
