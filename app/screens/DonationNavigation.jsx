import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import  Donation  from './Donation';
import   Donationinside  from './Donation';
import {DonationDetailsScreen } from './DonationDetailScreen';

const Stack = createStackNavigator();

export default function DonationNavigtor() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Donation">
        <Stack.Screen 
          name="Donation" 
          component={Donation} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Donationinside" 
          component={Donation} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="DonationDetails" 
          component={DonationDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}