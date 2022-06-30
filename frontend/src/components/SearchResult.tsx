import { Avatar, HStack, VStack, Text, Spinner } from '@chakra-ui/react';
import React from 'react'
import { useAppSelector } from '../hooks';

export default function SearchResult() {
  const { searchResult, isLoading } =  useAppSelector((state) => state.users);
  
  return (
    <VStack 
      mt={4}
      overflowY='auto'
      style={{ height: isLoading ? '100px': '' }}
    >
      { searchResult && searchResult.length > 0 && searchResult.map((user, i) => 
        <HStack 
            key={i} 
            w='full'
            padding={2}
            borderWidth='1px'
            borderRadius='lg'
            cursor='pointer'
            _hover={{
                background: '#f1f5f9'
            }}
            //   onClick={() => handleChat(user)}
            >
            <Avatar boxSize='40px' name={user.name} mr={2} src='' />
            <Text>{user.name}</Text>
        </HStack>
        )
      }
      { searchResult.length === 0 && !isLoading && <div>No result</div> }
      { isLoading &&
        <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
        />
       }
    </VStack>
  )
}