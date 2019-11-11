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

import TimeLine from './TimeLine';

import HamburgerButton from '../partials/HamburgerButton';
import HamburgerMenu from '../partials/HamburgerMenu';
import Architecture from './Architecture.js';
import ArchitectureDetail from './ArchitectureDetail';
import ExperiencesMenu from './ExperiencesMenu';
import ExperiencesARBuilding from '../partials/ExperiencesARBuilding';
import Origin from './Origin';
import Narratives from '../partials/Narratives';
import Secrets from '../partials/Secrets';
import Characters from '../partials/Characters';
import Activities from '../partials/Activities';
import CharacterDetail from '../partials/CharacterDetail';
import Literature from '../partials/Literature';
import MoreAmonRa from './MoreAmonRa';
import AmonRaProject from './AmonRaProject';

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
    Architecture:{
      screen: Architecture,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Arquitectura",
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
    ArchitectureDetail:{
      screen: ArchitectureDetail,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Arquitectura",
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
    ExperiencesMenu:{
      screen: ExperiencesMenu,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Vivencias",
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
    Origin:{
      screen: Origin,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Origen",
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
    Narratives:{
      screen: Narratives,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Narraciones",
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
    Activities:{
      screen: Activities,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Actividades",
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
    MoreAmonRa: {
      screen: MoreAmonRa,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Más de Amón_RA",
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
    Secrets:{
      screen: Secrets,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Secretos",
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
    Characters:{
      screen: Characters,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Personajes",
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
    CharacterDetail:{
      screen: CharacterDetail,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Personajes",
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
    Literature:{
      screen: Literature,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Literatura",
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
    AmonRaProject: {
      screen: AmonRaProject,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Proyecto Amón_RA",
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
  }
);

const virtualVisitStack = createStackNavigator(
  {
    VirtualVisit: {
      screen: VirtualVisit,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Visita Virtual",
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
    },
    Architecture:{
      screen: Architecture,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Arquitectura",
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
    ArchitectureDetail:{
      screen: ArchitectureDetail,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Arquitectura",
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
    ExperiencesMenu:{
      screen: ExperiencesMenu,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Vivencias",
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
    Origin:{
      screen: Origin,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Origen",
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
    Narratives:{
      screen: Narratives,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Narraciones",
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
    Activities:{
      screen: Activities,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Actividades",
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
    MoreAmonRa: {
      screen: MoreAmonRa,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Más de Amón_RA",
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
    Secrets:{
      screen: Secrets,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Secretos",
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
    Characters:{
      screen: Characters,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Personajes",
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
    CharacterDetail:{
      screen: CharacterDetail,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Personajes",
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
    Literature:{
      screen: Literature,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Literatura",
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
    AmonRaProject: {
      screen: AmonRaProject,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Proyecto Amón_RA",
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
    },
    HamburgerMenu: {
      screen: HamburgerMenu,     
    }, 
    Architecture:{
      screen: Architecture,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Arquitectura",
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
    ArchitectureDetail:{
      screen: ArchitectureDetail,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Arquitectura",
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
    ExperiencesMenu:{
      screen: ExperiencesMenu,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Vivencias",
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
    Origin:{
      screen: Origin,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Origen",
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
    Activities:{
      screen: Activities,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Actividades",
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
    Narratives:{
      screen: Narratives,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Narraciones",
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
    MoreAmonRa: {
      screen: MoreAmonRa,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Más de Amón_RA",
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
    Secrets:{
      screen: Secrets,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Secretos",
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
    Characters:{
      screen: Characters,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Personajes",
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
    CharacterDetail:{
      screen: CharacterDetail,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Personajes",
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
    Literature:{
      screen: Literature,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Literatura",
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
    AmonRaProject: {
      screen: AmonRaProject,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Proyecto Amón_RA",
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
        header: null,
      },
    },
    ExperiencesARHouse:{
      screen: ExperiencesARBuilding,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Vivencias",
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
    ArchitectureDetail:{
      screen: ArchitectureDetail,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Arquitectura",
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
        title: "Línea del Tiempo",
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
    Architecture:{
      screen: Architecture,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Arquitectura",
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
    ArchitectureDetail:{
      screen: ArchitectureDetail,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Arquitectura",
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
    ExperiencesMenu:{
      screen: ExperiencesMenu,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Vivencias",
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
    Origin:{
      screen: Origin,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Origen",
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
    Activities:{
      screen: Activities,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Actividades",
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
    Narratives:{
      screen: Narratives,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Narraciones",
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
    MoreAmonRa: {
      screen: MoreAmonRa,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Más de Amón_RA",
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
    Secrets:{
      screen: Secrets,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Secretos",
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
    Characters:{
      screen: Characters,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Personajes",
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
    CharacterDetail:{
      screen: CharacterDetail,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Personajes",
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
    Literature:{
      screen: Literature,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Literatura",
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
    AmonRaProject: {
      screen: AmonRaProject,
      navigationOptions: {
        headerRight: <HamburgerButton />,
        title: "Proyecto Amón_RA",
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
