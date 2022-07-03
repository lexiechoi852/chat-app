import { Box, HStack, Image, VStack, Text, Avatar } from '@chakra-ui/react'
import React from 'react'
import { useAppDispatch } from '../hooks';
import { Chat } from '../store/chatsSlice';
import { createSingleChat, createGroupChat, CreateGroupChatAttributes } from '../store/chatsThunk';
import { User } from '../store/usersSlice';

interface NewChatProps {
  users: User[];
  chats: Chat[];
  currentUser?: User
}

export default function NewChat({ users, chats, currentUser }: NewChatProps) {
  const dispatch = useAppDispatch();

  const handleSingleChat = (user: User) => {
    let hasOtherUserId = false;
    let hasCurrentUserId = false;
    let hasChat = false;

    for (let chat of chats) {
      if (!chat.isGroupChat) {
        for (let u of chat.users) {
          if (u._id === user._id) {
            hasOtherUserId = true;
          }

          if (currentUser && u._id === currentUser._id) {
            hasCurrentUserId = true;
          }
        }
        
        if (hasOtherUserId && hasCurrentUserId) {
          hasChat = true;
          break;
        }
      }
      hasOtherUserId = false;
      hasCurrentUserId = false;
    }

    if (!hasChat) {
      dispatch(createSingleChat(user._id));
    }
  }

  return (
    <VStack mt={4} maxH='100vh' overflowY='auto'>
      <Box w='full'>
        <HStack 
          padding={2}
          borderWidth='1px'
          borderRadius='lg'
          cursor='pointer'
          _hover={{
            background: '#f1f5f9'
          }}
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
          borderWidth='1px'
          borderRadius='lg'
          cursor='pointer'
          _hover={{
            background: '#f1f5f9'
          }}
          onClick={() => handleSingleChat(user)}
        >
          <Avatar boxSize='40px' name={user.name} mr={2} src='' />
          <Text>{user.name}</Text>
        </HStack>
      )}
    </VStack>
  )
}
