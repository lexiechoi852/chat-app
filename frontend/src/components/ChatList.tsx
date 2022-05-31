import { VStack, Box, Image, HStack } from '@chakra-ui/react'
import React from 'react'
import { useAppDispatch } from '../hooks';
import { Chat } from '../store/chatsSlice'
import { fetchChatById } from '../store/chatsThunk';

interface ChatListProps {
  chats: Chat[]
}

export default function ChatList({ chats } : ChatListProps) {

  const dispatch = useAppDispatch();
  
  const fetchChat = (chatId: string) => {
    dispatch(fetchChatById(chatId));
  }

  // console.log(chats, 'chats')
  return (
    <VStack mt={4}>
      {chats && chats.map((chat, i) => 
        <Box 
          key={i}
          w='full'
          padding={2}
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
          cursor='pointer'
          onClick={() => fetchChat(chat._id)}
        >
          <HStack>
            {chat.isGroupChat && <Image boxSize='48px' src='default-group-icon.svg' />}
            {!chat.isGroupChat && <Image boxSize='48px' src='default-single-icon.svg' />}
            
            <Box>
              {chat.chatName}
            </Box>
            <Box>
              
            </Box>
          </HStack>
        </Box>
      )}
    </VStack>
  )
}
