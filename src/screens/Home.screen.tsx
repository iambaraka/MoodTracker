import { StyleSheet, View } from 'react-native';

import { FunctionComponent } from 'react';
import { MoodPicker } from '../components/MoodPicker';

export const Home: FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <MoodPicker />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
