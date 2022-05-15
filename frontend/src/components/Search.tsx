import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'

interface SearchProps {
    mode: string
}

export default function Search({ mode }: SearchProps) {
  return (
    <InputGroup>
        <InputLeftElement>
            <SearchIcon />
        </InputLeftElement>
        <Input variant='filled' placeholder='Search' />
  </InputGroup>
  )
}
