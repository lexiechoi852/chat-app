import { Avatar, HStack, VStack, Text, Spinner, Button } from '@chakra-ui/react';
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import { Chat } from '../store/chatsSlice';
import { createSingleChat } from '../store/chatsThunk';
import { User } from '../store/usersSlice';

interface SearchResultProps {
  chats: Chat[];
  currentUser?: User;
  mode: string;
  handleTabChange: (tabIndex: number) => void;
}

export default function SearchResult({ chats, currentUser, mode, handleTabChange }: SearchResultProps ) {
  const dispatch = useAppDispatch();
  const { searchResult, isLoading } =  useAppSelector((state) => state.users);
  
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
      
    }
  }
  
  return (
    <VStack 
      mt={4}
      h='100%'
      overflowY='auto'
      style={{ height: mode === 'create' ? 'calc(100% - 120px - 32px)' : 'calc(100% - 80px - 32px)' }}
    >
      { searchResult && searchResult.length > 0 && searchResult.map((user, i) => 
        <HStack 
          key={i} 
          w='full'
          padding={2}
          borderWidth='1px'
          borderRadius='lg'
          cursor='pointer'
          _hover={{
            background: 'gray.100'
          }}
          onClick={() => handleChat(user)}
          >
          <Avatar boxSize='40px' name={user.name} mr={2} src='' />
          <Text>{user.name}</Text>
        </HStack>
        )
      }
      { searchResult.length === 0 && !isLoading && <div>No result</div> }
      { isLoading &&
        <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.100'
            color='blue.500'
            size='xl'
        />
       }
      {
        mode === 'create' &&
        <Button
          colorScheme='blue'
          alignSelf='end'
          pos="absolute"
          bottom='16px'
          onClick={() => handleTabChange(3)}
        >
          Skip
        </Button>
      }
    </VStack>
  )
}