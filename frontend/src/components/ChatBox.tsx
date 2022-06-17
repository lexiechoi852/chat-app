import { Box, FormControl, HStack, Image, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import { Chat } from '../store/chatsSlice';
import { User } from '../store/usersSlice';
import io from 'socket.io-client';
import { Message } from '../store/messagesSlice';
import SingleMessage from './SingleMessage';
import GroupMessage from './GroupMessage';

export default function ChatBox() {
  const socketRef = useRef<any>(null);

  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { currentChat } =  useAppSelector((state) => state.chats);
  const { user } =  useAppSelector((state) => state.auth);

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
    if (process.env.REACT_APP_SOCKET_ENDPOINT) {
      socketRef.current = io(process.env.REACT_APP_SOCKET_ENDPOINT, {
        extraHeaders: {
          Authorization: `${localStorage.getItem('token')}`
        }
      });
    }
    return () => socketRef.current.disconnect();
   
  }, [])

  useEffect(() => {
    if (currentChat) {
      const {current: socket} = socketRef;
      socket.emit('findAllMessages', currentChat._id, (messages: Message[]) => {
        setMessages(messages);
      })
    }
  }, [currentChat])
  
  const sendMessage = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && messageContent && currentChat) {
      const newMessage = {
        content: messageContent,
        chatId: currentChat._id
      }
      console.log(newMessage, 'newMessage')
      const {current: socket} = socketRef;
      socket.emit('createMessage', newMessage, (message: Message) => {
        setMessages([...messages, message]);
      })
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
      w='full'
      h='100vh'
      p={4}
    >
      {
          currentChat 
          ? (
            <VStack w='full' h='100%'>
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
              </HStack>
              <VStack w='100%' h='100%'>
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
