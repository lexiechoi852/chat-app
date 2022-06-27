import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { searchUsers } from '../store/usersThunk'
import { debounce } from 'lodash-es'

interface SearchProps {
    mode: string
}

export default function Search({ mode }: SearchProps) {

  const dispatch = useAppDispatch();
  const { searchText } =  useAppSelector((state) => state.users);

  const handleSearch = (search: string) => {
    if (!search || searchText === search) {
      return;
    }
    console.log(search, 'search')
    
    dispatch(searchUsers(search));
  }

  const debouncedSearch = useRef(
    debounce(async (criteria) => {
      await handleSearch(criteria);
    }, 400)
  ).current;

  return (
    <InputGroup>
        <InputLeftElement>
            <SearchIcon />
        </InputLeftElement>
        <Input
          variant='filled'
          placeholder='Search' 
          onChange={(e) => debouncedSearch(e.target.value)}
        />
  </InputGroup>
  )
}
