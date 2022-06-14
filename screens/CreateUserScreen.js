import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { collection, addDoc } from 'firebase/firestore';
import { database } from "../config/firebase"

const CreateUserScreen = ({ navigation }) => {

  const [state, setState] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  
  const handleChangeText = (name, value) => {
    setState({...state, [name]: value })
  }
  
  const SaveUser = async () =>{
    if(state.name === ''){
      Alert.alert("El campo nombre esta vacío", "Escriba su nombre, este dato es obligatorio")
    }
    else{
      try {
        setIsLoading(true)
        await addDoc(collection(database, "users"), state)
        setIsLoading(false)
        Alert.alert(
          "Guardado!",
          "Datos guardado correctamente",
          [
            {text: "OK", onPress: () => navigation.navigate('User List')}
          ]
        )
      } catch (error) {
        Alert.alert("Error al intentar agregar el documento")
      }
    }
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#1A3C84'/>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput 
          style={styles.input} 
          placeholder='User name'
          textContentType='name'
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View>
        <TextInput
          style={styles.input} 
          placeholder='Email User' 
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View>
        <TextInput 
          style={styles.input} 
          placeholder='Phone User' 
          keyboardType='phone-pad'
          textContentType='telephoneNumber'
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={ ()=> SaveUser() } >
          <Entypo name="save" size={24} color="white" style={{marginRight: 6}} />
          <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Save user</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  input: {
    backgroundColor: '#E5E8E8',
    height: 50,
    marginBottom: 20,
    fontSize: 13,
    borderRadius: 10,
    padding: 12
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#1A3C84',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
}
})

export default CreateUserScreen