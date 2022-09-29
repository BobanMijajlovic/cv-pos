import {TButtomTabs} from 'src/components/bottomTabs/d';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const BottomTabs = ({buttomsTab}: {buttomsTab: TButtomTabs[]}) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      {buttomsTab.map((buttomTab, key) => {
        return (
          <Tab.Screen
            key={key}
            name={buttomTab.name}
            component={buttomTab.component}
            options={{
              tabBarLabel: buttomTab.title,
              headerShown: false,
              lazy: true,
              tabBarIcon: ({color, size = 25}) => (
                <FontAwesome5Icon
                  name={buttomTab.icon}
                  color={color}
                  size={size}
                />
              ),
              tabBarIconStyle: {
                zIndex: 1,
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTabs;
