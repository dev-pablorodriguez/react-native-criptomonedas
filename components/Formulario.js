import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'

const Formulario = ({ 
    moneda, 
    setMoneda, 
    criptomoneda, 
    setCriptomoneda, 
    setConsultarAPI 
}) => {
    const [criptomonedas, setCriptomonedas] = useState([]);

    useEffect( () => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const response = await axios.get(url);

            setCriptomonedas(response.data.Data);
        }

        consultarAPI();
    }, [])

    const cotizarPrecio = () => {
        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            Alert.alert('Error', 'Ambos campos son obligatorios.');
            return;
        }
        setConsultarAPI(true);
    }

    return (
        <View>
            <Text style={ styles.label }>Moneda</Text>
            <Picker
                style={ styles.input }
                selectedValue={ moneda }
                onValueChange={ setMoneda }
            >
                <Picker.Item label='-- Seleccione --' value='' />
                <Picker.Item label='Dólar Estadounidense' value='USD' />
                <Picker.Item label='Peso Chileno' value='CLP' />
                <Picker.Item label='Euro' value='EUR' />
                <Picker.Item label='Libra Esterlina' value='GBP' />
            </Picker>


            <Text style={ styles.label }>Criptomoneda</Text>

            <Picker
                style={ styles.input }
                selectedValue={ criptomoneda }
                onValueChange={ setCriptomoneda }
            >
                <Picker.Item label='-- Seleccione --' value='' />
                {
                    criptomonedas.map( cripto => <Picker.Item 
                                                        key={ cripto.CoinInfo.Id }
                                                        label={ cripto.CoinInfo.FullName } 
                                                        value={ cripto.CoinInfo.Name } />)
                }
            </Picker>

            <TouchableHighlight 
                style={ styles.btnCotizar }
                onPress={ cotizarPrecio }
                underlayColor='#8070E4'
            >
                <Text style={ styles.btnCotizarTexto }>Cotizar</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20
    },
    input: {
        backgroundColor: '#F5F5F5'
    },
    btnCotizar: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20,
        borderRadius: 10
    },
    btnCotizarTexto: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center'

    }
})

export default Formulario