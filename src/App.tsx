import { AppProvider } from './providers/App.provider';
import { BottomTabsNavigator } from './screens/BottomTabs.navigation';
import { NavigationContainer } from '@react-navigation/native';

export const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};
