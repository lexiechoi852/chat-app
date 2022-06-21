import { Box, HStack, VStack, Text } from '@chakra-ui/react'
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
            <Box
              display='flex'
              flexDirection='column'
              borderWidth='1px'
              borderRadius='lg'
            >
              <Text 
                pt={1} 
                pl={2} 
                fontSize='xs'
                alignSelf='flex-start'
                color='gray.600'
              >
                {message.sender.name}
              </Text>
              <HStack>
                <Box pb={2} pr={1} pl={2}>{message.content}</Box>
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
            </Box>
          </VStack>
        )
      }
    </VStack>
  )
}
