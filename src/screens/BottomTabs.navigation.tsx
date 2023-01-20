import { HomeIcon, ListIcon } from '../icons';

import { Analytics } from './Analytics.screen';
import { AnalyticsIcon } from '../icons/AnalyticsIcon';
import { FunctionComponent } from 'react';
import { History } from './History.screen';
import { Home } from './Home.screen';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '../theme';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: FunctionComponent = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colorBlue,
        tabBarInactiveTintColor: theme.colorGray,
        tabBarShowLabel: false,
        headerTitleStyle: {
          fontFamily: theme.fontFamilyRegular,
        },
        tabBarIcon: ({ color }) => {
          if (route.name === 'Home') {
            return <HomeIcon size={24} color={color} />;
          }

          if (route.name === 'History') {
            return <ListIcon size={24} color={color} />;
          }

          if (route.name === 'Analytics') {
            return <AnalyticsIcon size={24} color={color} />;
          }

          return <Text>{route.name}</Text>;
        },
      })}
    >
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{
          title: "Today's Mood",
        }}
      />
      <BottomTabs.Screen
        options={{
          title: 'Past Moods',
        }}
        name="History"
        component={History}
      />
      <BottomTabs.Screen
        name="Analytics"
        component={Analytics}
        options={{
          title: 'Fancy Graphs',
        }}
      />
    </BottomTabs.Navigator>
  );
};
