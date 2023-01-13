import { StyleSheet, Text, View } from 'react-native';

import { FunctionComponent } from 'react';

export const Analytics: FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
