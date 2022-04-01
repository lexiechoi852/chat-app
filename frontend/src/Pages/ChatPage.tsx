import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Chat {
  iGroupChat: boolean,
    users: {
      name: string,
      email: string
    },
    _id: string,
    chatName: string,
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);

  const fetchChats = async () => {
    const { data } = await axios.get('/api/chats');
    setChats(data);
  }

  useEffect(() => {
    fetchChats();
  }, [])
  

  return (
    <div>
      <div>ChatPage</div>
      {chats && chats.map(chat => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  )
}
