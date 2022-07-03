import { ArrowBackIcon, ChatIcon } from '@chakra-ui/icons'
import { 
  Box,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  HStack,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Image
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getInfo, logout } from '../store/authThunk'
import { fetchAllChats } from '../store/chatsThunk'
import { fetchAllUsers } from '../store/usersThunk'
import ChatList from './ChatList'
import NewChat from './NewChat'
import Search from './Search'
import SearchResult from './SearchResult'

export default function SideBar() {
  const [tabIndex, setTabIndex] = useState(0);

  const dispatch = useAppDispatch();
  const { user } =  useAppSelector((state) => state.auth);
  const { users, searchText } =  useAppSelector((state) => state.users);
  const { chats, currentChat } =  useAppSelector((state) => state.chats);

  useEffect(() => {
    if (!user) {
      dispatch(getInfo());
    }
    dispatch(fetchAllChats());
    dispatch(fetchAllUsers());
  }, [])

  return (
    <Box
      display={{base: currentChat ? 'none' : 'flex', md: 'flex' }}
      w={{ base: '100%', md: '60%'}}
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
            <Box display='flex' w='full' mb={2}>
              <Popover>
                <PopoverTrigger>
                <Avatar 
                  size='sm'
                  mr='auto'
                  cursor='pointer'
                  name={user?.name} 
                  src={user?.profilePicture ? user?.profilePicture : ''}
                />
                </PopoverTrigger>
                <PopoverContent ml={4}>
                  <PopoverCloseButton />
                  <PopoverHeader>
                    <Box display='flex'>
                      <Avatar 
                        size='md'
                        mr={2}
                        cursor='pointer'
                        name={user?.name} 
                        src={user?.profilePicture ? user?.profilePicture : ''}
                      />
                      <Box display='flex' flexDirection='column' alignItems='flex-start'>
                        <Box fontWeight='bold'>{user?.name}</Box>
                        <Box fontSize='xs'>{user?.email}</Box>
                      </Box>
                    </Box>
                  </PopoverHeader>
                  <PopoverBody>
                    <Box display='flex' alignItems='center' cursor='pointer'>
                      <Image mr={2} boxSize='20px' src='logout.png'/>
                      <Box onClick={() => dispatch(logout())}>Logout</Box>
                    </Box>
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              <Tab onClick={()=>setTabIndex(1)}>
                <ChatIcon boxSize={5} color='gray.900' />
              </Tab>
            </Box>
          }
          { tabIndex === 1 && 
            <HStack mb={2}>
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
            {
              searchText
              ? <SearchResult />
              : <NewChat users={users} chats={chats} currentUser={user} />
            }
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
