"use client"

import React, { useState } from 'react'
import DonationModal from './DonationModal'

interface ChatMessage {
  id: number;
  user: string;
  message: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), user: 'User', message: newMessage }])
      setNewMessage('')
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="h-96 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <span className="font-bold">{msg.user}: </span>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow mr-2 p-2 border rounded"
            placeholder="Type a message..."
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </div>
        <button
          type="button"
          onClick={() => setIsDonationModalOpen(true)}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Donate
        </button>
      </form>
      {isDonationModalOpen && (
        <DonationModal onClose={() => setIsDonationModalOpen(false)} />
      )}
    </div>
  )
}

export default ChatBox