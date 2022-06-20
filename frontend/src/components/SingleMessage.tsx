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
            p={2}
            alignItems='end'

          >
            <Box
              p={2}
              borderWidth='1px'
              borderRadius='lg'
            >
              {message.content}
            </Box>
          </VStack>
        )
        : (
          <VStack 
            w='100%'
            alignItems='start'
          >
            <Box
              p={2}
              borderWidth='1px'
              borderRadius='lg'
            >
              {message.content}
            </Box>
          </VStack>
        )
      }
  </VStack>
  )
}
