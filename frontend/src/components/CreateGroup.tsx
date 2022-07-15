import { Button, VStack, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function CreateGroup() {
  const [name, setName] = useState('');

  return (
    <VStack maxH='100vh' h='100%'>
      
      <Input
        backgroundColor='gray.200'
        _focus={{
          background: 'white'
        }}
        placeholder='Group Name (required)'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        colorScheme='blue'
        alignSelf='end'
        pos="absolute"
        bottom='16px'
        disabled={name ? false : true}
      //   onClick={}
      >
        Create
      </Button>
    </VStack>
  )
}
