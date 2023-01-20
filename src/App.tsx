import { AppProvider } from './providers/App.provider';
import { BottomTabsNavigator } from './screens/BottomTabs.navigation';
import { NavigationContainer } from '@react-navigation/native';

import { Platform, UIManager } from 'react-native';

export const App = () => {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};
