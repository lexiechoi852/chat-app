import { Button, FormControl, FormLabel, Text, Input, VStack } from '@chakra-ui/react'
import React from 'react'

export default function SignUpSection() {
  return (
    <VStack spacing={4} align='flex-start' w='full'>
      <VStack spacing={1} align={['flex-start', 'center']} w='full'>
          <Text>Enter your email and password to sign up</Text>
      </VStack>
      <FormControl>
          <FormLabel>Email Adress</FormLabel>
          <Input rounded='none' variant='filled' />
      </FormControl>
      <FormControl>
      <FormLabel>Password</FormLabel>
          <Input rounded='none' variant='filled' type='password' />
      </FormControl>
      <Button rounded='none' colorScheme='blue' w={['full', 'auto']} alignSelf='end'>
          Sign Up
      </Button>
  </VStack>
  )
}
