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
            alignItems='start'
          >
            <Box>{message.sender.name}</Box>
            <Box>{message.content}</Box>
          </VStack>
        )
        : (
          <VStack
            alignItems='end'
          >
            <Box>{message.sender.name}</Box>
            <Box>{message.content}</Box>
          </VStack>
        )
      }
    </VStack>
  )
}
