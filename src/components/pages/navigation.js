import { createBottomTabNavigator, createAppContainer} from 'react-navigation'
import React from 'react'
import { Image } from 'react-native'
import {
  Map, MapDisable,
  AugmentedReality, AugmentedRealityDisable,
  VirtualVisit, VirtualVisitDisable,
  UrbanOffer,  UrbanOfferDisable,
  TimeLine, TimeLineDisable
} from '../../assets/images/navigation';

import mapComponent from './map';
import augmentedRealityComponent from '../../../components/Viromedia/ViromediaController';
import virtualVisitComponent from '../../../components/VirtualVisit/VirtualVisit';
import urbanOfferComponent from '../../../components/Directory/Directory';
import timeLineComponent from '../../../components/TimeLine/TimeLine';

import styles from "../../assets/styles/pages/navigation";
import * as screenInformation from "../../assets/constants/navigation";

const AppNavigator = createBottomTabNavigator(
  {
    Map: {
      screen: mapComponent,
      navigationOptions: {
            title: 'Home',
            tabBarVisible: true,
            // other default options
      }
    },
    AumentedReality: augmentedRealityComponent,
    VirtualVisit: virtualVisitComponent,
    UrbanOffer: urbanOfferComponent,
    TimeLine: timeLineComponent,
  },
  {
    initialRouteName: screenInformation.MAP,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === screenInformation.MAP) {
          iconName = focused ? Map : MapDisable;
        } else if (routeName === screenInformation.AUGMENTEDREALITY) {
          iconName = focused ? AugmentedReality : AugmentedRealityDisable;
        } else if (routeName === screenInformation.VIRTUALVISIT) {
          iconName = focused ? VirtualVisit : VirtualVisitDisable;
        } else if (routeName === screenInformation.URBANOFFER) {
          iconName = focused ? UrbanOffer : UrbanOfferDisable;
        } else if (routeName === screenInformation.TIMELINE) {
          iconName = focused ? TimeLine : TimeLineDisable;
        }

        return <Image style={ styles.iconDimensions } source={iconName} />;
      },
    }),
    tabBarOptions: {
      showLabel: false,
    },
  }
);

export default createAppContainer(AppNavigator);