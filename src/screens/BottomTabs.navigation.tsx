import { Analytics } from './Analytics.screen';
import { FunctionComponent } from 'react';
import { History } from './History.screen';
import { Home } from './Home.screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: FunctionComponent = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Home" component={Home} />
      <BottomTabs.Screen name="History" component={History} />
      <BottomTabs.Screen name="Analytics" component={Analytics} />
    </BottomTabs.Navigator>
  );
};
