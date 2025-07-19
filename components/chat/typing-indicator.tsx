'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-4">
      <Avatar className="h-8 w-8 mt-1">
        <AvatarFallback className="bg-orange-500 text-white">
          C
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">Claude</span>
          <span className="text-xs text-gray-500">is thinking...</span>
        </div>
        <div className="flex items-center gap-1">
          <div 
            className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
            style={{ animationDelay: '0ms', animationDuration: '1.4s' }}
          ></div>
          <div 
            className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
            style={{ animationDelay: '160ms', animationDuration: '1.4s' }}
          ></div>
          <div 
            className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
            style={{ animationDelay: '320ms', animationDuration: '1.4s' }}
          ></div>
        </div>
      </div>
    </div>
  )
}