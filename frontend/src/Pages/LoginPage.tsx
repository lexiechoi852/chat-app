import { Box, Heading, HStack, Image, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react'
import React from 'react'
import LoginSection from '../components/LoginSection'
import SignUpSection from '../components/SignUpSection'

export default function LoginPage() {
  return (
    <Box
      w={['full', 'lg']}
      mt={[20, '10vh']}
      mx='auto'
      border={['none', '1px']}
      borderColor={['', 'gray.300']}
      borderRadius={10}
    >
      <VStack w='full' p={[8 ,10]}>
        <HStack padding={2}>
            <Image src='chat-icon.png' boxSize='40px'  />
            <Heading ml='2'>Chat App</Heading>
        </HStack>
        <Tabs w='full' variant='soft-rounded'>
          <TabList w='full'>
            <Tab w='50%'>Login</Tab>
            <Tab w='50%'>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginSection />
            </TabPanel>
            <TabPanel>
              <SignUpSection />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  )
}
