import { BottomTabsNavigator } from './screens/BottomTabs.navigation';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export const App = () => {
  return (
    <NavigationContainer>
      <BottomTabsNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
  },
});
