import { Box, Button, FormControl, FormLabel, HStack, Input, VStack, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export default function UploadPage() {
  const [image, setImage] = useState('default-single-icon.svg');
  const [preview, setPreview] = useState('');

  useEffect(() => {
    
  
    return () => {
      
    }
  }, [])
  
  const handleImage = (image: any) => {

  };

  const upload = () => {

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
      <VStack w='full' p={8}>
        <Image
          boxSize='100px'
          src={image}
        />
        <FormControl mb={2}>
            <FormLabel>Upload profile picture</FormLabel>
            <Input type='file' p={1.5} accept='image/*'  />
          </FormControl>
          <HStack w='full' justifyContent='end'>
            <Button rounded='none' w={['full', 'auto']} alignSelf='end'>
              Skip
            </Button>
            <Button rounded='none' colorScheme='blue' w={['full', 'auto']} alignSelf='end' onClick={()=>upload()}>
              Upload
            </Button>
          </HStack>
      </VStack>
    </Box>
  )
}
