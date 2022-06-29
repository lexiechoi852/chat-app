import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement,VStack, Text, useToast, HStack, Heading, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { reset } from '../store/authSlice';
import { getInfo, login } from '../store/authThunk';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isAuth ,isLoading, isError, message } = useAppSelector((state) => state.auth);

  const submit = () => {
    if (!email || !password) {
        toast({
            title: 'Please enter your email/ password',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'bottom'
        });
    }
    const loginData = {
        email,
        password
    }
    dispatch(login(loginData));
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

    if (isAuth && !user) {
      dispatch(getInfo());
    }
    
    if (user) {
      toast({
        title: 'Login Success',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      navigate('/');
    }

    dispatch(reset());

  }, [user, isAuth, isError, message, navigate, dispatch])
  
  return (
    <Box
      w={['full', 'lg']}
      mt={[20, '10vh']}
      mx='auto'
      border={['none', '1px']}
      borderColor={['', 'gray.300']}
      borderRadius={10}
    >
      <VStack spacing={4} align='flex-start' w='full' p={8}>
        <HStack w='full' justifyContent='center' padding={2}>
          <Image src='chat-icon.png' boxSize='40px'  />
          <Heading ml='2'>Chat App</Heading>
        </HStack>
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
        <Button
            rounded='none' 
            colorScheme='blue' 
            w={['full', 'auto']} 
            alignSelf='end'
            isLoading={isLoading}
            onClick={submit}
        >
            Login
        </Button>
        <Box display='flex' w='100%' justifyContent='center'>
          <Text mr={1}>Don't have an account?</Text>
          <Text color='blue.500'>
            <Link to="/signup">Sign Up Now</Link>
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}
