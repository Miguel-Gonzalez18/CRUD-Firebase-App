import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { getDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { database } from '../config/firebase';

const UserDetailScreen = (props) => {

  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    phone: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeText = (name, value) => {
    setUser({...user, [name]: value })
  }

  const updateUser = async () => {
    const docRef = doc(database, "users", props.route.params.userId)
    setIsLoading(true)
    await setDoc(docRef, {
      name: user.name,
      email: user.email,
      phone: user.phone
    })
    setIsLoading(false)
    Alert.alert("Datos actualizados correctamente!")
    props.navigation.navigate('User List')
  }

  const deleteUser = async () =>{
    const docRef = doc(database, "users", props.route.params.userId)
    setIsLoading(true)
    await deleteDoc(docRef)
    setIsLoading(false)
    Alert.alert(
      "Usuario eliminado correctamente",
      [
        {text: "Bien", onPress: ()=> props.navigation.navigate('User List')}
      ]
    )
  }

  const deleteAlert = async () => {
    Alert.alert(
    "Eliminar usuario",
    "Seguro que quieres eliminar este usuario",
    [
      {text: "Si, borrar usuario", onPress:()=> deleteUser()},
      {
        text: "NO",
        style: "cancel",
      },
    ]
    )
  }

  const getUserId = async (id) => {
    const docRef = doc(database, "users", id);
    setIsLoading(true)
    const docSnap = await getDoc(docRef);
    setIsLoading(false)
    const userData = docSnap.data();
    setUser({
      ...userData,
      id: doc.id
    })
    
  }
  useEffect(()=>{
    getUserId(props.route.params.userId)
  },[])

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
          value={user.name}
          style={styles.input} 
          placeholder='User name'
          textContentType='name'
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View>
        <TextInput
          value={user.email}
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
          value={user.phone}
          style={styles.input} 
          placeholder='Phone User' 
          keyboardType='phone-pad'
          textContentType='telephoneNumber'
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.button} >
          <Entypo name="save" size={24} color="white" style={{marginRight: 6}} />
          <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Save user</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.buttonUpdate} onPress={()=> updateUser()} >
          <MaterialIcons name="update" size={24} color="white" style={{marginRight: 6}} />
          <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Update user</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.buttonDelete} onPress={()=> deleteAlert()} >
          <MaterialIcons name="delete" size={24} color="white" style={{marginRight: 6}} />
          <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Delete user</Text>
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
    marginTop: 10
  },
  buttonUpdate: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#229954',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  buttonDelete: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#C0392B',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  }
})
export default UserDetailScreen