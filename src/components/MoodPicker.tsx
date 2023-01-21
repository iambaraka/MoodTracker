import { FunctionComponent, useCallback, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { MoodOptionType } from '../types';
import { theme } from '../theme';

const imageSrc = require('../../assets/images/butterflies.png');

const ReanimatedButton = Reanimated.createAnimatedComponent(Pressable);

const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

type MoodPickerProps = {
  handleSelectMood: (mood: MoodOptionType) => void;
};

export const MoodPicker: FunctionComponent<MoodPickerProps> = ({
  handleSelectMood,
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();
  const [hasSelectedMood, setHasSelectedMood] = useState(false);

  const handleSelect = useCallback(() => {
    if (selectedMood) {
      handleSelectMood(selectedMood);
      setSelectedMood(undefined);
      setHasSelectedMood(true);
    }
  }, [selectedMood, handleSelectMood]);

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood ? withTiming(1) : withTiming(0.5),
      transform: [
        {
          scale: selectedMood ? withTiming(1) : withTiming(0.8),
        },
      ],
    }),
    [selectedMood]
  );

  if (hasSelectedMood) {
    return (
      <View style={styles.container}>
        <Image source={imageSrc} style={styles.img} />

        <Pressable
          style={styles.button}
          onPress={() => {
            setHasSelectedMood(false);
          }}
        >
          <Text style={styles.buttonText}>Choose Another</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map((option) => (
          <View key={option.emoji}>
            <Pressable
              onPress={() => setSelectedMood(option)}
              style={[
                styles.moodItem,
                option.emoji === selectedMood?.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}
            >
              <Text style={styles.moodText}>{option.emoji}</Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {selectedMood?.emoji === option.emoji ? option.description : ' '}
            </Text>
          </View>
        ))}
      </View>
      <ReanimatedButton
        style={[styles.button, buttonStyle]}
        onPress={handleSelect}
      >
        <Text style={styles.buttonText}>Choose</Text>
      </ReanimatedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  moodText: {
    fontSize: 24,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  descriptionText: {
    color: theme.colorPurple,
    fontSize: 10,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: theme.fontFamilyBold,
  },
  container: {
    height: 250,
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: theme.colorPurple,
    margin: 10,
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.0.2)',
  },
  heading: {
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
    color: theme.colorWhite,
    fontFamily: theme.fontFamilyBold,
  },
  button: {
    backgroundColor: theme.colorPurple,
    width: 150,
    borderRadius: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: 'center',
    fontFamily: theme.fontFamilyBold,
  },
  img: {
    alignSelf: 'center',
  },
});
