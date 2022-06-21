import { VStack, Box, Image, HStack, Avatar } from '@chakra-ui/react'
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

  const getOtherUser = (chat: Chat, currentUser: User) => {
    const user = chat.users.filter(user => user._id !== currentUser._id);
    return user[0];
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
          _hover={{
            background: '#f1f5f9'
          }}
          onClick={() => fetchChat(chat._id)}
        >
          <HStack>
            {
              chat.isGroupChat 
              ? (
                <Image
                  boxSize='40px'
                  src='default-group-icon.svg'
                />
              ) : (
                <Avatar 
                  boxSize='40px'
                  name={getOtherUser(chat, currentUser!).name} 
                  src={getOtherUser(chat, currentUser!)?.profilePicture ? getOtherUser(chat, currentUser!)?.profilePicture : ''}
                />
              )
            }
            <Box>
                {chat.isGroupChat ? chat.chatName : getOtherUser(chat, currentUser!)?.name}
            </Box>
          </HStack>
        </Box>
      )}
    </VStack>
  )
}
