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
import DonationDetailScreen from '../screens/DonationDetailScreen';
import Organizations from '../screens/Organizations';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import Settings from '../screens/Settings';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import Blogs from '../screens/Blogs';
import BlogDetail from '../screens/BlogDetail';

import CreateBlogPost from '../screens/CreateBlogPost';
import Donation from '../screens/Donation';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'none'
      }}
    >
      {/* Welcome Screens */}
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="Welcome1" component={Welcome1} />
      <Stack.Screen name="Welcome2" component={Welcome2} />
      <Stack.Screen name="Welcome3" component={Welcome3} />
      <Stack.Screen name="Welcome4" component={Welcome4} />

      {/* Auth Screens */}
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} />

      {/* Main Screens */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Donation" component={Donation} />
      <Stack.Screen name="Organizations" component={Organizations} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Settings" component={Settings} />
      {/* Blog Section */}
      <Stack.Screen name="Blogs" component={Blogs} />
      <Stack.Screen name="BlogDetail" component={BlogDetail} />
      <Stack.Screen name="CreateBlogPost" component={CreateBlogPost} />
      {/* Donation Detail Screen */}
      <Stack.Screen name="DonationDetailScreen" component={DonationDetailScreen} />
      {/* Other Detail Screens */}
      
    </Stack.Navigator>
  );
};

export default AppNavigator; 