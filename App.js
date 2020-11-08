import React from 'react';
import { Clipboard, TouchableOpacity } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {COLORS} from './src/Styles/colors';
import TabButton from './src/Components/TabButton';
import QRCodeView from './src/Views/QRCodeView';
import ProfileView from './src/Views/ProfileView';
import QRCodeScanView from './src/Views/QRCodeScanView';
import ScanInstructionsView from './src/Views/ScanInstructionsView';
import WalletView from './src/Views/WalletView';
import { ProfileProvider } from './src/Context/ProfileContext';

// HACK: Prevent "Expo pasted from CoreSimulator" notification from spamming continuously
if (__DEV__) {
  Clipboard.setString('')
}

// Needed to make touchable opacities more reactive to the touch
TouchableOpacity.defaultProps = {...(TouchableOpacity.defaultProps || {}), delayPressIn: 0};

const qrScanNavigation = createSwitchNavigator({
  ScanInstructions: ScanInstructionsView,
  QRCodeScan: QRCodeScanView
}, {
  initialRouteName: 'ScanInstructions'
},);

qrScanNavigation.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if ( routeName == 'QRCodeScan' ) {
      tabBarVisible = false
  }

  return {
      tabBarVisible,
  }
}

const tabNavigator = createBottomTabNavigator({
  QRCode: QRCodeView,
  Profile: ProfileView,
  scannerFlow: qrScanNavigation,
  Wallet: WalletView
  }, {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarButtonComponent: (props) => (
        <TabButton
          routeName={navigation.state.routeName}
          {...props}
        />
      ),
    }),
    initialRouteName: 'QRCode',
    tabBarOptions: {
      style: {
        height: 100
      },
      activeBackgroundColor: COLORS.primary
    },
});


const App = createAppContainer(tabNavigator);

export default () => {
  return (
    <ProfileProvider>
      <App/>
    </ProfileProvider>
  );
};