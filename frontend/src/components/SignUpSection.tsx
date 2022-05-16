import { Button, FormControl, FormLabel, Text, Input, VStack, InputRightElement, InputGroup } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function SignUpSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  

  const submit = () => {

  };

  return (
    <VStack spacing={4} align='flex-start' w='full'>
      <VStack spacing={1} align={['flex-start', 'center']} w='full'>
          <Text>Enter your email and password to sign up</Text>
      </VStack>
      <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input rounded='none' variant='filled' onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input rounded='none' variant='filled' onChange={(e) => setName(e.target.value)} />
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
      <FormControl isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input rounded='none' variant='filled' 
                type={ showPassword ? 'text' : 'password' }
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <InputRightElement w='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                    { showPassword ? 'Hide' : 'Show' }
                </Button>
            </InputRightElement>
          </InputGroup>
      </FormControl>
      <Button 
        rounded='none' 
        colorScheme='blue' 
        w={['full', 'auto']} 
        alignSelf='end'
      >
        Sign Up
      </Button>
    </VStack>
  )
}
