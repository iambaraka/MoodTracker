import { ImageBackground, StyleSheet, View } from 'react-native';

import { FunctionComponent } from 'react';
import { MoodPicker } from '../components/MoodPicker';
import { useAppContext } from '../providers/App.provider';

const imageUrl =
  'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1766&q=80';

export const Home: FunctionComponent = () => {
  const { handleSelectMood } = useAppContext();

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: imageUrl }} style={styles.img}>
        <MoodPicker handleSelectMood={handleSelectMood} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  img: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
