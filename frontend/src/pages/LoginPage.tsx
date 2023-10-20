import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement,VStack, Text, useToast, HStack, Heading, Image } from '@chakra-ui/react'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { reset } from '../store/authSlice';
import { getInfo, login } from '../store/authThunk';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isAuth ,isLoading, isError, message } = useAppSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: value => {
      if (!value.email || !value.password) {
        toast({
            title: 'Please enter your email/ password',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'bottom'
        });
      }
      dispatch(login(value));
    }
  })

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

  }, [user, isAuth, isError, message, navigate, dispatch, toast])
  
  const loginAsDemo = (account: string) => {
    if (account === '1') {
      dispatch(login({ email: 'demo1@gmail.com', password: 'demo1' }))
    } else {
      dispatch(login({ email: 'demo2@gmail.com', password: 'demo2' }))
    }
  }

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
          <form onSubmit={formik.handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <FormControl isRequired mb={2}>
              <FormLabel>Email Address</FormLabel>
              <Input
                id='email'
                name='email'
                rounded='none'
                variant='filled'
                value={formik.values.email}
                onChange={formik.handleChange} 
              />
            </FormControl>
            <FormControl isRequired mb={2}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input 
                  id='password'
                  name='password'
                  rounded='none' 
                  variant='filled' 
                  type={ showPassword ? 'text' : 'password' }
                  value={formik.values.password}
                  onChange={formik.handleChange}
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
              type='submit'
              isLoading={isLoading}
            >
              Login
            </Button>
          </form>
          <HStack w='full'>
            <Button
              rounded='none' 
              colorScheme='teal' 
              w='full'
              type='button'
              isLoading={isLoading}
              onClick={() => loginAsDemo('1')}
            >
                Login as Demo 1
            </Button>
            <Button
              rounded='none' 
              colorScheme='green' 
              w='full'
              type='button'
              isLoading={isLoading}
              onClick={() => loginAsDemo('2')}
            >
                Login as Demo 2
            </Button>
          </HStack>
          <Box display='flex' flexWrap='wrap' w='100%' justifyContent='center'>
            <Text mr={1}>Don't have an account?</Text>
            <Text color='blue.500'>
              <Link to="/signup">Sign Up Now</Link>
            </Text>
          </Box>
      </VStack>
    </Box>
  )
}
