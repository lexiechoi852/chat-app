import { Box } from '@chakra-ui/react'
import React from 'react'
import { useAppSelector } from '../hooks';
import { Chat } from '../store/chatsSlice';
import { User } from '../store/usersSlice';

export default function ChatBox() {

  const { currentChat } =  useAppSelector((state) => state.chats);
  const { user } =  useAppSelector((state) => state.auth);

  const handleChatName = (currentUser: User | undefined, chat: Chat) => {
    if (!currentUser) {
      return;
    }

    const user = chat.users.find(user => currentUser._id !== user._id);

    if (user) {
      return user.name;
    } else {
      return chat.chatName;
    }
  }
  
  return (
    <Box 
      display={{ base: currentChat ? 'flex' : 'none', md: 'flex'}}
      flexDir='column'
      alignItems='center'
      justifyContent='start'
      w='full'
      h='100vh'
      p={4}
    >
      {
          currentChat 
          ? (
            <Box>
                {currentChat.isGroupChat ? currentChat.chatName : handleChatName(user, currentChat)}
            </Box> 
          ) : (
          <Box>Default Chat</Box>
        )
      }
    </Box>
  )
}
