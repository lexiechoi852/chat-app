import { ArrowBackIcon, ChatIcon } from '@chakra-ui/icons'
import { Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs, HStack, Avatar } from '@chakra-ui/react'
import React, { useState } from 'react'
import ChatList from './ChatList'
import NewChat from './NewChat'
import Search from './Search'

export default function SideBar() {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <Box 
      w='30%'
      p={4}
      background-color='gray.400'
    >
      <Tabs 
        variant='soft-rounded'
        colorScheme='whiteAlpha'
        index={tabIndex}
      >
        <TabList>
          { tabIndex === 0 && 
            <HStack w='full'>
              <Avatar size='sm' name='Dan Abrahmov' mr='auto' src='https://bit.ly/dan-abamov' />
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
            <ChatList />
          </TabPanel>
          <TabPanel p={0}>
            <Search mode='new-chat' />
            <NewChat />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
