import { Box, VStack, Text, HStack } from '@chakra-ui/react'
import React from 'react'
import { Chat } from '../store/chatsSlice'
import { Message } from '../store/messagesSlice'
import { User } from '../store/usersSlice'

interface SingleMessageProps {
  chat: Chat,
  message: Message,
  user?: User
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
            <HStack
              borderWidth='1px'
              borderRadius='lg'
            >
              <Box py={2} pr={1} pl={2}>{message.content}</Box>
              <Text
                color='gray.600'
                alignSelf='flex-end' 
                fontSize='xs' 
                py={1} 
                pr={1}
              >
                {new Date(message.createdAt).toLocaleString([], {hour: '2-digit', minute:'2-digit'})}
              </Text>
            </HStack>
          </VStack>
        )
        : (
          <VStack 
            w='100%'
            alignItems='start'
          >
            <HStack
              borderWidth='1px'
              borderRadius='lg'
            >
              <Box py={2} pr={1} pl={2}>{message.content}</Box>
              <Text 
                color='gray.600'
                alignSelf='flex-end' 
                fontSize='xs' 
                py={1} 
                pr={1}
              >
                {new Date(message.createdAt).toLocaleString([], {hour: '2-digit', minute:'2-digit'})}
              </Text>
            </HStack>
          </VStack>
        )
      }
    </VStack>
  )
}
