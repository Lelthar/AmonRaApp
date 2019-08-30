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

import Icon from 'react-native-vector-icons/FontAwesome';

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

import HamburgerMenu from '../partials/hamburger_button'

const mapStack = createStackNavigator(
  {
    Map: {
      screen: mapComponent,
      navigationOptions: {
        title: "Mapa",
        //header: null
        //tabBarVisible: false,
        headerRight: <HamburgerMenu />,
      },
    },
    Place: {
      screen: placeComponent,
      navigationOptions: {
        headerRight: <HamburgerMenu />,
      },
    },
  }
);

const virtualVisitStack = createStackNavigator(
  {
    VirtualVisit: {
      screen: virtualVisitComponent,
      navigationOptions: {
        headerRight: <HamburgerMenu />,
      },
    },
    ViromediaController: {
      screen: viromediaControllerComponent,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
      },
    }
    
  },
  {
    initialRouteName: 'VirtualVisit',
  }
);

const urbanOfferStack = createStackNavigator(
  {
    UrbanOffer: {
      screen: urbanOfferComponent,
      navigationOptions: {
        headerRight: <HamburgerMenu />,
      },
    },
    Cultural: {
      screen: culturalComponent,
      navigationOptions: {
        headerRight: <HamburgerMenu />,
      },
    },
    Institutional: {
      screen: institutionalComponent,
      navigationOptions: {
        headerRight: <HamburgerMenu />,
      },
    },
    Hotels: {
      screen: hotelsComponent,
      navigationOptions: {
        headerRight: <HamburgerMenu />,
      },
    },
    Gastronomy: {
      screen: gastronomyComponent,
      navigationOptions: {
        headerRight: <HamburgerMenu />,
      },
    },
    SeeMore: {
      screen: seeMoreComponent,
      navigationOptions: {
        headerRight: <HamburgerMenu />,
      },
    },
  },
  {
    initialRouteName: 'UrbanOffer',
  }
);

const augmentedRealityStack = createStackNavigator(
  {
    AumentedReality: {
      screen: viromediaControllerComponent,
      params: {
        do: "AR",
      },
      navigationOptions: {
        headerRight: <HamburgerMenu />,
      },
    },
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
        title: "Time Line",
        headerRight: <HamburgerMenu />,
      },
    },
  },
    {
      initialRouteName: 'TimeLine',
    }
);

const AppNavigator = createBottomTabNavigator(
  {
    Map: mapStack,
    AumentedReality: augmentedRealityStack,
    VirtualVisit: {
      screen: virtualVisitStack,
      navigationOptions: ({ navigation }) => ({
        tabBarVisible: !(navigation.state.index === 1),
      }),
    },
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