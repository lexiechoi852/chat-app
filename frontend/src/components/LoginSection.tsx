import { Button, Checkbox, FormControl, FormLabel, HStack, Input, VStack, Text, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function LoginSection() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <VStack spacing={4} align='flex-start' w='full'>
        <VStack spacing={1} align={['flex-start', 'center']} w='full'>
            <Text>Enter your email and password to login</Text>
        </VStack>
        <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input rounded='none' variant='filled' onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input rounded='none' variant='filled' 
                type={ showPassword ? 'text' : 'password' }
                onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement w='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                    { showPassword ? 'Hide' : 'Show' }
                </Button>
            </InputRightElement>
          </InputGroup>
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
