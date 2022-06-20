import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import { Chat } from '../store/chatsSlice'
import { Message } from '../store/messagesSlice'
import { User } from '../store/usersSlice'

interface GroupMessageProps {
    chat: Chat,
    message: Message,
    user?: User
}

export default function GroupMessage({ chat, message, user }: GroupMessageProps) {
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
              <Box>{message.sender.name}</Box>
              <Box>{message.content}</Box>
            </Box>
          </VStack>
        )
      }
    </VStack>
  )
}
