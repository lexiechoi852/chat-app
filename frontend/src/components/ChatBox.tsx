import { Box, FormControl, HStack, Image, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import { Chat } from '../store/chatsSlice';
import { User } from '../store/usersSlice';

export default function ChatBox() {
  // const socket = useRef<any>();
  const [messageContent, setMessageContent] = useState('');

  const { currentChat } =  useAppSelector((state) => state.chats);
  const { user } =  useAppSelector((state) => state.auth);
  const { messages, isLoading } =  useAppSelector((state) => state.messages);

  const dispatch = useAppDispatch();

  const handleChatName = (currentUser: User | undefined, chat: Chat) => {
    if (!currentUser) {
      return;
    }

    const user = chat.users.find(user => currentUser._id !== user._id);

    if (user) {
      return user.name;
    } else {
      return chat.chatName;
    }
  }
  
  useEffect(() => {
    
   
  }, [])
  
  const sendMessage = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && messageContent && currentChat) {
      const newMessage = {
        content: messageContent,
        chatId: currentChat._id
      }
    }
  }

  const handleTyping = (e :React.ChangeEvent<HTMLInputElement>) => {

  }

  
  return (
    <Box 
      display={{ base: currentChat ? 'flex' : 'none', md: 'flex'}}
      flexDir='column'
      alignItems='center'
      justifyContent='start'
      w='full'
      h='100vh'
      p={4}
    >
      {
          currentChat 
          ? (
            <HStack w='full' justifyContent='start'>
              <Image 
                boxSize='40px' 
                src={currentChat.isGroupChat 
                  ? 'default-group-icon.svg' 
                  : 'default-single-icon.svg'}
              />
              <Box>
                  {currentChat.isGroupChat ? currentChat.chatName : handleChatName(user, currentChat)}
              </Box>
              <FormControl onKeyDown={(e) => sendMessage(e)}>
                <Input
                  placeholder='Send a message'
                  value={messageContent}
                  onChange={handleTyping}
                />
              </FormControl>
            </HStack>
          ) : (
          <Box>Default Chat</Box>
        )
      }
    </Box>
  )
}
