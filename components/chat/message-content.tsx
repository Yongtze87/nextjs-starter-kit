'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface MessageContentProps {
  content: string
  role: 'user' | 'assistant'
}

export default function MessageContent({ content, role }: MessageContentProps) {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({})

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates(prev => ({ ...prev, [id]: true }))
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [id]: false }))
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Simple markdown-like parsing
  const parseContent = (text: string) => {
    const parts = []
    let currentIndex = 0

    // Find code blocks (```language\ncode\n```)
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    let match

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > currentIndex) {
        const beforeText = text.slice(currentIndex, match.index)
        parts.push(
          <span key={`text-${currentIndex}`}>
            {formatInlineElements(beforeText)}
          </span>
        )
      }

      const language = match[1] || 'text'
      const code = match[2]
      const blockId = `code-${match.index}`

      parts.push(
        <div key={blockId} className="my-4">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-200 border-b">
              <span className="text-xs font-medium text-gray-600 uppercase">
                {language}
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => copyToClipboard(code, blockId)}
                  >
                    {copiedStates[blockId] ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {copiedStates[blockId] ? 'Copied!' : 'Copy code'}
                </TooltipContent>
              </Tooltip>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono text-gray-800">
                {code}
              </code>
            </pre>
          </div>
        </div>
      )

      currentIndex = match.index + match[0].length
    }

    // Add remaining text
    if (currentIndex < text.length) {
      const remainingText = text.slice(currentIndex)
      parts.push(
        <span key={`text-${currentIndex}`}>
          {formatInlineElements(remainingText)}
        </span>
      )
    }

    return parts.length > 0 ? parts : [formatInlineElements(text)]
  }

  const formatInlineElements = (text: string) => {
    // Handle inline code (`code`)
    const inlineCodeRegex = /`([^`]+)`/g
    const parts = []
    let lastIndex = 0

    text.replace(inlineCodeRegex, (match, code, index) => {
      // Add text before inline code
      if (index > lastIndex) {
        const beforeText = text.slice(lastIndex, index)
        parts.push(formatTextElements(beforeText))
      }

      // Add inline code
      parts.push(
        <code
          key={`inline-code-${index}`}
          className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono"
        >
          {code}
        </code>
      )

      lastIndex = index + match.length
      return match
    })

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(formatTextElements(text.slice(lastIndex)))
    }

    return parts.length > 0 ? parts : formatTextElements(text)
  }

  const formatTextElements = (text: string) => {
    // Handle bold (**text**)
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    
    // Handle italic (*text*)
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // Handle line breaks
    formattedText = formattedText.replace(/\n/g, '<br />')

    return <span dangerouslySetInnerHTML={{ __html: formattedText }} />
  }

  return (
    <div className={`prose prose-sm max-w-none ${role === 'user' ? 'text-gray-900' : 'text-gray-900'}`}>
      <div className="leading-relaxed whitespace-pre-wrap">
        {parseContent(content)}
      </div>
    </div>
  )
}