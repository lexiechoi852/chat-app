import { VStack, Box, Image, HStack } from '@chakra-ui/react'
import React from 'react'
import { useAppDispatch } from '../hooks';
import { Chat } from '../store/chatsSlice'
import { fetchChatById } from '../store/chatsThunk';
import { User } from '../store/usersSlice';

interface ChatListProps {
  chats: Chat[];
  currentUser?: User;
}

export default function ChatList({ chats, currentUser } : ChatListProps) {

  const dispatch = useAppDispatch();
  
  const fetchChat = (chatId: string) => {
    dispatch(fetchChatById(chatId));
  }

  const handleChatName = (currentUser: User | undefined, chat: Chat) => {
    if (!currentUser) {
      return;
    }

    const user = chat.users.find(user => currentUser._id !== user._id);
    console.log(user, 'handleChatName')
    if (user) {
      return user.name;
    } else {
      return chat.chatName;
    }
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
          <Image 
            boxSize='48px' 
            src={chat.isGroupChat 
              ? 'default-group-icon.svg' 
              : 'default-single-icon.svg'}
          />
        
            <Box>
              {chat.isGroupChat ? chat.chatName : handleChatName(currentUser, chat)}
            </Box>
            
          </HStack>
        </Box>
      )}
    </VStack>
  )
}
