import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import { Chat } from '../store/chatsSlice'
import { Message } from '../store/messagesSlice'
import { User } from '../store/usersSlice'

interface SingleMessageProps {
  chat: Chat,
  message: Message,
  user?: User
}

const getOtherUser = (chat: Chat, currentUser: User) => {
  const user = chat.users.filter(user => user._id !== currentUser._id);
  return user[0];
}

export default function SingleMessage({ chat, message, user }: SingleMessageProps) {
  return (
    <VStack w='100%'>
      {
        message.sender._id === user?._id
        ? (
          <VStack
            w='100%'
            p={3}
            alignItems='end'
            borderWidth='1px'
            borderRadius='lg'
          >
            <Box>{message.content}</Box>
            <Box></Box>
          </VStack>
        )
        : (
          <VStack 
            
          >
            <Box>{message.content}</Box>
          </VStack>
        )
      }
  </VStack>
  )
}
