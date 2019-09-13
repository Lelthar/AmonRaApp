import { createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation'
import React from 'react'
import { Image, View} from 'react-native'
import {
  mapAble, mapDisable,
  augmentedRealityAble, augmentedRealityDisable,
  virtualVisitAble, virtualVisitDisable,
  urbanOfferAble,  urbanOfferDisable,
  timeLineAble, timeLineDisable
} from '../../assets/images/navigation';

import Map from './Map';
import Place from '../../../components/Map/Place/Place'

import VirtualVisit from '../../../components/VirtualVisit/VirtualVisit';
import ViromediaController from '../../../components/Viromedia/ViromediaController';

import UrbanOffer from '../../../components/Directory/Directory';
import CultureArt from '../../../components/Directory/CultureArt/CultureArt';
import Institutional from '../../../components/Directory/Institutional/Institutional';
import Hotels from '../../../components/Directory/Hotels/Hotels';
import Gastronomy from '../../../components/Directory/Gastronomy/Gastronomy';
import SeeMore from '../../../components/Directory/SeeMore/SeeMore';

import TimeLine from '../../../components/TimeLine/TimeLine';

import HamburgerButton from '../partials/HamburgerButton'
import HM from '../partials/HM'

import styles from "../../assets/styles/pages/navigation";
import * as screenInformation from "../../assets/constants/navigation";

const mapStack = createStackNavigator(
  {
    Map: {
      screen: Map,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Mapa",
        headerStyle:{
          backgroundColor:'#00A2B5'
        },
        headerTitleStyle:{
          color: "#FFFFFF",
          textAlign: 'center',
          flexGrow:1,
        },
        headerLeft: (<View />)
      },
    },
    Place: {
      screen: Place,
      navigationOptions: {
        headerRight: <HamburgerButton />,
      },
    },
  }
);

const virtualVisitStack = createStackNavigator(
  {
    VirtualVisit: {
      screen: VirtualVisit,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Oferta Urbana",
        headerStyle:{
          backgroundColor:'#00A2B5'
        },
        headerTitleStyle:{
          color: "#FFFFFF",
          textAlign: 'center',
          flexGrow:1,
        },
        headerLeft: (<View />)
      },
    },
    ViromediaController: {
      screen: ViromediaController,
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
      screen: UrbanOffer,

      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Oferta Urbana",
        headerStyle:{
          backgroundColor:'#00A2B5'
        },
        headerTitleStyle:{
          color: "#FFFFFF",
          textAlign: 'center',
          flexGrow:1,
        },
        headerLeft: (<View />)
      },
    },
    CultureArt: {
      screen: CultureArt,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Oferta Urbana",
        headerStyle:{
          backgroundColor:'#00A2B5'
        },
        headerTitleStyle:{
          color: "#FFFFFF",
          textAlign: 'center',
          flexGrow:1,
        }
      },

    },
    Institutional: {
      screen: Institutional,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Oferta Urbana",
        headerStyle:{
          backgroundColor:'#00A2B5'
        },
        headerTitleStyle:{
          color: "#FFFFFF",
          textAlign: 'center',
          flexGrow:1,
        }
      },
    },
    Hotels: {
      screen: Hotels,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Oferta Urbana",
        headerStyle:{
          backgroundColor:'#00A2B5'
        },
        headerTitleStyle:{
          color: "#FFFFFF",
          textAlign: 'center',
          flexGrow:1,
        }
      },
    },
    Gastronomy: {
      screen: Gastronomy,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Oferta Urbana",
        headerStyle:{
          backgroundColor:'#00A2B5'
        },
        headerTitleStyle:{
          color: "#FFFFFF",
          textAlign: 'center',
          flexGrow:1,
        }
      },
    },
    SeeMore: {
      screen: SeeMore,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Oferta Urbana",
        headerStyle:{
          backgroundColor:'#00A2B5'
        },
        headerTitleStyle:{
          color: "#FFFFFF",
          textAlign: 'center',
          flexGrow:1,
        } 
      },
    }, // End of SeeMore

    //Start of Hamburguer
    HM: {
      screen: HM,     
    }, // End of Hamburguer
  },
  {
    initialRouteName: 'UrbanOffer',
  }
);

const augmentedRealityStack = createStackNavigator(
  {
    AumentedReality: {
      screen: ViromediaController,
      params: {
        do: "AR",
      },
      navigationOptions: {
        headerRight: <HamburgerButton />,
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
      screen: TimeLine,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Linea del Tiempo",
        headerStyle:{
          backgroundColor:'#00A2B5'
        },
        headerTitleStyle:{
          color: "#FFFFFF",
          textAlign: 'center',
          flexGrow:1,
        },
        headerLeft: (<View />)
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
          iconName = focused ? mapAble : mapDisable;
        } else if (routeName === screenInformation.AUGMENTEDREALITY) {
          iconName = focused ? augmentedRealityAble : augmentedRealityDisable;
        } else if (routeName === screenInformation.VIRTUALVISIT) {
          iconName = focused ? virtualVisitAble : virtualVisitDisable;
        } else if (routeName === screenInformation.URBANOFFER) {
          iconName = focused ? urbanOfferAble : urbanOfferDisable;
        } else if (routeName === screenInformation.TIMELINE) {
          iconName = focused ? timeLineAble : timeLineDisable;
        }

        return <Image style={ styles.iconDimensions } source={iconName} />;
      },
    }),
    tabBarOptions: {
      showLabel: false,
      style:{
        backgroundColor:'#00A2B5'
      }
    },
  }
);

export default createAppContainer(AppNavigator);