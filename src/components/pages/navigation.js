import { createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation'
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
import placeComponent from '../../../components/Map/Place/Place'

import augmentedRealityComponent from '../../../components/Viromedia/ViromediaController';

import virtualVisitComponent from '../../../components/VirtualVisit/VirtualVisit';
import viromediaControllerComponent from '../../../components/Viromedia/ViromediaController';

import urbanOfferComponent from '../../../components/Directory/Directory';
import culturalComponent from '../../../components/Directory/CultureArt/CultureArt';
import institutionalComponent from '../../../components/Directory/Institutional/Institutional';
import hotelsComponent from '../../../components/Directory/Hotels/Hotels';
import gastronomyComponent from '../../../components/Directory/Gastronomy/Gastronomy';
import seeMoreComponent from '../../../components/Directory/SeeMore/SeeMore';

import timeLineComponent from '../../../components/TimeLine/TimeLine';

import styles from "../../assets/styles/pages/navigation";
import * as screenInformation from "../../assets/constants/navigation";

const mapStack = createStackNavigator(
  {
    Map: {
      screen: mapComponent,
      navigationOptions: {
        title: "Mapa",
        //header: null
      },
    },
    Place: placeComponent,
  },{
    /*headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }*/
   }
);

const virtualVisitStack = createStackNavigator(
  {
    VirtualVisit: virtualVisitComponent,
    ViromediaController: {
      screen: viromediaControllerComponent,
      navigationOptions: {
        header: null
      },
    }
    
  },
  {
    initialRouteName: 'VirtualVisit',
  }
);

const urbanOfferStack = createStackNavigator(
  {
    UrbanOffer: urbanOfferComponent,
    Cultural: culturalComponent,
    Institutional: institutionalComponent,
    Hotels: hotelsComponent,
    Gastronomy: gastronomyComponent,
    SeeMore: seeMoreComponent,
  },
  {
    initialRouteName: 'UrbanOffer',
  }
);

const augmentedRealityStack = createStackNavigator(
  {
    AumentedReality: viromediaControllerComponent,
  },
  {
    initialRouteName: 'AumentedReality',
  }
);

const timeLineStack = createStackNavigator(
  {
    TimeLine: {
      screen: timeLineComponent,
      navigationOptions: {
          title: "Time Line"
      },
    },
  },
    {
      initialRouteName: 'TimeLine',
    }
);


const AppNavigator = createBottomTabNavigator(
  {
    /*MapStack: {
      screen: mapComponent,
      navigationOptions: {
            title: 'Home',
            tabBarVisible: true,
            // other default options
      }
    },*/
    Map: mapStack,
    AumentedReality: augmentedRealityStack,
    VirtualVisit: virtualVisitStack,
    UrbanOffer: urbanOfferStack,
    TimeLine: timeLineStack,
  },
  {
    initialRouteName: "Map",
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