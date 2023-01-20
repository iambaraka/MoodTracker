import { StyleSheet, ScrollView } from 'react-native';

import { FunctionComponent } from 'react';
import { MoodItemRow } from '../components/MoodItemRow';
import { useAppContext } from '../providers/App.provider';

export const History: FunctionComponent = () => {
  const { moodList } = useAppContext();

  return (
    <ScrollView style={styles.container}>
      {moodList.map((item) => (
        <MoodItemRow key={item.timestamp} item={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
