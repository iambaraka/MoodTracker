import { StyleSheet, Text, View } from 'react-native';

import { FunctionComponent } from 'react';

export const History: FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Text>History</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
