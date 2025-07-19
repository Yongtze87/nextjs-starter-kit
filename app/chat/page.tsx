'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Plus, MoreHorizontal, User, Copy, ThumbsUp, ThumbsDown, RotateCcw, Share, Bookmark, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import WelcomeScreen from '@/components/chat/welcome-screen'
import SettingsModal from '@/components/chat/settings-modal'
import MessageContent from '@/components/chat/message-content'
import MobileSidebar from '@/components/chat/mobile-sidebar'
import TypingIndicator from '@/components/chat/typing-indicator'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response with more realistic content
    setTimeout(() => {
      let responseContent = ""
      
      // Generate context-aware responses
      if (userMessage.content.toLowerCase().includes('code') || userMessage.content.toLowerCase().includes('function')) {
        responseContent = `I'd be happy to help you with coding! Here's a simple example:

\`\`\`javascript
function greetUser(name) {
  return \`Hello, \${name}! Welcome to Claude Chat.\`;
}

// Usage example
const message = greetUser("User");
console.log(message);
\`\`\`

This function demonstrates:
- **Template literals** for string interpolation
- **Arrow functions** (alternative syntax)
- Basic **console output**

What specific coding challenge are you working on? I can provide more targeted assistance.`
      } else if (userMessage.content.toLowerCase().includes('write') || userMessage.content.toLowerCase().includes('essay')) {
        responseContent = `I can definitely help with writing! Here are some key principles for effective writing:

**Structure your content:**
1. Start with a clear introduction
2. Develop your main points with supporting evidence
3. Conclude with a strong summary

**Writing tips:**
- Use *active voice* when possible
- Keep sentences **concise** and clear
- Vary your sentence length for better flow

What type of writing project are you working on? I can provide more specific guidance based on your needs.`
      } else if (userMessage.content.toLowerCase().includes('help') || userMessage.content.toLowerCase().includes('capabilities')) {
        responseContent = `I'm Claude, an AI assistant created by Anthropic. I can help you with a wide variety of tasks:

**My capabilities include:**
- 💻 **Coding & Development**: Writing, debugging, and explaining code
- ✍️ **Writing & Editing**: Essays, emails, creative content, and more
- 🔍 **Research & Analysis**: Breaking down complex topics
- 🧮 **Math & Problem Solving**: From basic arithmetic to advanced concepts
- 🎨 **Creative Tasks**: Brainstorming, storytelling, and ideation

**How I work:**
- I aim to be helpful, harmless, and honest
- I can engage in back-and-forth conversations
- I'll ask clarifying questions when needed

What would you like to explore together?`
      } else {
        responseContent = `Thank you for your message: "${userMessage.content}"

This is a **demo version** of Claude Chat that showcases the interface design. In a real implementation, this would connect to Anthropic's Claude API to provide:

- Intelligent, context-aware responses
- Code generation and debugging
- Creative writing assistance
- Complex reasoning and analysis
- Multi-turn conversations with memory

The interface includes features like:
- \`Syntax highlighting\` for code
- **Bold** and *italic* text formatting
- Mobile-responsive design
- Settings and preferences
- Conversation history

Is there anything specific you'd like to know about Claude's capabilities?`
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleStartChat = (prompt: string) => {
    setInput(prompt)
    // Auto-submit the prompt
    setTimeout(() => {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: prompt,
        timestamp: new Date()
      }

      setMessages([userMessage])
      setIsLoading(true)

      // Simulate AI response with better content
      setTimeout(() => {
        let responseContent = ""
        
        // Generate context-aware responses for welcome screen prompts
        if (prompt.includes('function')) {
          responseContent = `I'd be happy to help you write a function! Here's a template to get you started:

\`\`\`python
def your_function_name(parameter1, parameter2):
    """
    Description of what your function does.
    
    Args:
        parameter1: Description of first parameter
        parameter2: Description of second parameter
    
    Returns:
        Description of return value
    """
    # Your code here
    result = parameter1 + parameter2  # Example operation
    return result

# Example usage
output = your_function_name(5, 3)
print(output)  # Output: 8
\`\`\`

What specific functionality would you like your function to have? I can help you implement:
- **Data processing** functions
- **Mathematical calculations**
- **String manipulations**
- **API interactions**
- And much more!`
        } else if (prompt.includes('summarize')) {
          responseContent = `I'm ready to help you summarize text! I can create concise, accurate summaries of:

**Document types I can summarize:**
- 📄 **Articles & Reports**: Extract key findings and conclusions
- 📚 **Research Papers**: Highlight methodology and results  
- 📰 **News Articles**: Identify main events and implications
- 📖 **Books & Chapters**: Capture central themes and arguments
- 💼 **Business Documents**: Focus on actionable insights

**My summarization approach:**
1. **Identify** the main topic and purpose
2. **Extract** key points and supporting evidence
3. **Organize** information logically
4. **Present** in clear, concise language

Please paste the text you'd like me to summarize, and let me know:
- Desired length (brief, moderate, detailed)
- Specific focus areas (if any)
- Target audience`
        } else if (prompt.includes('brainstorm')) {
          responseContent = `Let's brainstorm together! I love helping generate creative ideas. Here's how we can approach it:

**Brainstorming techniques I can use:**
- 🧠 **Mind mapping**: Exploring connected concepts
- 🎯 **SCAMPER method**: Substitute, Combine, Adapt, Modify, etc.
- 🔄 **Reverse thinking**: Starting from the end goal
- 🎲 **Random word association**: Sparking unexpected connections
- 📊 **Pros and cons analysis**: Evaluating different approaches

**What would you like to brainstorm?**
- Business ideas or strategies
- Creative projects or content
- Problem-solving approaches
- Product features or improvements
- Event planning or activities

Share your topic or challenge, and I'll help generate a variety of innovative ideas! The more context you provide, the more targeted and useful the suggestions will be.`
        } else if (prompt.includes('learn about')) {
          responseContent = `I'm excited to help you learn! I can provide comprehensive information on virtually any topic. Here's how I approach learning support:

**My teaching style:**
- 🎯 **Start with fundamentals** and build complexity gradually
- 🔍 **Use examples** and real-world applications
- 🧩 **Break down complex concepts** into digestible parts
- 📚 **Provide multiple perspectives** on topics
- ✅ **Check understanding** with questions and exercises

**Popular learning topics:**
- **Science & Technology**: Physics, chemistry, computer science, AI
- **History & Culture**: World events, civilizations, arts
- **Business & Economics**: Markets, strategy, entrepreneurship
- **Languages**: Grammar, vocabulary, conversation practice
- **Skills**: Writing, critical thinking, problem-solving

What subject interests you? I can:
- Explain concepts clearly
- Provide structured learning paths
- Suggest practice exercises
- Recommend additional resources
- Answer follow-up questions`
        } else {
          responseContent = `Great! I'm here to help with whatever you need. This demo showcases a complete Claude Chat interface with:

**Core Features:**
- 💬 **Natural conversations** with context awareness
- 🎨 **Rich text formatting** (bold, italic, code blocks)
- 📱 **Mobile-responsive design** that works on all devices
- ⚙️ **Settings & preferences** for customization
- 📝 **Conversation history** and management
- 🔄 **Real-time typing indicators**

**Interface Highlights:**
- Clean, modern design inspired by Claude's actual interface
- Syntax highlighting for code blocks
- Copy functionality for code snippets
- Intuitive navigation and controls
- Professional color scheme and typography

Try asking me about:
- Writing code or debugging
- Creative writing projects  
- Research and analysis
- Math problems
- General questions

What would you like to explore?`
        }

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responseContent,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
        setIsLoading(false)
      }, 1500)
    }, 100)
  }

  const handleNewChat = () => {
    setMessages([])
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-white">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex w-64 border-r border-gray-200 flex-col">
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
                  <DropdownMenuItem onClick={() => setShowSettings(true)}>
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

        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MobileSidebar onNewChat={handleNewChat} onOpenSettings={() => setShowSettings(true)} />
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">Claude</h1>
                  <p className="text-sm text-gray-500 hidden sm:block">by Anthropic</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share conversation</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Bookmark</TooltipContent>
                </Tooltip>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Export conversation</DropdownMenuItem>
                    <DropdownMenuItem>Clear conversation</DropdownMenuItem>
                    <DropdownMenuItem>Report issue</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1">
            {messages.length === 0 ? (
              <WelcomeScreen onStartChat={handleStartChat} />
            ) : (
              <div className="max-w-3xl mx-auto p-2 sm:p-4 space-y-6">
                {messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-8 w-8 mt-1">
                      {message.role === 'assistant' ? (
                        <AvatarFallback className="bg-orange-500 text-white">
                          C
                        </AvatarFallback>
                      ) : (
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {message.role === 'assistant' ? 'Claude' : 'You'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <MessageContent content={message.content} role={message.role} />
                      {message.role === 'assistant' && (
                        <div className="flex items-center gap-1 pt-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Copy className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Good response</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Poor response</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <RotateCcw className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Regenerate</TooltipContent>
                          </Tooltip>
                        </div>
                      )}
                    </div>
                  </div>
                  {message !== messages[messages.length - 1] && (
                    <Separator className="my-6" />
                  )}
                </div>
              ))}
              
                            {isLoading && <TypingIndicator />}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          {/* Input area */}
          <div className="border-t border-gray-200 p-2 sm:p-4">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="relative">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message Claude..."
                  className="min-h-[60px] max-h-[200px] pr-12 resize-none border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 bottom-2 bg-orange-500 hover:bg-orange-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Claude can make mistakes. Please verify important information.
              </p>
            </div>
          </div>
        </div>

        <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      </div>
    </TooltipProvider>
  )
}