import { Avatar, Box, FormControl, HStack, Image, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import { Chat, resetCurrentChat } from '../store/chatsSlice';
import { User } from '../store/usersSlice';
import io from 'socket.io-client';
import { addMessage, Message, setMessages } from '../store/messagesSlice';
import SingleMessage from './SingleMessage';
import GroupMessage from './GroupMessage';
import { ChevronLeftIcon } from '@chakra-ui/icons';

export default function ChatBox() {
  const socketRef = useRef<any>(null);
  const messageRef = useRef<any>(null);

  const [messageContent, setMessageContent] = useState('');

  const { currentChat } =  useAppSelector((state) => state.chats);
  const { messages } =  useAppSelector((state) => state.messages);
  const { user } =  useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const getOtherUser = (chat: Chat, currentUser: User) => {
    const user = chat.users.filter(user => user._id !== currentUser._id);
    return user[0];
  }
  
  useEffect(() => {
    if (process.env.REACT_APP_SOCKET_ENDPOINT) {
      socketRef.current = io(process.env.REACT_APP_SOCKET_ENDPOINT, {
        extraHeaders: {
          Authorization: `${localStorage.getItem('token')}`
        }
      });
    }
    return () => {
      socketRef.current.disconnect();
    }
  }, [])

  useEffect(() => {
    if (currentChat) {
      const {current: socket} = socketRef;
      socket.emit('joinRoom', currentChat._id);

      socket.emit('findAllMessages', currentChat._id, (messages: Message[]) => {
        dispatch(setMessages(messages));
      })

      socket.on('newMessage', (message: Message) => {
        dispatch(addMessage(message));
      })
      return () => {
        socket.emit('leaveRoom', currentChat._id);
      }
    }
  }, [dispatch, currentChat])

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, [messages])
  
  const sendMessage = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && messageContent && currentChat) {
      const newMessage = {
        content: messageContent,
        chatId: currentChat._id
      }
      const {current: socket} = socketRef;
      socket.emit('createMessage', newMessage);
      setMessageContent('');
    }
  }

  const handleTyping = (e :React.ChangeEvent<HTMLInputElement>) => {
    setMessageContent(e.target.value);
  }

  
  return (
    <Box 
      display={{ base: currentChat ? 'flex' : 'none', md: 'flex'}}
      flexDir='column'
      alignItems='center'
      justifyContent='start'
      overflow='hidden'
      w='full'
      h='100vh'
      p={4}
    >
      {
          currentChat 
          ? (
            <VStack w='full' h='100%'>
              <HStack w='full' justifyContent='start'>
                <ChevronLeftIcon 
                  display={{ base: 'flex', md: 'none' }}
                  boxSize={6}
                  cursor='pointer'
                  onClick={() => dispatch(resetCurrentChat())}
                />
                {
                  currentChat.isGroupChat 
                  ? (
                    <Image
                      boxSize='40px'
                      src='default-group-icon.svg'
                    />
                  ) : (
                    <Avatar 
                      size='sm' 
                      mr='auto' 
                      name={getOtherUser(currentChat, user!).name} 
                      src={getOtherUser(currentChat, user!)?.profilePicture ? getOtherUser(currentChat, user!)?.profilePicture : ''}
                    />
                  )
                }
                <Box>
                    {currentChat.isGroupChat ? currentChat.chatName : getOtherUser(currentChat, user!)?.name}
                </Box>
              </HStack>
              <VStack w='100%' h='100%' overflow='auto'>
                  {
                    messages && messages.length > 0
                    ? messages.map((message, index) => (
                      <Box key={index} w='100%'>
                      {
                        currentChat.isGroupChat
                        ? <GroupMessage chat={currentChat} message={message} user={user} />
                        : <SingleMessage chat={currentChat} message={message} user={user} />
                      }
                      </Box>
                    ))
                    : <>No Messages</>
                  }
                  <Box ref={messageRef}></Box>
              </VStack>
              <FormControl mt='auto' onKeyDown={(e) => sendMessage(e)}>
                <Input
                  placeholder='Send a message'
                  value={messageContent}
                  onChange={handleTyping}
                />
              </FormControl>
            </VStack>
          ) : (
          <Box>Default Chat</Box>
        )
      }
    </Box>
  )
}
