import { Box, HStack, Image, VStack, Text, Avatar } from '@chakra-ui/react'
import React from 'react'
import { useAppDispatch } from '../hooks';
import { Chat } from '../store/chatsSlice';
import { createSingleChat, createGroupChat, CreateSingleChatAttributes } from '../store/chatsThunk';
import { User } from '../store/usersSlice'

interface NewChatProps {
  users: User[];
  chats: Chat[];
  currentUser?: User
}

export default function NewChat({ users, chats, currentUser }: NewChatProps) {
  console.log(users, 'users')

  const dispatch = useAppDispatch();
  
  return (
    <VStack mt={4} maxH='100vh' overflowY='auto'>
      <Box w='full'>
        <HStack 
          padding={2} 
          // onClick={createGroupChat}
        >
          <Image boxSize='40px' mr={2} src='default-group-icon.svg'/>
          <Text>New Group</Text>
        </HStack>
      </Box>
      <Text>Contact</Text>
      { users && users.map((user, i) => 
        <HStack 
          key={i} 
          w='full'
          padding={2}
          cursor='pointer'
          borderRadius={5}
          _hover={{
            background: '#f1f5f9'
          }}
          // onClick={() => handleChat(user)}
        >
          <Avatar boxSize='40px' name={user.name} mr={2} src='' />
          <Text>{user.name}</Text>
        </HStack>
      )}
    </VStack>
  )
}
