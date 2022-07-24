import { Button, VStack, Input, Text, HStack, Avatar } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import { resetSelectedUsers } from '../store/chatsSlice';
import { createGroupChat } from '../store/chatsThunk';

interface CreateGroupProps {
  handleTabChange: (tabIndex: number) => void;
}

export default function CreateGroup({ handleTabChange }: CreateGroupProps) {
  const [name, setName] = useState('');
  
  const dispatch = useAppDispatch();
  const { selectedUsers, isLoading } =  useAppSelector((state) => state.chats);

  const createGroup = async() => {
    let userIds: string[] = [];
    selectedUsers.forEach(user => {
      userIds.push(user._id);
    })
    const newChat = {
      chatName: name,
      userIds
    }
    const chat = await dispatch(createGroupChat(newChat));
    if (chat) {
      handleTabChange(0);
      dispatch(resetSelectedUsers());
    }
  }

  return (
    <VStack maxH='100vh' h='100%'>
      <Input
        backgroundColor='gray.200'
        _focus={{
          background: 'white'
        }}
        mb={4}
        placeholder='Group Name (required)'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {
        selectedUsers && selectedUsers.length > 0 &&
        <VStack w='100%'>
          <Text>Member</Text>
          {
            selectedUsers.map((user, i) => 
              <HStack 
                key={i} 
                w='full'
                padding={2}
                borderRadius='lg'
              >
                <Avatar 
                  boxSize='40px'
                  name={user.name}
                  mr={2} 
                  src={user.profilePicture ? user.profilePicture : ''}
                />
                <Text>{user.name}</Text>
              </HStack>
            )
          }
        </VStack>
      }  
      <Button
        colorScheme='blue'
        alignSelf='end'
        pos="absolute"
        bottom='16px'
        disabled={name ? false : true}
        isLoading={isLoading}
        onClick={createGroup}
      >
        Create
      </Button>
    </VStack>
  )
}
