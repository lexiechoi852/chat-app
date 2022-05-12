import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, FormLabel, HStack, Input, VStack, Image, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UploadPage() {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string>('default-single-icon.svg');
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const toast = useToast();

  useEffect(() => {
    if (!image) {
      reset();
      return;
    }

    const imageUrl = URL.createObjectURL(image);
    setPreview(imageUrl)
  
    return () => {
      URL.revokeObjectURL(imageUrl);
    }
  }, [image])
  
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      reset();
      return;
    }

    setImage(e.target.files[0]);
  };

  const upload = async () => {
    setLoading(true);
    if (!image) {
      toast({
        title: 'Please upload an image for profile picture.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
      setLoading(false);
    }

    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'chat-app');
      const url = process.env.REACT_APP_CLOUDINARY_URL;
      
      if (url) {
        const data = await fetch(url, {
          method: 'POST',
          body: formData
        });
  
        if (data) {
          toast({
            title: 'Successfully upload profile picture.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom'
          });
          setLoading(false);
          navigate('/');
        }
      }
    }

  };

  const reset = () => {
    if (ref && ref.current && ref.current) {
      ref.current.value = '';
    }
    setImage(undefined);
    setPreview('default-single-icon.svg');
  };

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
          src={preview}
        />
        <FormControl mb={2}>
            <FormLabel>Upload profile picture</FormLabel>
            <InputGroup>
              <Input 
                p={1.5} 
                type='file' 
                accept='image/*' 
                ref={ref}
                onChange={handleImage}
              />
              <InputRightElement>
                <Button onClick={reset}>
                  <CloseIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <HStack w='full' justifyContent='end'>
            <Button rounded='none' w={['full', 'auto']} alignSelf='end'>
              Skip
            </Button>
            <Button
              rounded='none' 
              colorScheme='blue' 
              w={['full', 'auto']} 
              alignSelf='end' 
              onClick={()=>upload()}
              isLoading={loading}
            >
              Upload
            </Button>
          </HStack>
      </VStack>
    </Box>
  )
}
