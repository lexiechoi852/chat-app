import { HStack } from '@chakra-ui/react'
import React from 'react'
import ChatBox from '../components/ChatBox'
import SideBar from '../components/SideBar'

export default function Homepage() {
  return (
    <HStack w='full' >
      <SideBar />
      <ChatBox />
    </HStack>
  )
}
