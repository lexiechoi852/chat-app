import { Box, VStack, Text, FormControl, FormLabel, Input, useToast, InputGroup, InputRightElement, Button, HStack, Heading, Image } from '@chakra-ui/react'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { reset } from '../store/authSlice';
import { register } from '../store/authThunk';

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
  
    const toast = useToast();
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
  
    const { isRegisterSuccess, isLoading, isError, message } = useAppSelector((state) => state.auth);

    const formik = useFormik({
      initialValues: {
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
      },
      onSubmit: value => {
        if (value.password !== value.confirmPassword) {
          toast({
            title: 'Passwords do not match',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'bottom'
          });
        } else {
          dispatch(register(value));
        }
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
  
      if (isRegisterSuccess) {
        toast({
          title: 'Registration Success',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        })
        navigate('/login');
      }
  
      dispatch(reset());
  
    }, [isRegisterSuccess, isError, message, navigate, dispatch, toast])
    
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
          <Text>Let's create your account</Text>
        </VStack>
        <form onSubmit={formik.handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <FormControl isRequired mb={2}>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              name='email'
              id='email'
              rounded='none'
              variant='filled'
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </FormControl>
          <FormControl isRequired mb={2}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                name='name'
                id='name'
                rounded='none'
                variant='filled'
                value={formik.values.name}
                onChange={formik.handleChange}
              />
          </FormControl>
          <FormControl isRequired mb={2}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  name='password'
                  id='password'
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
          <FormControl isRequired mb={2}>
              <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  name='confirmPassword'
                  id='confirmPassword'
                  rounded='none'
                  variant='filled'
                  type={ showPassword ? 'text' : 'password' }
                  value={formik.values.confirmPassword}
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
            Sign Up
          </Button>
        </form>
        <Box display='flex' flexWrap='wrap' w='100%' justifyContent='center'>
          <Text mr={1}>Already have an account?</Text>
          <Text color='blue.500'>
            <Link to="/login">Login Now</Link>
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}