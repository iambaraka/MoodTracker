import { FunctionComponent, useCallback, useState } from 'react';
import { MoodOptionType, MoodOptionWithTimestamp } from '../types';
import { StyleSheet, View } from 'react-native';

import { MoodItemRow } from '../components/MoodItemRow';
import { MoodPicker } from '../components/MoodPicker';

export const Home: FunctionComponent = () => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback((mood: MoodOptionType) => {
    setMoodList((prevMoodList) => [
      ...prevMoodList,
      {
        mood,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <MoodPicker handleSelectMood={handleSelectMood} />
      {moodList.map((item) => (
        <MoodItemRow key={item.timestamp} item={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
