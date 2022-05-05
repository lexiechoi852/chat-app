import { Button, Checkbox, FormControl, FormLabel, HStack, Input, VStack, Text } from '@chakra-ui/react'
import React from 'react'

export default function LoginSection() {
  return (
    <VStack spacing={4} align='flex-start' w='full'>
        <VStack spacing={1} align={['flex-start', 'center']} w='full'>
            <Text>Enter your email and password to login</Text>
        </VStack>
        <FormControl>
            <FormLabel>Email Adress</FormLabel>
            <Input rounded='none' variant='filled' />
        </FormControl>
        <FormControl>
        <FormLabel>Password</FormLabel>
            <Input rounded='none' variant='filled' type='password' />
        </FormControl>
        <HStack w='full' justify='space-between'>
            <Checkbox>Remember me</Checkbox>
            <Button variant='link' colorScheme='blue'>
                Forgot Password?
            </Button>
        </HStack>
        <Button rounded='none' colorScheme='blue' w={['full', 'auto']} alignSelf='end'>
            Login
        </Button>
    </VStack>
  )
}
