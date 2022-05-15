import { HStack } from '@chakra-ui/react'
import React from 'react'
import SideBar from '../components/SideBar'

export default function Homepage() {
  return (
    <HStack w='full' >
      <SideBar />
    </HStack>
  )
}
