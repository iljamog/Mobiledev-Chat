import React from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles'

const Messages = [
  {
    id: '1',
    userName: 'Chat 1',
    userImg:
      'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'Chat 2',
    userImg:
      'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Chat 3',
    userImg:
      'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Chat 4',
    userImg:
      'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Chat 5',
    userImg:
      'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
]

const MessagesScreen = ({ navigation }) => {
  return (
    <Container>
      <FlatList
        data={Messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            onPress={() =>
              navigation.navigate('Chat', {
                userName: item.userName,
              })
            }>
            <UserInfo>
              <UserImgWrapper>
                <UserImg
                  source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                  }}
                />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.userName}</UserName>
                  <PostTime>{item.messageTime}</PostTime>
                </UserInfoText>
                <MessageText>{item.messageText}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
  )
}

export default MessagesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
