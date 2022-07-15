import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { searchUsers } from '../store/usersThunk'
import { debounce } from 'lodash-es'
import { setSearchText } from '../store/usersSlice'

interface SearchProps {
    mode: string
}

export default function Search({ mode }: SearchProps) {

  const dispatch = useAppDispatch();
  const { searchText } =  useAppSelector((state) => state.users);

  const handleSearch = (search: string) => {
    if (!search) {
      dispatch(setSearchText(''));
    }
    
    if (searchText === search) {
      return;
    }

    console.log(search, 'search')

    if (mode === 'new-chat') {
      dispatch(setSearchText(search));
    }

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
        backgroundColor='gray.200'
        _focus={{
          background: 'white'
        }}
        placeholder='Search'
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </InputGroup>
  )
}
