import React from 'react';
import { Clipboard, TouchableOpacity } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {COLORS} from './src/Styles/colors';
import TabButton from './src/Components/TabButton';
import QRCodeView from './src/Views/QRCodeView';
import ProfileView from './src/Views/ProfileView';
import ScanView from './src/Views/ScanView';
import ScanInstructionsView from './src/Views/ScanInstructionsView';
import WalletView from './src/Views/WalletView';
import { ProfileProvider } from './src/Context/ProfileContext';
import SettingsView from './src/Views/SettingsView';
import ContactUsView from './src/Views/ContactUsView';
import CardDetailView from './src/Views/CardDetailView';

// HACK: Prevent "Expo pasted from CoreSimulator" notification from spamming continuously
if (__DEV__) {
  Clipboard.setString('')
}

// Needed to make touchable opacities more reactive to the touch
TouchableOpacity.defaultProps = {...(TouchableOpacity.defaultProps || {}), delayPressIn: 0};

const qrScanNavigation = createSwitchNavigator({
  ScanInstructions: ScanInstructionsView,
  Scan: ScanView
}, {
  initialRouteName: 'ScanInstructions'
});

qrScanNavigation.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if ( routeName == 'Scan' ) {
      tabBarVisible = false
  }

  return {
      tabBarVisible,
  }
}

const settingsNavigation = createStackNavigator({
  Settings: SettingsView,
  Profile: {
    screen: ProfileView,
    navigationOptions: {
      title: null,
      cardStyle: { backgroundColor: 'white' }
    }
  },
  Contact: {
    screen: ContactUsView,
    navigationOptions: {
      title: null,
      cardStyle: { backgroundColor: 'white' }
    }
  },
},
{
    initialRouteName: 'Settings'
});

const walletNavigation = createStackNavigator({
  Wallet: {
    screen: WalletView,
    navigationOptions: {
      header: () => null,
      cardStyle: { backgroundColor: 'white' }
    }
  },
  CardDetail: {
    screen: CardDetailView,
    navigationOptions: {
      header: () => null,
      cardStyle: { backgroundColor: 'white' }
    }
  },
},
{
    initialRouteName: 'Wallet'
});

const tabNavigator = createBottomTabNavigator({
  QRCode: QRCodeView,
  scannerFlow: qrScanNavigation,
  walletFlow: walletNavigation,
  settingsFlow: settingsNavigation
  }, {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarButtonComponent: (props) => (
        <TabButton
          routeName={navigation.state.routeName}
          {...props}
        />
      ),
      cardStyle: { backgroundColor: 'white' }
    }),
    initialRouteName: 'QRCode',
    tabBarOptions: {
      style: {
        height: 55
      },
      inactiveBackgroundColor: COLORS.primary,
      activeBackgroundColor: 'white'
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