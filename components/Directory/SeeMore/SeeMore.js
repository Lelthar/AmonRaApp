import React, {Component} from 'react';
import {

	StyleSheet,
	Text,
	View,
	AppRegistry,
	Button,
	Image,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';

const {widthWindow} = Dimensions.get('window');

export default class SeeMore extends Component{

	constructor(props){
        super(props);
        // Se le pasa el controlador de la navegación a App.js
        // para controlar la navegación desde Navigator.js
        this.props.screenProps.getNavigationProp(this.props.navigation)

         this.state = {

          title: "",
          description: "",
          direction: "",
          phone_number: "",
          facebook: "",
          images_url: [],
    };
    }

componentDidMount(){

    this.setState({
      title: this.props.navigation.state.params.name , 
      description: "" , 
      direction: this.props.navigation.state.params.direction ,
      phone_number: this.props.navigation.state.params.phone ,
      facebook: this.props.navigation.state.params.facebook,
      images_url: []
    });
  }

  render() {


    // Empieza prueba 

    var pic;
    var pic2;
    var pic3;
    var description = "No cargo";

    if(this.state.title == "TEOR/éTica"){

      description = 'Es un proyecto independiente, privado y sin fines de lucro dedicado al arte y al pensamiento. Tanto su nombre como su razón de ser implican teoría, ética y estética, dedicada a la  investigación y difusión de las prácticas artísticas contemporáneas de Centro América y el Caribe.'; 
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FTEOR-%C3%A9Tica%2F1-02.png?alt=media&token=9f423bcc-f899-427d-b451-e30de658374b" } ; 
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FTEOR-%C3%A9Tica%2F1-03.png?alt=media&token=1b8cf1a6-a651-4e30-b38c-0d8ea521df0a" } ; 
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FTEOR-%C3%A9Tica%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=a2a2cbc2-e78e-4ac5-91c8-beecc324e526" } ; 


    }
    
    else if(this.state.title == "Lado V. Centro de estudio y documentación "){

      description = "Funciona de manera articulada con TEOR/éTica. Concentra el aspecto formativo y documental de la Fundación ARS TEOR/éTica, para el estudio e investigación de las prácticas artísticas; posee un archivo, biblioteca especializada, salas de lectura, jardín y una terraza cubierta.";
      pic = {uri: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FLadoVCentroDeEstudio%2F1-02.png?alt=media&token=481ad8f3-4993-4004-927e-82c430672bf5"} ;
      pic2 = {uri: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FLadoVCentroDeEstudio%2F1-03.png?alt=media&token=40315d94-ae80-4e6d-93ac-0c39ee3c72a5"} ;
      pic3 = {uri: "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FLadoVCentroDeEstudio%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=30ac8c00-d69c-4e42-afd6-88b0ee101755"} ;
    }
    else if(this.state.title == "Libros Duluoz"){

      description = "Es una librería que ofrece desde 2011 literatura contemporánea y clasica, libros nuevos y usados de editoriales costarricenses, españolas y latinoamericanas. Posee un amplio catálogo sobre narrativa, poesía, libros ilustrados, ensayo, crónica y ciencias sociales.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FLibrosDuluoz%2F1-02.png?alt=media&token=d12ae993-18b3-4663-9d23-da19788d1112" } ; 
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FLibrosDuluoz%2F1-03.png?alt=media&token=e4e1df20-19cc-455f-b38e-14607691aa09" } ; 
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FLibrosDuluoz%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=f4565712-fdf7-475a-af45-33da56d9f130" } ; 
    }
    else if(this.state.title == "Galería Talentum (Antigua Casa Familia Doryan)"){

      description =  "Es una galería enfocada en el Arte Emergente en Costa Rica y Latinoamérica, donde se promueve la cultura, el arte y el entretenimiento. Ofrece servicios de alquiler de espacios para actividades como reuniones, eventos corporativos, charlas, talleres, etc.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FGaleriaTalentum%2F1-02.png?alt=media&token=8b29b16f-b1cb-4bed-b6e9-0507ce580ed1" } ; 
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FGaleriaTalentum%2F1-03.png?alt=media&token=7cc2cab6-a9be-44ea-8e72-0295464a595f" } ; 
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FGaleriaTalentum%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=acb74dd7-db99-4cf6-bd78-24df9bdd16f5" } ; 
    }

    else if(this.state.title == "Casa del Barrio Amón (Casa Serrano Bonilla)"){

        description = "Taller y galería de arcilla. Más que un negocio, se trata de un proyecto personal de la artista Ivette Guier que involucra la recuperación del valor patrimonial de su antigua casa. El inmueble es un espacio para la memoria del barrio, con galería y espacio de artes escénicas. "
        pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FCasaDelBarrioAmon(CasaSerranoBonilla)%2F1_1.png?alt=media&token=064bb9d3-d31c-42c7-b4c6-985357ffe024" } ; 
        pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FCasaDelBarrioAmon(CasaSerranoBonilla)%2F1_2.png?alt=media&token=002a590a-aff4-4693-87f4-4eb3ca5671b1" } ; 
        pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FCasaDelBarrioAmon(CasaSerranoBonilla)%2F1_3.png?alt=media&token=247dd2b6-58a6-4644-a2d5-8220152657cc" } ; 
    }

    else if(this.state.title == "Camanance. Taller y Tienda"){

        description ="Es un colectivo de diseñadoras, donde se generan espacios para brindar talleres con gran calidad humana y a la vez apoyar al diseño nacional a través de la tienda."
        pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FCamanance%2FFOTOS%20AM%C3%93N-02.png?alt=media&token=fe252aad-b1b2-4be3-9184-2d76b1e750fa" } ; 
        pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FCamanance%2FFOTOS%20AM%C3%93N-03.png?alt=media&token=efb758b5-36c7-4373-ab2f-31cf3b03693b" } ; 
        pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FCamanance%2FFOTOS%20AM%C3%93N_Mesa%20de%20trabajo%201.png?alt=media&token=ab21100b-b75b-4be3-aba8-a16f7bebf416" } ; 
    }


    else if(this.state.title == "Matisse Cine Espacio-Temporal"){

        description = "Este espacio proyecta cine clásico e independiente. Además, sus instalaciones se alquilan para otro tipo de eventos. ";
        pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FMatisseCineEspacioTemporal%2F1-02.png?alt=media&token=ca421757-8f69-4889-8824-144b1a0518ba" } ;
        pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FMatisseCineEspacioTemporal%2F1-03.png?alt=media&token=cd1c308d-402c-426c-861b-4d0ff4d66688" } ; 
        pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FMatisseCineEspacioTemporal%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=b49520ae-3abb-4c46-bf1d-70a6e82ec2d8" } ; 
    }

    else if(this.state.title == "Murales de Cuentos de Concherías"){

        description =  'Ubicados en las afueras del Hotel Don Carlos, estos murales en cerámica pertenecen al artista local Fernando Matamoros donde resalta las tradiciones del costarricense. Se basa en el libro de poesía costumbrista costarricense "Las Concherías" de Aquileo Echeverría.';
        pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FMuralesDeCuentosConcherias%2F1-02.png?alt=media&token=f5ce1592-e8aa-43c7-bf46-25cef8bd42c3" } ;
        pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FMuralesDeCuentosConcherias%2F1-03.png?alt=media&token=3bc3c84e-6a72-425e-bff2-4b0b2131a898" } ;
        pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FMuralesDeCuentosConcherias%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=1b925644-bed6-45ee-b057-b0fd41ea5f36" } ;
    }

    else if(this.state.title == "Triángulo Showroom Creativo"){

        description =  "Espacio de trabajo colaborativo, cafetería y tienda de diseño. Está dirigido a emprendedores, creativos, productores, gestores y sector turismo. Ofrece productos y servicios de diseñadores y artesanos nacionales e internacionales.";
        pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FTrianguloShowRoomCreativo%2F1-02.png?alt=media&token=dafb0ad6-f658-4cf2-9132-65763a2a0322" } ;
        pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FTrianguloShowRoomCreativo%2F1-03.png?alt=media&token=51e0d265-a061-4803-bc24-f127c70ec7c0" } ;
        pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FTrianguloShowRoomCreativo%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=d9b9fdb0-5b1a-4c9c-b443-28855a3ff488" } ; 
    }

    else if(this.state.title == "Amon Solar / El Sótano"){

        description = "Amon Solar es un proyecto de activismo cultural que ha albergado propuestas artísticas de teatro, danza, música, circo, magia, diseño y arte gráfico. El Sótano es un espacio para los amantes de la música Jazz, Blues, Rock, Punk, Reggae, Neo Soul, Alternativo, Nacional y Hip Hop.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FAmonSolar%2F1_1.png?alt=media&token=baad99ed-9c98-4091-8e56-1abb5a347337" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FAmonSolar%2F1_2.png?alt=media&token=8a9cc2e7-cc2f-47dd-bee1-c67fc8b10089" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FAmonSolar%2F1_3.png?alt=media&token=d192b3b8-36bb-4990-88bd-38e25ec6d8d6" } ;
    }

    else if(this.state.title == "Boutique Annemarie Gift & Shop"){

        description = "Tienda de antiguedades, artesanías y souvenirs ubicada en el Hotel Don Carlos. En esta puede encontar mapas, joyas, camisetas, postales, libros y mucho más de distintos artistas locales costarricenses.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FBoutiqueAnnemarie%2FFOTOS%20AM%C3%93N-02.png?alt=media&token=3aff217b-a7b7-4d33-9c30-41e8242b9c57" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FBoutiqueAnnemarie%2FFOTOS%20AM%C3%93N-03.png?alt=media&token=5d04f9b8-ffc1-4fbf-8391-ad4f665b24ba" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FBoutiqueAnnemarie%2FFOTOS%20AM%C3%93N_Mesa%20de%20trabajo%201.png?alt=media&token=e64d5473-0e84-43cf-a2ca-ff22677e7763" } ;
    }

    else if(this.state.title == "Insólita "){

      description = "Tienda que busca promover el diseño nacional, cambiando cada 2 meses su apariencia y sus diseñadores. Este espacio presenta propuestas con un concepto en evolución constante." ;
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FInsolita%2F1-02.png?alt=media&token=b94a23d2-1c0a-42a4-85ec-7dc2d427a4c3" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FInsolita%2F1-03.png?alt=media&token=cee3800b-95e5-4abe-ac01-b2bc73671767" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FCulturaYArte%2FInsolita%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=b7e140f1-4be5-4d7c-a844-8487a1682894" } ;
    }

    else if(this.state.title == "Alma de Amón"){

      description =  "Restaurante donde la historia, los recuerdos y las tradiciones buscan combianarse en una propuesta culinaría única. Dentro de sus platillos se rescata la cultura culinaria de Costa Rica y países latinoamericanos." ;
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FAlmaDeAmon%2F1-02.png?alt=media&token=f33d07f8-0cac-4084-ac01-8cfb47114922" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FAlmaDeAmon%2F1-03.png?alt=media&token=b786ca29-6b83-4030-a9ca-7939996d471b" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FAlmaDeAmon%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=8c0f525f-47ef-46bf-b8eb-1823ab61a1e2    " } ;
    }

    else if(this.state.title == "Soda Yasmin"){

      description = "Soda que ofrece desayunos y almuerzos en barrio Amón a precios muy accesibles para todo público.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FSodaYasmin%2F1-02.png?alt=media&token=30e32bd6-d576-428e-bb60-018064a3ae5d" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FSodaYasmin%2F1-03.png?alt=media&token=982826d1-58b4-4fc4-b2aa-e7b64dde3693" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FSodaYasmin%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=a8581f0e-8691-41d0-9608-0db3c85e5c17" } ;
    }


    else if(this.state.title == "De acá"){

      description =  'Mini mercado que da espacio a productores nacionales. Cuenta con una cafetería que busca dar a conocer una manera no tradicional de probar el café de Costa Rica. Su eslogan "de acá siempre será mejor" expresa muy bien su visión de empresa.';
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FDeAca%2F1-02.png?alt=media&token=6217dfc3-1a44-4cbb-baa2-9c7d7a7b50a6" };
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FDeAca%2F1-03.png?alt=media&token=fe2b7776-a3a7-4288-a2d5-efc71639fa9b" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FDeAca%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=80295d3c-56cf-47f5-8a0d-f386349104a6" } ;
    }

    else if(this.state.title == "Café Rojo"){

      description =  "Cafetería y restaurante que brinda una experiencia culinaria sencilla y saludable, inspirada en la comida vietnamita. Ofrece opciones veganas, vegetarianas y libres de gluten. Los productos que utilizan en su mayoría provienen de pequeños productores locales.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FCafeRojo%2F1-02.png?alt=media&token=5b563225-f0ba-4247-b904-1307f9bffbca" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FCafeRojo%2F1-03.png?alt=media&token=5f2ed2c0-1e82-4e97-9164-ce336b415c5e" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FCafeRojo%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=79777666-7359-41ef-a951-ebca3658aaa1" } ;
    }
    else if(this.state.title == "Café Europa"){

      description =  "Es un pequeño restaurante en barrio Amón que ofrece un variado menú; desde desayunos, almuerzos, pizzas, pastas y postres.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FCafeEuropa%2FFOTOS%20AM%C3%93N-02.png?alt=media&token=b0f95e03-d460-4ea1-a3e7-a357147fad7b" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FCafeEuropa%2FFOTOS%20AM%C3%93N_Mesa%20de%20trabajo%201.png?alt=media&token=7fea00c0-49cc-4119-a1c2-e063bd99d344" } ;
      pic3 = {uri : "" } ;
    }

    else if(this.state.title == "Cáfé Amón"){

      description =  "Cafetería y restaurante que ofrece una excelente experiencia gastronómica. Este se encuentra dentro del Hotel Don Carlos.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FCafeAmon%2F1-02.png?alt=media&token=df84db4c-9c1f-46c7-b230-21ff7304a80e" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FCafeAmon%2F1-03.png?alt=media&token=eedf410d-a551-4c0f-b091-bbae9e928861" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FCafeAmon%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=20f79e86-4b15-4024-ae76-997b28948646" } ;
    }

    else if(this.state.title == "Cafenauta"){

      description = "Tienda de café con calidad de exportación . Su café proviene de las 8 regiones cafeteras de Costa Rica.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FCafenauta%2F1-02.png?alt=media&token=4daec7ae-ea62-4506-a48c-71326b41a615" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FCafenauta%2F1-03.png?alt=media&token=b3cbf7bc-fc9e-4311-8f10-20e0e3c9cd07" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FCafenauta%2F1-03.png?alt=media&token=b3cbf7bc-fc9e-4311-8f10-20e0e3c9cd07" } ;
    }
    else if(this.state.title == "Restaurante II Gattopardo"){

      description = "Restaurante especializado en comida italiana. Ofrece menú ejecutivo los días entre semana.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FRestauranteGattopardo%2F1-02.png?alt=media&token=ca5c0471-5b3b-4078-b83d-70035ac84fe4" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FRestauranteGattopardo%2F1-03.png?alt=media&token=d65a63ce-9f18-430f-9dff-965e480c6730" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FRestauranteGattopardo%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=3b9f5ce4-0927-4167-91a7-2021172f3657" } ;
    }

    else if(this.state.title == "Tournant Restaurante y Café"){

      description: "Restaurante y cafetería que ofrece variados platillos del mundo. Cuenta con servicios adicionales como chefs privados, catering, clases de cocina y permite reservaciones para eventos privados.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FTournant%2F1-02.png?alt=media&token=29964de0-412e-4c6f-b295-cabafe0cb0de" };
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FTournant%2F1-03.png?alt=media&token=96fd3fe2-d2de-4838-8e5c-35f0ef559b03" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FTournant%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=38efd22e-3872-4c9f-9bbd-e9e27d2d40d7" } ;
    }
    else if(this.state.title == "Restaurante Silvestre (Antigua Casa Peralta Zeller)"){

      description = "Restaurante que tiene como concepto el modo de vida de los años 30 en barrio Amón. Su cocina contemporánea presenta platillos tradicionales de Costa Rica de una forma innovadora.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FRestauranteSilvestre%2F1-02.png?alt=media&token=bf283f63-868c-4054-b76b-4b82095fe64d" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FRestauranteSilvestre%2F1-03.png?alt=media&token=48d69829-a4b0-4688-a2df-ad038911c3d0" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FRestauranteSilvestre%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=856c6b75-6004-4b32-bd38-65ccbef534a0" } ;
    }

    else if(this.state.title == "Delicias Del Perú"){

      description =  "Restaurante de comida peruana a precios muy accesibles.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FDeliciasDelPeru%2FDelicias%20del%20Per%C3%BA_Mesa%20de%20trabajo%201%20copia%202.png?alt=media&token=00869484-797d-48b7-8a88-96ef7880b78d" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FDeliciasDelPeru%2FDelicias%20del%20Per%C3%BA_Mesa%20de%20trabajo%201%20copia.png?alt=media&token=4dc5fda2-147c-4d8e-9411-291e8332e370" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FDeliciasDelPeru%2FDelicias%20del%20Per%C3%BA_Mesa%20de%20trabajo%201.png?alt=media&token=211cb543-60f8-4fa5-96b4-598b13ec7cb1" } ;
    }

    else if(this.state.title == "Criollita Amón. Restaurante y Café"){

      description =  "Restaurante y cafetería que se caracteriza por su cocina tradicional. En su logo, utilizan una olla típica en representación de las familias costarricenses y sus costumbres.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FCriollitaAmon%2F1-02.png?alt=media&token=1fd80f3b-d951-43de-915e-ae7ae599d547" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FCriollitaAmon%2F1-03.png?alt=media&token=5c1338b5-6078-48af-97a5-0f40dd3042a2" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FCriollitaAmon%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=ff9f7022-5e37-43af-98e1-ef3b8272d60d" } ;
    }

    else if(this.state.title == "PANÍ-VORO"){

      description =  'Panadería y pastelería. Su nombre significa "Aquel que disfruta del pan y la repostería de sobremanera".';
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FPANIVORO%2F1-02.png?alt=media&token=f828c7e9-951a-4b85-8587-579bd8c54679" };
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FPANIVORO%2F1-03.png?alt=media&token=c42215ce-53fc-4168-ae3b-92cd42d5a162" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FPANIVORO%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=485570f8-5be2-4ba4-a378-5abae28a48e1" } ;
    }
    else if(this.state.title == "Le Café"){

      description =  "Cafetería dentro de las instalaciones de la Alianza Cultural Franco Costarricense. Ofrece almuerzos, al igual que gran variedad de repostería.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FLeCafe%2F1-02.png?alt=media&token=890e1f14-d15e-4f28-ab68-9e356ae3c1e2" };
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FLeCafe%2F1-03.png?alt=media&token=58ff1ff1-e4d6-450d-bcc3-c3c46a02c143" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FGastronomia%2FLeCafe%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=da0d4f66-d06c-4a74-b5a7-4f3ddd54f223" } ;
    }

    else if(this.state.title == "Hotel Dunn Inn"){

      description = "El principal atractivo de este hotel es la cercanía con el Centro Histórico de San José; sus museos, teatros, tiendas de souvenirs y el mercado central entre otros.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelDunnInn%2F1-02.png?alt=media&token=9440300e-ad2e-4fbe-bfa9-36333c045bd1" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelDunnInn%2F1-03.png?alt=media&token=806ca70a-cecb-4b6e-b5a7-9e8153ce01db" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelDunnInn%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=6ef3976f-5747-44dc-bf82-84ad33d31ad9" } ;
    }

    else if(this.state.title == "Hotel Don Carlos"){

      description = "Hotel de administración familiar que brinda servicios desde 1980. Se destaca por su cercanía al Centro Histórico de San José, al igual que a otras atracciones importantes de la ciudad. Antiguamente fue la Pensión Canadá, la cual recibió visitantes internacionales desde 1947.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelDonCarlos%2F1-02.png?alt=media&token=fe7be576-cb09-49c9-8ee0-b74aad288755" } ; 
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelDonCarlos%2F1-03.png?alt=media&token=61cf2216-03e7-4132-9e73-0de331e7b23d" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelDonCarlos%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=4eb3abcb-75ca-4b4d-991c-ea4ffa230d7a" } ;
    }
    
    else if(this.state.title == "Hotel Castillo"){

      description =  "Cuenta con 29 habitaciones y muchas de ellas tienen vistas a la ciudad, ofrece el servicio de todo incluido.";
      pic = {uri : "" };
      pic2 = {uri : "" } ;
      pic3 = {uri : "" } ;

    }

    else if(this.state.title == "Hotel Inca Real San José"){

      description =  "Hotel que ofrece a sus huéspedes una experiencia exclusiva y de alta calidad. Ofrece habitaciones confortables con servicios adicionales como desayuno incluido e internet gratis. ";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelCastillo%2F1-02.png?alt=media&token=e272a20c-accd-41df-95fe-1e2a09f6cb66" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelCastillo%2F1-03.png?alt=media&token=9af32ca9-7c03-4383-8ae7-a76669e87e19" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelCastillo%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=14659bd3-1cdc-4bbf-b95f-e76b88d53c01" } ;
    }
    else if(this.state.title == "Hotel y Casino Taormina San José"){


      description =  "Hotel dirigido a las personas que realizan viajes de negocios. Ofrecen elegantes habitaciones y cálidas zonas comunes. Dentro de sus instalaciones se encuentra también un Casino.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelYCasinoTaorminaSanJose%2F1-02.png?alt=media&token=932174e8-53ca-4423-a6e4-e1b828b0b65b" } ; 
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelYCasinoTaorminaSanJose%2F1-03.png?alt=media&token=6b486622-03ac-44a6-be15-9c66f6453a25" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelYCasinoTaorminaSanJose%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=28474eec-7dbf-48ff-bfff-9aa095849ac0" } ;
    }

    else if(this.state.title == "Hotel Kekoldi"){

        description = "Edificio con estilo Art Déco que funciona como hostal. Tiene como concepto mantener alejado al huésped del ruido de las calles del centro de San José.";
        pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelKekoldi%2F1-02.png?alt=media&token=7e8cd08c-0ce7-4f70-be09-bb213c0b53d8" } ;
        pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelKekoldi%2F1-03.png?alt=media&token=62c24999-aecf-4a1f-868a-b7f46ad7aae9" } ;
        pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelKekoldi%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=d1c40da5-be10-4ca2-94c0-94c0169be8f0" } ; 
    }

    else if(this.state.title == "Hostel Van Gogh"){
      
      description =  "Hostal pequeño que cuenta con un equipo de trabajo muy profesional. Ofrece precios accesibles a todo público. Se destaca por su ubicación cercana al Centro Histótico de San José.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelKekoldi%2F1-02.png?alt=media&token=7e8cd08c-0ce7-4f70-be09-bb213c0b53d8" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelKekoldi%2F1-03.png?alt=media&token=62c24999-aecf-4a1f-868a-b7f46ad7aae9" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHotelKekoldi%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=d1c40da5-be10-4ca2-94c0-94c0169be8f0" } ;
    }

    else if(this.state.title == "Hostel Pangea"){

        description = "Hostal de San José dirigido a extranjeros jóvenes. Se destaca por sus fiestas y variedad de bebidas. (De acuerdo con Tico Times, 2011).";
        pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHostelPangea%2F1-02.png?alt=media&token=3604f92c-4c73-4088-8232-b1fe4aeefff4" } ;
        pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHostelPangea%2F1-03.png?alt=media&token=5ae7141d-d976-4492-b33c-82dbe7bbeb33" } ;
        pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FHospedaje%2FHostelPangea%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=65488385-3eaf-4fb7-90e2-bf7afb0ae0a5" } ;
    }

    else if(this.state.title == "Alianza Cultural Franco Costarricense"){

      description = "Es una organización sin fines de lucro. Pertenece a la red de difusión educativa y cultural del Ministerio de Asuntos Exteriores de Francia. Su misión es la enseñanza del idioma francés, fomentar la diversidad cultural y los lazos de amistad entre Francia y Costa Rica.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FAlianzaCulturalFrancoCostarricense%2F1-02.png?alt=media&token=65186a23-6631-41d6-b036-030b6512397a" } ; 
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FAlianzaCulturalFrancoCostarricense%2F1-03.png?alt=media&token=87a3c72b-8f54-49aa-87d0-7e114fff3608" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FAlianzaCulturalFrancoCostarricense%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=0d2446d4-16b0-4185-8260-26f6cc0bce21" } ;
    }

    else if(this.state.title == "Instituto Nacional de Vivienda y Urbanismo (INVU)"){

      description = "Entidad pública responsable de ejecutar las políticas y planes en materia de urbanismo y ordenamiento territorial a nivel nacional. También diseña, coordina y promueve programas de vivienda que le permiten a la ciudadanía el acceso a una solución habitacional propia.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FINVU%2F1-02.png?alt=media&token=23f28d7b-4a1f-4adc-8899-49e7c71f5834" } ; 
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FINVU%2F1-03.png?alt=media&token=a01d9a6f-db90-415f-a107-5a3db824e7e0" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FINVU%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=17a0d22b-090f-46d0-a484-175e14b84bbe" } ;
    }
    else if(this.state.title == "Tecnológico de Costa Rica (TEC)"){

      description = "Institución nacional autónoma de educación superior universitaria, dedicada a la docencia, investigación, extensión para el desarrollo del país. Se creó en 1971, sus aulas, oficinas administrativas, biblioteca y áreas recreativas se distribuyen a lo largo de las edificaciones.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FTEC%2F1-02.png?alt=media&token=04008d0b-a157-4296-b33a-ef44a100023b" } ; 
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FTEC%2F1-03.png?alt=media&token=6da214c2-c7c2-4f49-87ec-09457d389b2d" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FTEC%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=bde6edb4-d8bb-47bf-8118-c2ae776ce0db" } ;
    }

    else if(this.state.title == "Escuela de Computación - Administración de Empresas - TEC"){

      description = "Computación tiene como énfasis lograr un máximo rendimiento de la tecnología de información en las actividades comerciales, administrativas e industriales y Administración de Empresas estudia la organización, estrategias, planes de acción y toma de decisiones en la administración."; 
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FEscuelaDeComputacionAdministracion%2F1-02.png?alt=media&token=a1fb0236-8792-49eb-a447-c0b309d1d230" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FEscuelaDeComputacionAdministracion%2F1-03.png?alt=media&token=ea5f1c3a-1c8e-44e0-98bb-1aa3eb33519a" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FEscuelaDeComputacionAdministracion%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=782e3253-6b81-41c0-8718-04d60e541327" } ;

    }
    else if(this.state.title == "Casa Cultural Amón - TEC"){

      description = "Es un espacio de extensión cultural adscrito a la Escuela de Cultura y Deporte del Campus Tecnológico Local San José. Se inauguró en 1998, bajo la política de crear centros culturales en las comunidades donde haya sedes del TEC.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FCasaCulturalAmonTec%2F1-02.png?alt=media&token=9a80f73b-1aba-4edc-ac1f-2f410aa2b625" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FCasaCulturalAmonTec%2F1-03.png?alt=media&token=1735d64d-046f-4416-8c2b-95a2262538e7" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FCasaCulturalAmonTec%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=66710ab2-4566-4081-9140-e9d06a60612e" } ;
    }

    else if(this.state.title == "Escuela de Arquitectura y Urbanismo - TEC"){

      description = "La escuela de Arquitectura y Urbanismo busca la formación de profesionales que contribuyan al desarrollo de un entorno costruido respetuoso del ambiente, solidario e inclusivo con la sociedad.";
        pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FEscuelaDeComputacionAdministracion%2F1-02.png?alt=media&token=a1fb0236-8792-49eb-a447-c0b309d1d230" } ;
        pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FEscuelaDeComputacionAdministracion%2F1-03.png?alt=media&token=ea5f1c3a-1c8e-44e0-98bb-1aa3eb33519a" } ;
        pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FEscuelaDeComputacionAdministracion%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=782e3253-6b81-41c0-8718-04d60e541327" } ;
    }

    else if(this.state.title == "Fondo de Desarrollo Social y Asignaciones Familiares (FODESAF)"){

      description = "Entidad que financia programas y servicios a instituciones del Estado, que tienen a su cargo aportes complementarios al ingreso de las familias y la ejecución de programas de desarrollo social. Atiende necesidades de vivienda, educación, salud y protección social.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FFondoDeDesarrolloSocialYAsignacionesFamiliares%2F1-02.png?alt=media&token=b2139053-07f4-4dd9-ba91-c7ee259c4815" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FFondoDeDesarrolloSocialYAsignacionesFamiliares%2F1-03.png?alt=media&token=25af3d7c-5e62-439c-bf5a-787c2e0a03e6" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FFondoDeDesarrolloSocialYAsignacionesFamiliares%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=9e7a402d-a1a7-441b-9241-b6f2843badfd" } ;
    }

    else if(this.state.title == "Instituto Nacional de Seguros (INS)"){

      description = "Institución estatal que ofrece seguros y servicios relacionados a nivel nacional e internacional. Promueve la prevención de riesgos para el trabajo, el hogar y el tránsito de vehículos.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FINS%2F1-02.png?alt=media&token=b5cea5e5-24ef-438c-9d5a-652a49109955" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FINS%2F1-03.png?alt=media&token=981473be-9a86-4963-aeb0-78b6b0a35349" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FINS%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=930c7537-0eaf-4638-ac35-8364f8429653" } ; 
    }

    else if(this.state.title == "Cooperativa Coopemep R.L."){

      description = "Cooperativa de ahorro y crédito de los empleados del Ministerio de Educación Pública R.L. Es supervisada por la SUGEF, que brinda soluciones financieras y contribuye a mejorar el bienestar de las personas asociadas.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FCooperativaCoopemep%20R.L%2F1-02.png?alt=media&token=82acf1a8-c699-46eb-96c9-eb35c7fd57a6" } ; 
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FCooperativaCoopemep%20R.L%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=06a1a7e6-9df9-491a-b920-362e6f530462" } ;
      pic3 = {uri : "" } ;
    }

    else if(this.state.title == "Instituto Mixto de Ayuda Social (IMAS)"){
      description = "Institución que trabaja en resolver el problema de la pobreza extrema en el país; planeando, dirigiendo, ejecutando y controlando un plan nacional destinado a dicho fin.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FIMAS%2F1-02.png?alt=media&token=970ec9a7-0847-4410-bec8-7dcf238d3166" };
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FIMAS%2F1-03.png?alt=media&token=96253433-9e0f-4605-8f27-f7008676bdbe" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FIMAS%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=b259ac01-9490-486c-9da1-10d056a294ec" } ;
    }
    else if(this.state.title == "Fundación Pro Zoológicos (FUNDAZOO)"){

      description = "Fundación administradora del Parque Zoológico y Jardín Botánico Nacional Simón Bolívar y el Centro de Conservación Santa Ana.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FFUNDAZOO%2F1-02.png?alt=media&token=ccb67695-859c-4243-be5b-bbf9e1784bd8" };
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FFUNDAZOO%2F1-03.png?alt=media&token=b2ec7271-4cd4-44e4-8315-2fb22b751018" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FFUNDAZOO%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=f6d19e76-fe84-4d3a-8e83-fba7e56e00bd" } ;
    }

    else if(this.state.title == "Casa Santa Margarita"){

      description = "Congregación de Derecho Pontificio, dedicada a la acción apostólica, con el lema “Ad maioren dei gloriam”.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FCasaSantaMargarita%2F1-02.png?alt=media&token=8bd7fc72-4930-42c3-a57d-4525ce3a570f" } ; 
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FCasaSantaMargarita%2F1-03.png?alt=media&token=87a2817c-121a-48af-b01f-ee46ec389fd6" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FCasaSantaMargarita%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=9e3b4769-c65f-4194-8df6-eccd5c4f2b1e" } ;
    }

    else if(this.state.title == "Dirección Regional de Educación de San José (MEP)"){

      description = "Sede del ente rector del sistema educativo del país. Promueve el desarrollo y consolidación de un sistema educativo de excelencia, que permita el acceso de toda la población a una educación integral de calidad. ";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FDireccionRegionalDeEducacion%2F1-02.png?alt=media&token=74b78043-30ad-4a98-bccb-6e70a3f4ef4d" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FDireccionRegionalDeEducacion%2F1-03.png?alt=media&token=133e9754-cb33-410b-9eca-eee6d546e37e" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FDireccionRegionalDeEducacion%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=137e90cc-4c2f-4cd9-938d-39c3f0e095ee" } ;
    }

    else if(this.state.title == "Centro Costarricense de Producción Cinematográfica"){

      description = "Institución adscrita al Ministerio de Cultura y Juventud, que se encarga de promover la actividad audiovisual en nuestro país. Es la entidad cultural y técnica especializada del Estado en el campo del cine y el video nacionales. Fue creada en 1977.";
      pic = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FCentroCostarricenseDeProduccionCine%2F1-02.png?alt=media&token=9d7eb4b5-d43d-4d2b-93b7-98b460558dc6" } ;
      pic2 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FCentroCostarricenseDeProduccionCine%2F1-03.png?alt=media&token=b3e58077-dbe6-4f6d-9b93-4d4fce0b00b2" } ;
      pic3 = {uri : "https://firebasestorage.googleapis.com/v0/b/amonra-tec.appspot.com/o/OfertaUrbana%2FInstitucional%2FCentroCostarricenseDeProduccionCine%2F1_Mesa%20de%20trabajo%201.png?alt=media&token=324e15a8-cbc0-4d4e-be05-549df6e613e9" } ;
    }
    else {

    	description = "1" + this.state.title+"2";
      
    }
    

    //Fin de Prueba

     /*
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    */


    return (

      <View style = {styles.container}>

        <View style = {{flex:2}} />

          <View style = {styles.swiper}>

            <Swiper style = {styles.wrapper} loop>

              <View style={styles.slide}>
                <Image source = {pic} style = {styles.image} resizeMode='stretch' />
              </View>

            <View style={styles.slide}>
              <Image source = {pic2} style = {styles.image} resizeMode='stretch' />
            </View>

            <View style={styles.slide}>
              <Image source = {pic3} style = {styles.image} resizeMode='stretch' />
            </View>

          </Swiper>

        </View>

        <View style={{alignItems: 'center', flex: 50}}>
            <Text style={styles.title} >{this.state.title}</Text>
            <Text style = {styles.description}> {description} </Text>
            <Text style = {styles.direction}>  Direccion: {this.state.direction } </Text> 
            <Text style = {styles.phone}> Telefono: {this.state.phone_number} </Text> 
            <Text style = {styles.facebook}> Facebook: {this.state.facebook} </Text>
            
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({


	slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
	},
  swiper:{
    flex:9
  },
	swiperSty: {
		flex:3,
		height:50
	},
	image: {
		width: widthWindow,
		height: 100
	},
	
	title: {
		textAlign: "center", fontSize:35,
		fontFamily: "vincHand",
    color: "#0C5B60",
    marginTop: 10,
    marginBottom: 10
	},

	description: {
		textAlign: "center", fontSize:18,
		color: "grey"
	},

  direction:{
    textAlign: "center", fontSize: 18,
    color: "grey",
    marginLeft: 50, 
    marginRight: 50,
    marginTop: 50 
  },

  phone:{
    textAlign: "center", fontSize: 18,
    color: "grey",
    marginLeft: 50, 
    marginRight: 50,
    
  },
  facebook:{
    textAlign: "center", fontSize: 18,
    color: "grey",
    marginLeft: 50, 
    marginRight: 50,
   
  },
  wrapper: {
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  }

});



    AppRegistry.registerComponent('SeeMore', () => SeeMore);