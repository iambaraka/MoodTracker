import { StyleSheet, View } from 'react-native';

import { FunctionComponent } from 'react';
import { MoodPicker } from '../components/MoodPicker';
import { useAppContext } from '../providers/App.provider';

export const Home: FunctionComponent = () => {
  const { handleSelectMood } = useAppContext();

  return (
    <View style={styles.container}>
      <MoodPicker handleSelectMood={handleSelectMood} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
