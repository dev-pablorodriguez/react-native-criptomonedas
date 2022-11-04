import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  Text,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

const App = () => {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect( () => {
    const cotizarCriptomoneda = async () => {
      if(consultarAPI){

        setIsLoading(true);

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ criptomoneda }&tsyms=${ moneda }`;
        const response = await axios.get(url);
        
        //Custom wait time to see the loader
        setTimeout(() => {
          setResult(response.data.DISPLAY[ criptomoneda ][ moneda ]);
          setConsultarAPI(false);
          setIsLoading(false);
        }, 2000);
      }
    }
    cotizarCriptomoneda();
  }, [ consultarAPI ])

  const renderedComponent =
    isLoading ? <ActivityIndicator size='large' color='#5E49E2' style={{ marginTop: 20 }}/> :
      Object.keys(result).length === 0 ?
        <Text style={ styles.noResultados }>Seleccione divisas y presione COTIZAR.</Text> :  
          <Cotizacion result={ result } />

  return (
    <ScrollView>
      <Header />
      <Image style={ styles.imagen } source={ require('./assets/img/cryptomonedas.png') } />


      <View style={ styles.contenido }>
        <Formulario 
          moneda={ moneda }
          setMoneda={ setMoneda }
          criptomoneda={ criptomoneda }
          setCriptomoneda={ setCriptomoneda }
          setConsultarAPI={ setConsultarAPI }
        />
      </View>

      { renderedComponent }

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido: {
    marginHorizontal: '2.5%'
  },
  noResultados: {
    marginTop: 50,
    fontFamily: 'Lato-Black',
    fontSize: 20,
    alignSelf: 'center'
  }
});

export default App;
