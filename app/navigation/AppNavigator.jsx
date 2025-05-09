import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import LoadingScreen from '../screens/LoadingScreen';
import Welcome1 from '../screens/Welcome/Welcome1';
import Welcome2 from '../screens/Welcome/Welcome2';
import Welcome3 from '../screens/Welcome/Welcome3';
import Welcome4 from '../screens/Welcome/Welcome4';
import VerifyEmail from '../screens/VerifyEmail';
import CreateNewPasswordScreen from '../screens/CreateNewPassword';
import Home from '../screens/Home';
// import Donation from '../screens/Donation';
import DonationDetailScreen from '../screens/DonationDetailScreen';
// import DonationNavigation from '../screens/DonationNavigation';

import Organizations from '../screens/Organizations';

import Profile from '../screens/Profile';

import CauseDetail from '../screens/CauseDetail';
import EditProfile from '../screens/EditProfile';
import Settings from '../screens/Settings';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
// import DonationDetailScreen from '../screens/Donation/DonationDetailScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="Welcome1" component={Welcome1} />
      <Stack.Screen name="Welcome2" component={Welcome2} />
      <Stack.Screen name="Welcome3" component={Welcome3} />
      <Stack.Screen name="Welcome4" component={Welcome4} />


      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} /> 


      <Stack.Screen name="Home" component={Home} />

{/* 
      <Stack.Screen name="Donation" component={Donation} /> */}
      <Stack.Screen name="DonationDetailScreen" component={DonationDetailScreen} />
    
      <Stack.Screen name="Organizations" component={Organizations} />
      
     




      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Settings" component={Settings} />
      
    </Stack.Navigator>
  );
};

export default AppNavigator; 