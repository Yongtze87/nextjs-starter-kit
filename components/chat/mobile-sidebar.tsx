'use client'

import { useState } from 'react'
import { X, Plus, MoreHorizontal, User, Settings, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface MobileSidebarProps {
  onNewChat: () => void
  onOpenSettings: () => void
}

export default function MobileSidebar({ onNewChat, onOpenSettings }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleNewChat = () => {
    onNewChat()
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Claude</SheetTitle>
          </SheetHeader>
          
          <div className="p-4">
            <Button 
              className="w-full justify-start gap-2 bg-orange-500 hover:bg-orange-600"
              onClick={handleNewChat}
            >
              <Plus className="h-4 w-4" />
              New chat
            </Button>
          </div>
          
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1">
              {/* Recent chats */}
              <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Today
              </div>
              <div className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md cursor-pointer">
                Current conversation
              </div>
              <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider mt-4">
                Yesterday
              </div>
              <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
                Help with coding project
              </div>
              <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
                Writing assistance
              </div>
              <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
                Research questions
              </div>
              <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider mt-4">
                Previous 7 days
              </div>
              <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
                Data analysis help
              </div>
              <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
                Creative writing
              </div>
              <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">
                Technical documentation
              </div>
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">User</p>
                <p className="text-xs text-gray-500">Free plan</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => { onOpenSettings(); setIsOpen(false) }}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>Help</DropdownMenuItem>
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}