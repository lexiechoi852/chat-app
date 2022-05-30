import { Box, HStack, Image, VStack, Text, Avatar } from '@chakra-ui/react'
import React from 'react'
import { User } from '../store/usersSlice'

interface NewChatProps {
  users: User[]
}

export default function NewChat({ users }: NewChatProps) {
  console.log(users, 'users')
  return (
    <VStack mt={4} maxH='100vh' overflowY='auto'>
      <Box w='full'>
        <HStack>
          <Image boxSize='48px' mr={2} src='default-group-icon.svg'/>
          <Text>New Group</Text>
        </HStack>
      </Box>
      <Text>Contact</Text>
      { users && users.map((user, i) => 
        <HStack key={i} w='full'>
          <Avatar size='md' name={user.name} mr={2} src='' />
          <Text>{user.name}</Text>
        </HStack>
      )}
    </VStack>
  )
}
