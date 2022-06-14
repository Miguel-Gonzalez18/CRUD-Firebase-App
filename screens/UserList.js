import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { database } from '../config/firebase';
import { collection, onSnapshot, query } from "firebase/firestore";
import { ListItem, Avatar } from "@rneui/themed";

const UserList = ({ navigation }) => {
  const [user, setUser] = useState([])
  const usenavigation = useNavigation();

  const q = query(collection(database, "users"));
  onSnapshot(q, (querySnapshot) =>{
    const users = []
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        phone: doc.data().phone
      })
    })
    setUser(users)
  })

  useEffect(()=>{
    usenavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Create User')}>
          <AntDesign style={styles.btnAdd} name="addusergroup" size={26} color="#154360" />
        </TouchableOpacity>
      )
    })
  },[usenavigation])

  return (
    <View>
      <ScrollView>
        {user.map(user => {
          return (
            <ListItem
              key={user.id}
              bottomDivider
              onPress={()=> {navigation.navigate('User Detail', {userId: user.id} )}}
            >
              <ListItem.Chevron />
              <Avatar source={{uri: 'https://images.pexels.com/users/avatars/17886149/nick-751.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2'}}
              rounded
              />
              <ListItem.Content>
                <ListItem.Title>
                  {user.name}
                </ListItem.Title>
                <ListItem.Subtitle>
                  {user.email}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  btnAdd: {
    marginRight: 20
  }
})

export default UserList