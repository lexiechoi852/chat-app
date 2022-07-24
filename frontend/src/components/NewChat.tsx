import { Box, HStack, Image, VStack, Text, Avatar, Button, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import { Chat, setSelectedUsers } from '../store/chatsSlice';
import { createSingleChat } from '../store/chatsThunk';
import { User } from '../store/usersSlice';

interface NewChatProps {
  users: User[];
  chats: Chat[];
  currentUser?: User;
  mode: string;
  handleTabChange: (tabIndex: number) => void;
}

export default function NewChat({ users, chats, currentUser, mode, handleTabChange }: NewChatProps) {
  const dispatch = useAppDispatch();
  const { selectedUsers } =  useAppSelector((state) => state.chats);

  const handleChat = (user: User) => {
    if (mode === 'default') {
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

    if (mode === 'create') {
      const found = selectedUsers.find(u => user._id === u._id);

      if (!found) {
        dispatch(setSelectedUsers([...selectedUsers, user]));
      }
    }
  }

  const removeSelectedUser = (user: User) => {
    const newSelectedUsers = selectedUsers.filter(u => u._id !== user._id);
    dispatch(setSelectedUsers(newSelectedUsers));
  }

  return (
    <VStack mt={4} maxH='100vh' h='100%' overflowY='auto' style={{ height: mode === 'create' ? 'calc(100% - 120px - 32px)' : 'calc(100% - 80px - 32px)' }}>
      { mode === 'default' &&
        <Box w='full'>
          <HStack 
            padding={2}
            borderRadius='lg'
            cursor='pointer'
            _hover={{
              background: 'gray.100'
            }}
            onClick={() => handleTabChange(2)}
          >
            <Image boxSize='40px' mr={2} src='default-group-icon.svg'/>
            <Text>New Group</Text>
          </HStack>
        </Box>
      }
      {
        mode === 'create' && selectedUsers &&
        <Box w='100%' display='flex' flexWrap='wrap'>
          {selectedUsers.map((user) => (
            <Tag
              size='lg'
              key={user._id}
              borderRadius='full'
              variant='solid'
              backgroundColor='gray.100'
              color='gray.900'
              mb={2}
              mr={2}
            >
              <Avatar 
                boxSize='20px'
                name={user.name}
                mr={2}
                src={user.profilePicture ? user.profilePicture : ''}
              />
              <TagLabel>{user.name}</TagLabel>
              <TagCloseButton onClick={() => removeSelectedUser(user)} />
            </Tag>
          ))}
        </Box>
      }
      <Text>Contact</Text>
      { users && users.map((user, i) => 
        <HStack 
          key={i} 
          w='full'
          padding={2}
          borderRadius='lg'
          cursor='pointer'
          _hover={{
            background: 'gray.100'
          }}
          onClick={() => handleChat(user)}
        >
          <Avatar 
            boxSize='40px'
            name={user.name}
            mr={2} 
            src={user.profilePicture ? user.profilePicture : ''}
          />
          <Text>{user.name}</Text>
        </HStack>
      )}
      {
        mode === 'create' &&
        <Button
          colorScheme='blue'
          alignSelf='end'
          pos="absolute"
          bottom='16px'
          onClick={() => handleTabChange(3)}
        >
          {selectedUsers && selectedUsers.length > 0 ? 'Next' : 'Skip'}
        </Button>
      }
    </VStack>
  )
}
