import { Button, FormControl, FormLabel, Text, Input, VStack, InputRightElement, InputGroup, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { reset } from '../store/authSlice';
import { register } from '../store/authThunk';

export default function SignUpSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isLoading, isError, message } = useAppSelector((state) => state.auth);

  const submit = () => {
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
    } else {
      const newUser = {
        name,
        email,
        password
      }
      dispatch(register(newUser));
    }
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: message,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
    }

    if (user) {
      toast({
        title: 'Registration Success',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      navigate('/');
    }

    dispatch(reset());

  }, [user, isError, message, navigate, dispatch])
  

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
        isLoading={isLoading}
        onClick={submit}
      >
        Sign Up
      </Button>
    </VStack>
  )
}
