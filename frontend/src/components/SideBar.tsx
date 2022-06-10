import { ArrowBackIcon, ChatIcon } from '@chakra-ui/icons'
import { Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs, HStack, Avatar } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getInfo } from '../store/authThunk'
import { fetchAllChats } from '../store/chatsThunk'
import { fetchAllUsers } from '../store/usersThunk'
import ChatList from './ChatList'
import NewChat from './NewChat'
import Search from './Search'

export default function SideBar() {
  const [tabIndex, setTabIndex] = useState(0);

  const dispatch = useAppDispatch();
  const { user } =  useAppSelector((state) => state.auth);
  const { users } =  useAppSelector((state) => state.users);
  const { chats, currentChat } =  useAppSelector((state) => state.chats);

  useEffect(() => {
    dispatch(getInfo());
    dispatch(fetchAllChats())
    dispatch(fetchAllUsers())

  }, [])

  return (
    <Box
      display={{base: currentChat ? 'none' : 'flex', md: 'flex' }}
      w={{ base: '100%', md: '31%'}}
      p={4}
      h='100vh'
      overflow='hidden'
      background-color='gray.400'
    >
      <Tabs
        w='full'
        variant='soft-rounded'
        colorScheme='whiteAlpha'
        index={tabIndex}
      >
        <TabList>
          { tabIndex === 0 && 
            <HStack w='full'>
              <Avatar 
                size='sm' 
                mr='auto' 
                name={user?.name} 
                src={user?.profilePicture ? user?.profilePicture : ''}
              />
              <Tab onClick={()=>setTabIndex(1)}>
                <ChatIcon w={8} color='gray.900' />
              </Tab>
            </HStack>
          }
          { tabIndex === 1 && 
            <HStack>
              <Tab onClick={()=>setTabIndex(0)}>
                <ArrowBackIcon color='gray.900' />
              </Tab>
              <Text>New Conversion</Text>
            </HStack>
          }
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <Search mode='chat' />
            <ChatList chats={chats} currentUser={user} />
          </TabPanel>
          <TabPanel p={0}>
            <Search mode='new-chat' />
            <NewChat users={users} chats={chats} currentUser={user} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
