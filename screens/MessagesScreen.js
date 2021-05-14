import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
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
      'https://about.fb.com/wp-content/uploads/2018/11/fb-hero-image-001.jpeg?fit=1920%2C1080',
    messageTime: '4 mins ago',
    messageText: 'Facebook V2',
  },
  {
    id: '2',
    userName: 'Chat 2',
    userImg:
      'https://yt3.ggpht.com/ytc/AAUvwnjDwLJeWs_jcgoVvQpC7YZxWMwP-N__UH-98dxGyw=s900-c-k-c0x00ffffff-no-rj',
    messageTime: '2 hours ago',
    messageText: 'Best yt videos in the world!!!',
  },
  {
    id: '3',
    userName: 'Chat 3',
    userImg:
      'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltcfa4652c8d383f56/5e21837f63d1b6503160d39b/Home-page.jpg',
    messageTime: '1 hours ago',
    messageText: 'League of legends gaming chat',
  },
  {
    id: '4',
    userName: 'Chat 4',
    userImg:
      'https://specials-images.forbesimg.com/imageserve/5ea6d49e165a170006a5d625/960x0.jpg?fit=scale',
    messageTime: '1 day ago',
    messageText: 'Crypto channel',
  },
  {
    id: '5',
    userName: 'Chat 5',
    userImg:
      'https://images.theconversation.com/files/290710/original/file-20190903-175663-lqb3z6.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
    messageTime: '2 days ago',
    messageText: 'monkey',
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
                chatId: item.userName,
              })
            }>
            <UserInfo>
              <UserImgWrapper>
                <UserImg
                  source={{
                    uri: item.userImg,
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
