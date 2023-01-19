import { StyleSheet, Text, View } from 'react-native';

import { FunctionComponent } from 'react';
import { useAppContext } from '../providers/App.provider';

export const Analytics: FunctionComponent = () => {
  const appContext = useAppContext();

  return (
    <View style={styles.container}>
      <Text>{appContext.greeting} from Analytics screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
