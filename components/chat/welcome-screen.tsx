'use client'

import { MessageSquare, FileText, Code, Lightbulb, Search, PenTool } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface WelcomeScreenProps {
  onStartChat: (prompt: string) => void
}

export default function WelcomeScreen({ onStartChat }: WelcomeScreenProps) {
  const suggestions = [
    {
      icon: <Code className="h-5 w-5" />,
      title: "Help me code",
      description: "Write, debug, or explain code in any language",
      prompt: "Help me write a function that..."
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Summarize text",
      description: "Get concise summaries of articles, documents, or content",
      prompt: "Please summarize this text for me:"
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Brainstorm ideas",
      description: "Generate creative solutions and innovative concepts",
      prompt: "Help me brainstorm ideas for..."
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: "Research topics",
      description: "Get comprehensive information on any subject",
      prompt: "I'd like to learn about..."
    },
    {
      icon: <PenTool className="h-5 w-5" />,
      title: "Write content",
      description: "Create essays, emails, stories, and more",
      prompt: "Help me write..."
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Have a conversation",
      description: "Chat about anything that interests you",
      prompt: "Let's talk about..."
    }
  ]

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 text-white rounded-full mb-6">
            <span className="text-2xl font-bold">C</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Hello! I&apos;m Claude.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            I&apos;m an AI assistant created by Anthropic. I&apos;m here to help with analysis, math, coding, creative writing, and much more. How can I assist you today?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map((suggestion, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-md transition-shadow duration-200 border-gray-200 hover:border-orange-300"
              onClick={() => onStartChat(suggestion.prompt)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-orange-500">
                    {suggestion.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {suggestion.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {suggestion.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">
            You can also ask me anything by typing in the message box below
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onStartChat("What are your capabilities?")}
            >
              What can you do?
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onStartChat("How do you work?")}
            >
              How do you work?
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onStartChat("Tell me about yourself")}
            >
              Tell me about yourself
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}