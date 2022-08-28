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
  Image,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
  Icon,
  Input,
  Button,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getInfo, logout } from '../store/authThunk'
import { fetchAllChats } from '../store/chatsThunk'
import { fetchAllUsers } from '../store/usersThunk'
import ChatList from './ChatList'
import CreateGroup from './CreateGroup'
import NewChat from './NewChat'
import Search from './Search'
import SearchResult from './SearchResult'
import { BsPerson, BsPencil, BsCamera } from 'react-icons/bs'
import { useFormik } from 'formik'

export default function SideBar() {
  const [tabIndex, setTabIndex] = useState(0);

  const dispatch = useAppDispatch();
  const { user } =  useAppSelector((state) => state.auth);
  const { users, searchText } =  useAppSelector((state) => state.users);
  const { chats, currentChat } =  useAppSelector((state) => state.chats);

  const { isOpen: isUserInfoOpen, onOpen: onUserInfoOpen, onClose: onUserInfoClose } = useDisclosure();
  const { isOpen: isUsernameOpen, onOpen: onUsernameOpen, onClose: onUsernameClose } = useDisclosure();
  const { isOpen: isUserDescriptionOpen, onOpen: onUserDescriptionOpen, onClose: onUserDescriptionClose } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      name: user?.name,
      description: user?.description
    },
    onSubmit: value => {
      console.log(value, 'value')
    }
  })

  useEffect(() => {
    if (!user) {
      dispatch(getInfo());
    }
    dispatch(fetchAllChats());
    dispatch(fetchAllUsers());
  }, [])

  const handleTabChange = (tabIndex: number) => {
    setTabIndex(tabIndex);
  }

  return (
    <Box
      display={{base: currentChat ? 'none' : 'flex', md: 'flex' }}
      w={{ base: '100%', md: '60%'}}
      p={4}
      h='100vh'
      overflow='hidden'
      border='1px'
      backgroundColor='#F7FAFC'
      borderColor='gray.200'
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
                  <PopoverHeader _hover={{background: 'gray.100'}} cursor='pointer' onClick={onUserInfoOpen}>
                    <Box display='flex'>
                      <Avatar 
                        size='md'
                        mr={2}
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

              <Modal isOpen={isUserInfoOpen} onClose={onUserInfoClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader pb={0}>Profile</ModalHeader>
                  <ModalCloseButton boxSize={12} />
                  <ModalBody pt={0}>
                    <Box position='relative'>
                      <Avatar
                        display='flex'
                        size='xl'
                        mx='auto'
                        my={3}
                        name={user?.name} 
                        src={user?.profilePicture ? user?.profilePicture : ''}
                        cursor='pointer'
                      />
                      <Box 
                        backgroundColor='gray.50'
                        p={2}
                        w='fit-content'
                        borderRadius='full'
                        position='absolute'
                        bottom={0}
                        left='55%'
                      >
                        <Icon as={BsCamera} boxSize={5} cursor='pointer' />
                      </Box>
                    </Box>
                    <Divider />
                      <Box display='flex' flexDir='column'>
                        <HStack 
                          my={2}
                          p={4}
                          borderRadius='lg'
                          _hover={{background: 'gray.100'}}
                          cursor='pointer'
                          onClick={onUsernameOpen}
                        >
                          <Icon as={BsPerson} boxSize={6} mr={4} />
                          <Box>{user?.name}</Box>
                        </HStack>
                        <HStack 
                          my={2}
                          p={4}
                          borderRadius='lg'
                          _hover={{background: 'gray.100'}}
                          cursor='pointer'
                          onClick={onUserDescriptionOpen}
                        >
                          <Icon as={BsPencil} ml={1} boxSize={5} mr={4} />
                          <Box>{user?.description ? user?.description : 'About'}</Box>
                        </HStack>
                      </Box>
                  </ModalBody>
                </ModalContent>
              </Modal>

              <Modal isOpen={isUsernameOpen} onClose={onUsernameClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Your Name</ModalHeader>
                  <ModalCloseButton boxSize={12} />
                  <ModalBody>
                    <form onSubmit={formik.handleSubmit}>
                      <Input
                        id='name'
                        name='name'
                        variant='filled'
                        value={formik.values.name}
                        placeholder='Name (Required)'
                        onChange={formik.handleChange} 
                      />
                      <Box mt={4} display='flex' justifyContent='end'>
                        <Button mr={2} onClick={onUsernameClose}>
                          Cancel
                        </Button>
                        <Button colorScheme='blue' type='submit'>
                          Save
                        </Button>
                      </Box>
                    </form>
                  </ModalBody>
                </ModalContent>
              </Modal>

              <Modal isOpen={isUserDescriptionOpen} onClose={onUserDescriptionClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>About</ModalHeader>
                  <ModalCloseButton boxSize={12} />
                  <ModalBody pt={0}>
                    <form onSubmit={formik.handleSubmit}>
                      <Input
                        id='description'
                        name='description'
                        variant='filled'
                        value={formik.values.description}
                        placeholder='Write something about yourself...'
                        onChange={formik.handleChange} 
                      />
                      <Box mt={4} display='flex' justifyContent='end'>
                        <Button mr={2} onClick={onUserDescriptionClose}>
                          Cancel
                        </Button>
                        <Button colorScheme='blue' type='submit'>
                          Save
                        </Button>
                      </Box>
                    </form>
                  </ModalBody>
                </ModalContent>
              </Modal>

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
          {
            tabIndex === 2 && 
            <HStack mb={2}>
              <Tab onClick={()=>setTabIndex(1)}>
                <ArrowBackIcon color='gray.900' />
              </Tab>
              <Text>Choose members</Text>
            </HStack>
          }
          {
            tabIndex === 3 && 
            <HStack mb={2}>
              <Tab onClick={()=>setTabIndex(2)}>
                <ArrowBackIcon color='gray.900' />
              </Tab>
              <Text>Name this group</Text>
            </HStack>
          }
        </TabList>

        <TabPanels h='100%'>
          <TabPanel p={0} h='100%'>
            <Search mode='chat' />
            <ChatList chats={chats} currentUser={user} />
          </TabPanel>
          <TabPanel p={0} h='100%'>
            <Search mode='new-chat' />
            {
              searchText
              ? <SearchResult chats={chats} currentUser={user} handleTabChange={handleTabChange} mode='default' />
              : <NewChat users={users} chats={chats} currentUser={user} handleTabChange={handleTabChange} mode='default' />
            }
          </TabPanel>
          <TabPanel p={0} h='100%'>
            <Search mode='new-chat' />
            {
              searchText
              ? <SearchResult chats={chats} currentUser={user} handleTabChange={handleTabChange} mode='create' />
              : <NewChat users={users} chats={chats} currentUser={user} handleTabChange={handleTabChange} mode='create' />
            }
          </TabPanel>
          <TabPanel p={0} h='100%'>
            <CreateGroup handleTabChange={handleTabChange} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
