'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  MessageSquare, 
  Plus, 
  FolderPlus,
  Settings, 
  User, 
  Send, 
  Mic,
  Paperclip,
  MoreHorizontal,
  Copy,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Save,
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  Image,
  Code,
  FileText,
  Trash2,
  Eye,
  Download,
  Menu,
  X,
  Search,
  Archive,
  Bookmark
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  model?: 'gemini' | 'claude' | 'dalle'
  artifacts?: Artifact[]
}

interface Artifact {
  id: string
  type: 'code' | 'document' | 'image' | 'data'
  name: string
  content: string
  language?: string
  preview?: string
}

interface ProjectFile {
  id: string
  name: string
  type: 'file' | 'folder'
  content?: string
  language?: string
  children?: ProjectFile[]
  size?: number
  modified?: Date
}

interface Project {
  id: string
  name: string
  description?: string
  files: ProjectFile[]
  chats: string[]
  created: Date
  modified: Date
}

interface Chat {
  id: string
  name: string
  projectId?: string
  messages: Message[]
  created: Date
  modified: Date
}

export default function EnvinageAI() {
  // State Management
  const [activeView, setActiveView] = useState<'chats' | 'projects' | 'artifacts'>('chats')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState<'gemini' | 'claude' | 'dalle'>('gemini')
  const [responseMode, setResponseMode] = useState<'concise' | 'normal' | 'detailed'>('normal')
  const [thinkingMode, setThinkingMode] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [previewContent, setPreviewContent] = useState<Artifact | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  // Project Management
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Web Portfolio',
      description: 'Personal portfolio website',
      files: [
        {
          id: '1',
          name: 'src',
          type: 'folder',
          children: [
            {
              id: '2',
              name: 'components',
              type: 'folder',
              children: [
                {
                  id: '3',
                  name: 'ui',
                  type: 'folder',
                  children: [
                    {
                      id: '4',
                      name: 'Button.jsx',
                      type: 'file',
                      language: 'javascript',
                      content: 'import React from "react";\n\nexport default function Button({ children, variant = "primary", ...props }) {\n  const baseClasses = "px-4 py-2 rounded font-medium";\n  const variants = {\n    primary: "bg-blue-600 text-white hover:bg-blue-700",\n    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300"\n  };\n  \n  return (\n    <button className={`${baseClasses} ${variants[variant]}`} {...props}>\n      {children}\n    </button>\n  );\n}',
                      size: 445,
                      modified: new Date()
                    },
                    {
                      id: '5',
                      name: 'Card.jsx',
                      type: 'file',
                      language: 'javascript',
                      content: 'import React from "react";\n\nexport default function Card({ children, className = "" }) {\n  return (\n    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>\n      {children}\n    </div>\n  );\n}',
                      size: 215,
                      modified: new Date()
                    }
                  ]
                },
                {
                  id: '6',
                  name: 'Header.jsx',
                  type: 'file',
                  language: 'javascript',
                  content: 'import React from "react";\nimport Button from "./ui/Button";\n\nexport default function Header() {\n  return (\n    <header className="bg-blue-600 text-white p-4">\n      <div className="container mx-auto flex justify-between items-center">\n        <h1 className="text-2xl font-bold">My Portfolio</h1>\n        <Button variant="secondary">Contact</Button>\n      </div>\n    </header>\n  );\n}',
                  size: 345,
                  modified: new Date()
                },
                {
                  id: '7',
                  name: 'Footer.jsx',
                  type: 'file',
                  language: 'javascript',
                  content: 'import React from "react";\n\nexport default function Footer() {\n  return (\n    <footer className="bg-gray-800 text-white p-4 mt-auto">\n      <div className="container mx-auto text-center">\n        <p>&copy; 2024 My Portfolio. All rights reserved.</p>\n      </div>\n    </footer>\n  );\n}',
                  size: 285,
                  modified: new Date()
                }
              ]
            },
            {
              id: '8',
              name: 'pages',
              type: 'folder',
              children: [
                {
                  id: '9',
                  name: 'Home.jsx',
                  type: 'file',
                  language: 'javascript',
                  content: 'import React from "react";\nimport Header from "../components/Header";\nimport Card from "../components/ui/Card";\n\nexport default function Home() {\n  return (\n    <div className="min-h-screen">\n      <Header />\n      <main className="container mx-auto py-8">\n        <h2 className="text-3xl font-bold mb-6">Welcome to My Portfolio</h2>\n        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">\n          <Card>\n            <h3 className="text-xl font-semibold mb-2">About Me</h3>\n            <p>Full-stack developer with passion for creating amazing web experiences.</p>\n          </Card>\n          <Card>\n            <h3 className="text-xl font-semibold mb-2">Projects</h3>\n            <p>Check out my latest work and side projects.</p>\n          </Card>\n          <Card>\n            <h3 className="text-xl font-semibold mb-2">Skills</h3>\n            <p>React, Node.js, TypeScript, and more.</p>\n          </Card>\n        </div>\n      </main>\n    </div>\n  );\n}',
                  size: 845,
                  modified: new Date()
                },
                {
                  id: '10',
                  name: 'About.jsx',
                  type: 'file',
                  language: 'javascript',
                  content: 'import React from "react";\nimport Header from "../components/Header";\n\nexport default function About() {\n  return (\n    <div className="min-h-screen">\n      <Header />\n      <main className="container mx-auto py-8">\n        <h2 className="text-3xl font-bold mb-6">About Me</h2>\n        <p className="text-lg leading-relaxed">I am a passionate full-stack developer...</p>\n      </main>\n    </div>\n  );\n}',
                  size: 425,
                  modified: new Date()
                }
              ]
            },
            {
              id: '11',
              name: 'styles',
              type: 'folder',
              children: [
                {
                  id: '12',
                  name: 'globals.css',
                  type: 'file',
                  language: 'css',
                  content: '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n}\n\n.container {\n  max-width: 1200px;\n}',
                  size: 185,
                  modified: new Date()
                }
              ]
            },
            {
              id: '13',
              name: 'App.jsx',
              type: 'file',
              language: 'javascript',
              content: 'import React from "react";\nimport { BrowserRouter as Router, Routes, Route } from "react-router-dom";\nimport Home from "./pages/Home";\nimport About from "./pages/About";\nimport "./styles/globals.css";\n\nfunction App() {\n  return (\n    <Router>\n      <Routes>\n        <Route path="/" element={<Home />} />\n        <Route path="/about" element={<About />} />\n      </Routes>\n    </Router>\n  );\n}\n\nexport default App;',
              size: 445,
              modified: new Date()
            }
          ]
        },
        {
          id: '14',
          name: 'public',
          type: 'folder',
          children: [
            {
              id: '15',
              name: 'index.html',
              type: 'file',
              language: 'html',
              content: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Portfolio</title>\n</head>\n<body>\n  <div id="root"></div>\n</body>\n</html>',
              size: 245,
              modified: new Date()
            }
          ]
        },
        {
          id: '16',
          name: 'package.json',
          type: 'file',
          language: 'json',
          content: '{\n  "name": "web-portfolio",\n  "version": "1.0.0",\n  "private": true,\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0",\n    "react-router-dom": "^6.8.0"\n  },\n  "scripts": {\n    "start": "react-scripts start",\n    "build": "react-scripts build",\n    "test": "react-scripts test"\n  }\n}',
          size: 345,
          modified: new Date()
        },
        {
          id: '17',
          name: 'README.md',
          type: 'file',
          language: 'markdown',
          content: '# My Portfolio\n\nA modern React portfolio website showcasing my work and skills.\n\n## Features\n- Responsive design\n- Modern UI components\n- Fast performance\n- Clean architecture\n\n## Getting Started\n\n```bash\nnpm install\nnpm start\n```\n\n## Project Structure\n\n- `/src/components` - Reusable UI components\n- `/src/pages` - Page components\n- `/src/styles` - Global styles\n- `/public` - Static assets',
          size: 456,
          modified: new Date()
        }
      ],
      chats: ['1'],
      created: new Date(),
      modified: new Date()
    },
    {
      id: '2',
      name: 'E-commerce API',
      description: 'RESTful API for online store',
      files: [
        {
          id: '18',
          name: 'src',
          type: 'folder',
          children: [
            {
              id: '19',
              name: 'controllers',
              type: 'folder',
              children: [
                {
                  id: '20',
                  name: 'productController.js',
                  type: 'file',
                  language: 'javascript',
                  content: 'const Product = require("../models/Product");\n\nexports.getAllProducts = async (req, res) => {\n  try {\n    const products = await Product.find();\n    res.json(products);\n  } catch (error) {\n    res.status(500).json({ message: error.message });\n  }\n};\n\nexports.createProduct = async (req, res) => {\n  try {\n    const product = new Product(req.body);\n    await product.save();\n    res.status(201).json(product);\n  } catch (error) {\n    res.status(400).json({ message: error.message });\n  }\n};',
                  size: 485,
                  modified: new Date()
                }
              ]
            },
            {
              id: '21',
              name: 'models',
              type: 'folder',
              children: [
                {
                  id: '22',
                  name: 'Product.js',
                  type: 'file',
                  language: 'javascript',
                  content: 'const mongoose = require("mongoose");\n\nconst productSchema = new mongoose.Schema({\n  name: {\n    type: String,\n    required: true\n  },\n  price: {\n    type: Number,\n    required: true\n  },\n  description: String,\n  category: String,\n  inStock: {\n    type: Boolean,\n    default: true\n  }\n}, {\n  timestamps: true\n});\n\nmodule.exports = mongoose.model("Product", productSchema);',
                  size: 385,
                  modified: new Date()
                }
              ]
            }
          ]
        },
        {
          id: '23',
          name: 'README.md',
          type: 'file',
          language: 'markdown',
          content: '# E-commerce API\n\nRESTful API for managing products, orders, and users.\n\n## Endpoints\n\n### Products\n- GET /api/products\n- POST /api/products\n- PUT /api/products/:id\n- DELETE /api/products/:id\n\n## Setup\n\n```bash\nnpm install\nnpm start\n```',
          size: 285,
          modified: new Date()
        }
      ],
      chats: ['2'],
      created: new Date(),
      modified: new Date()
    }
  ])
  
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Portfolio Development',
      projectId: '1',
      messages: [],
      created: new Date(),
      modified: new Date()
    },
    {
      id: '2',
      name: 'API Design Discussion',
      projectId: '2',
      messages: [],
      created: new Date(Date.now() - 86400000),
      modified: new Date(Date.now() - 86400000)
    },
    {
      id: '3',
      name: 'React Component Help',
      projectId: '1',
      messages: [],
      created: new Date(Date.now() - 172800000),
      modified: new Date(Date.now() - 172800000)
    },
    {
      id: '4',
      name: 'Database Schema Design',
      messages: [],
      created: new Date(Date.now() - 259200000),
      modified: new Date(Date.now() - 259200000)
    },
    {
      id: '5',
      name: 'CSS Styling Questions',
      messages: [],
      created: new Date(Date.now() - 432000000),
      modified: new Date(Date.now() - 432000000)
    }
  ])
  
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [currentChat, setCurrentChat] = useState<Chat | null>(chats[0])
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['1', '2', '18', '19', '21']))
  
  // Artifacts Management
  const [artifacts] = useState<Artifact[]>([
    {
      id: 'art1',
      type: 'code',
      name: 'LoginForm.jsx',
      content: 'import React, { useState } from "react";\n\nexport default function LoginForm() {\n  const [email, setEmail] = useState("");\n  const [password, setPassword] = useState("");\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log("Login:", { email, password });\n  };\n\n  return (\n    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">\n      <h2 className="text-2xl font-bold mb-4">Login</h2>\n      <div className="mb-4">\n        <label className="block text-sm font-medium mb-2">Email</label>\n        <input\n          type="email"\n          value={email}\n          onChange={(e) => setEmail(e.target.value)}\n          className="w-full p-2 border rounded-md"\n          required\n        />\n      </div>\n      <div className="mb-4">\n        <label className="block text-sm font-medium mb-2">Password</label>\n        <input\n          type="password"\n          value={password}\n          onChange={(e) => setPassword(e.target.value)}\n          className="w-full p-2 border rounded-md"\n          required\n        />\n      </div>\n      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">\n        Login\n      </button>\n    </form>\n  );\n}',
      language: 'javascript',
      preview: 'A complete login form component with email and password fields'
    },
    {
      id: 'art2',
      type: 'document',
      name: 'API_Documentation.md',
      content: '# API Documentation\n\n## Authentication Endpoints\n\n### POST /api/auth/login\nAuthenticates a user and returns a JWT token.\n\n**Request Body:**\n```json\n{\n  "email": "user@example.com",\n  "password": "password123"\n}\n```\n\n**Response:**\n```json\n{\n  "token": "jwt_token_here",\n  "user": {\n    "id": 1,\n    "email": "user@example.com",\n    "name": "John Doe"\n  }\n}\n```\n\n### POST /api/auth/register\nRegisters a new user account.\n\n**Request Body:**\n```json\n{\n  "name": "John Doe",\n  "email": "user@example.com",\n  "password": "password123"\n}\n```\n\n## Product Endpoints\n\n### GET /api/products\nRetrieve all products with pagination.\n\n**Query Parameters:**\n- `page` (optional): Page number (default: 1)\n- `limit` (optional): Items per page (default: 10)\n- `category` (optional): Filter by category\n\n**Response:**\n```json\n{\n  "products": [...],\n  "totalCount": 150,\n  "currentPage": 1,\n  "totalPages": 15\n}\n```',
      language: 'markdown',
      preview: 'Complete API documentation with authentication and product endpoints'
    },
    {
      id: 'art3',
      type: 'image',
      name: 'hero-banner.svg',
      content: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMzMzM2ZmO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3R5bGU9InN0b3AtY29sb3I6IzY2NjZmZjtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMzMzM2ZmO3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+CiAgPGNpcmNsZSBjeD0iNjAwIiBjeT0iMTAwIiByPSI1MCIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIi8+CiAgPGNpcmNsZSBjeD0iNzAwIiBjeT0iMzAwIiByPSI4MCIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPgogIDx0ZXh0IHg9IjQwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+V2VsY29tZTwvdGV4dD4KICA8dGV4dCB4PSI0MDAiIHk9IjI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VG8gT3VyIEFtYXppbmcgUGxhdGZvcm08L3RleHQ+Cjwvc3ZnPgo=',
      preview: 'Modern hero banner with blue gradient and welcome text'
    }
  ])
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Helper functions
  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: `New Chat ${chats.length + 1}`,
      projectId: currentProject?.id,
      messages: [],
      created: new Date(),
      modified: new Date()
    }
    setChats(prev => [newChat, ...prev])
    setCurrentChat(newChat)
    setMessages([])
  }

  const createNewProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: `Project ${projects.length + 1}`,
      description: 'New project description',
      files: [],
      chats: [],
      created: new Date(),
      modified: new Date()
    }
    setProjects(prev => [newProject, ...prev])
  }

  // Commented out unused functions to avoid linting errors
  // const deleteChat = (chatId: string) => {
  //   setChats(prev => prev.filter(chat => chat.id !== chatId))
  //   if (currentChat?.id === chatId) {
  //     setCurrentChat(chats.find(chat => chat.id !== chatId) || null)
  //     setMessages([])
  //   }
  // }

  // const deleteProject = (projectId: string) => {
  //   setProjects(prev => prev.filter(project => project.id !== projectId))
  //   if (currentProject?.id === projectId) {
  //     setCurrentProject(null)
  //   }
  // }

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Handle message submission
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

    // Simulate AI response based on selected model
    setTimeout(() => {
      const response = generateAIResponse(userMessage.content, selectedModel)
      setMessages(prev => [...prev, response])
      setIsLoading(false)
      
      // Auto-open preview if artifacts are generated
      if (response.artifacts && response.artifacts.length > 0) {
        setPreviewContent(response.artifacts[0])
        setShowPreview(true)
      }
    }, 2000)
  }

  const generateAIResponse = (userInput: string, model: string): Message => {
    const isCodeRequest = /code|function|component|javascript|react|html|css/i.test(userInput)
    const isImageRequest = /image|picture|generate.*visual|create.*graphic/i.test(userInput)
    
    let content = ''
    let artifacts: Artifact[] = []
    let actualModel: 'gemini' | 'claude' | 'dalle' = model as any

    if (isImageRequest) {
      actualModel = 'dalle'
      content = "I've generated an image based on your request. Here's what I created:"
      artifacts = [{
        id: Date.now().toString(),
        type: 'image',
        name: 'generated-image.png',
        content: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZjk3MzE2O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlYTU4MGM7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNncmFkaWVudCkiLz4KICA8dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+R2VuZXJhdGVkIEltYWdlPC90ZXh0Pgo8L3N2Zz4K',
        preview: 'A beautiful gradient image with orange tones'
      }]
    } else if (isCodeRequest) {
      actualModel = 'claude'
      content = "I'll help you create that component. Here's a React component that should work well for your needs:"
      artifacts = [{
        id: Date.now().toString(),
        type: 'code',
        name: 'Button.jsx',
        language: 'javascript',
        content: `import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  disabled = false,
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  const classes = \`\${baseClasses} \${variants[variant]} \${sizes[size]} \${disabled ? 'opacity-50 cursor-not-allowed' : ''}\`;
  
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

// Example usage:
// <Button variant="primary" size="md" onClick={() => alert('Clicked!')}>
//   Click me
// </Button>`,
        preview: 'A reusable React button component with multiple variants and sizes'
      }]
    } else {
      content = `Based on your request: "${userInput}"

I understand you're looking for assistance with this topic. Here's a comprehensive response:

**Key Points:**
- This is a demonstration of the Envinage AI interface
- The system intelligently routes requests to appropriate AI models
- **Gemini** handles general queries and analysis
- **Claude** specializes in code generation and technical tasks  
- **DALL-E** creates images and visual content

**Features Available:**
- **Project Management**: Organize your work in structured folders
- **Live Previews**: See your generated content instantly
- **Context Persistence**: Conversations remember previous context
- **Artifact Management**: Save and organize generated content
- **Multi-Model Integration**: Seamless switching between AI models

This demo showcases the complete interface design and user experience patterns described in the PRD. In a real implementation, this would connect to actual AI APIs to provide intelligent, context-aware responses.

Would you like me to help you with something specific? Try asking me to generate code, create an image, or help with project planning!`
    }

    return {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content,
      timestamp: new Date(),
      model: actualModel,
      artifacts
    }
  }

  // File tree rendering
  const renderFileTree = (files: ProjectFile[], level = 0) => {
    return files.map(file => (
      <div key={file.id} style={{ marginLeft: `${level * 16}px` }}>
        <div className="flex items-center gap-2 py-1 px-2 hover:bg-gray-100 rounded cursor-pointer group">
          {file.type === 'folder' ? (
            <>
              <button
                onClick={() => {
                  const newExpanded = new Set(expandedFolders)
                  if (expandedFolders.has(file.id)) {
                    newExpanded.delete(file.id)
                  } else {
                    newExpanded.add(file.id)
                  }
                  setExpandedFolders(newExpanded)
                }}
              >
                {expandedFolders.has(file.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              <Folder className="h-4 w-4 text-blue-600" />
              <span className="text-sm">{file.name}</span>
            </>
          ) : (
            <>
              <div className="w-4" />
                             {file.language === 'javascript' ? (
                 <Code className="h-4 w-4 text-yellow-600" />
               ) : file.language === 'typescript' ? (
                 <Code className="h-4 w-4 text-blue-600" />
               ) : file.language === 'markdown' ? (
                 <FileText className="h-4 w-4 text-green-600" />
               ) : file.language === 'css' ? (
                 <File className="h-4 w-4 text-blue-500" />
               ) : file.language === 'html' ? (
                 <File className="h-4 w-4 text-orange-500" />
               ) : file.language === 'json' ? (
                 <File className="h-4 w-4 text-yellow-500" />
               ) : (
                 <File className="h-4 w-4 text-gray-600" />
               )}
              <span className="text-sm">{file.name}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 ml-auto"
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setPreviewContent({
                        type: file.language === 'javascript' ? 'code' : 'document',
                        name: file.name,
                        content: file.content,
                        language: file.language
                      })
                      setShowPreview(true)
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
        {file.type === 'folder' && expandedFolders.has(file.id) && file.children && (
          <div>
            {renderFileTree(file.children, level + 1)}
          </div>
        )}
      </div>
    ))
  }

  // Preview rendering
  const renderPreview = () => {
    if (!previewContent) return null

    switch (previewContent.type) {
      case 'code':
        if (previewContent.language === 'javascript' && previewContent.content.includes('export default')) {
          // Render React component
          return (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium mb-2">Live Preview</h3>
                <div className="bg-white p-4 rounded border">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Sample Button
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Code</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{previewContent.content}</code>
                </pre>
              </div>
            </div>
          )
        } else {
          return (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              <code>{previewContent.content}</code>
            </pre>
          )
        }
      case 'document':
        return (
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap">{previewContent.content}</pre>
          </div>
        )
      case 'image':
                 return (
           <div className="text-center">
             <img
               src={previewContent.content}
               alt={previewContent.preview || previewContent.name}
               className="max-w-full h-auto rounded-lg shadow-lg"
             />
             <p className="text-sm text-gray-600 mt-2">{previewContent.preview}</p>
           </div>
         )
      default:
        return <div>Preview not available</div>
    }
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-50">
        {/* Left Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-16'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col`}>
          {/* Navigation Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                {sidebarOpen && <span className="font-semibold text-lg">Envinage AI</span>}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="h-8 w-8 p-0"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
            
            {sidebarOpen && (
              <>
                                 <Button 
                   className="w-full mb-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                   onClick={createNewChat}
                 >
                   <Plus className="h-4 w-4 mr-2" />
                   New Chat
                 </Button>
                
                <div className="flex gap-1">
                  <Button
                    variant={activeView === 'chats' ? 'default' : 'ghost'}
                    size="sm"
                    className="flex-1"
                    onClick={() => setActiveView('chats')}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Chats
                  </Button>
                  <Button
                    variant={activeView === 'projects' ? 'default' : 'ghost'}
                    size="sm"
                    className="flex-1"
                    onClick={() => setActiveView('projects')}
                  >
                    <Folder className="h-4 w-4 mr-1" />
                    Projects
                  </Button>
                  <Button
                    variant={activeView === 'artifacts' ? 'default' : 'ghost'}
                    size="sm"
                    className="flex-1"
                    onClick={() => setActiveView('artifacts')}
                  >
                    <Archive className="h-4 w-4 mr-1" />
                    Artifacts
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Dynamic Content */}
          <ScrollArea className="flex-1">
            {sidebarOpen && (
              <div className="p-4">
                {activeView === 'chats' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm text-gray-700">Recent Chats</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={createNewChat}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    {chats.map(chat => (
                      <div
                        key={chat.id}
                                                 className={`p-3 rounded-lg cursor-pointer transition-colors ${
                           currentChat?.id === chat.id ? 'bg-blue-100 border border-blue-200' : 'hover:bg-gray-100'
                         }`}
                        onClick={() => setCurrentChat(chat)}
                      >
                        <div className="font-medium text-sm">{chat.name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {chat.projectId && (
                            <Badge variant="secondary" className="mr-1">
                              {projects.find(p => p.id === chat.projectId)?.name}
                            </Badge>
                          )}
                          {chat.modified.toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeView === 'projects' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm text-gray-700">Projects</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={createNewProject}
                      >
                        <FolderPlus className="h-3 w-3" />
                      </Button>
                    </div>
                    {currentProject ? (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCurrentProject(null)}
                            className="h-6 px-2"
                          >
                            ← Back
                          </Button>
                          <span className="font-medium text-sm">{currentProject.name}</span>
                        </div>
                        {renderFileTree(currentProject.files)}
                      </div>
                    ) : (
                      projects.map(project => (
                        <div
                          key={project.id}
                          className="p-3 rounded-lg cursor-pointer hover:bg-gray-100 border border-gray-200"
                          onClick={() => setCurrentProject(project)}
                        >
                          <div className="font-medium text-sm">{project.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{project.description}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {project.files.length} files • {project.modified.toLocaleDateString()}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeView === 'artifacts' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm text-gray-700">Recent Artifacts</h3>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Search className="h-3 w-3" />
                      </Button>
                    </div>
                    {artifacts.map(artifact => (
                      <div
                        key={artifact.id}
                        className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer border border-gray-200"
                        onClick={() => {
                          setPreviewContent(artifact)
                          setShowPreview(true)
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {artifact.type === 'code' ? (
                            <Code className="h-4 w-4 text-blue-600" />
                          ) : artifact.type === 'image' ? (
                            <Image className="h-4 w-4 text-green-600" />
                          ) : (
                            <FileText className="h-4 w-4 text-purple-600" />
                          )}
                          <span className="font-medium text-sm">{artifact.name}</span>
                        </div>
                        <p className="text-xs text-gray-600">{artifact.preview}</p>
                        <div className="text-xs text-gray-400 mt-1">
                          {artifact.type} • Today
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* User Settings */}
          {sidebarOpen && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Demo User</p>
                  <p className="text-xs text-gray-500">Free Plan</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="border-b border-gray-200 p-4 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {currentChat?.name || 'New Chat'}
                </h1>
                {currentProject && (
                  <p className="text-sm text-gray-500">
                    Project: {currentProject.name}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {selectedModel}
                </Badge>
                <Button variant="ghost" size="sm">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 bg-white">
            <div className="max-w-4xl mx-auto p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                                     <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                     <span className="text-white font-bold text-xl">E</span>
                   </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Welcome to Envinage AI
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                    Your unified workspace for AI-powered content creation, project management, and intelligent previews. 
                    Start a conversation to generate code, documents, images, and more.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    {[
                      { icon: Code, title: 'Generate Code', desc: 'Create React components, functions, and more' },
                      { icon: FileText, title: 'Write Documents', desc: 'Generate articles, documentation, and text' },
                      { icon: Image, title: 'Create Images', desc: 'Generate visuals and graphics with DALL-E' },
                    ].map((item, index) => (
                                             <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors">
                         <item.icon className="h-8 w-8 text-blue-500 mb-3" />
                        <h3 className="font-medium mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-8 w-8 mt-1">
                                                 {message.role === 'assistant' ? (
                           <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                             E
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
                            {message.role === 'assistant' ? 'Envinage AI' : 'You'}
                          </span>
                          {message.model && (
                            <Badge variant="secondary" className="text-xs capitalize">
                              {message.model}
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="prose prose-sm max-w-none">
                          <div className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </div>
                        </div>
                        
                        {/* Artifacts */}
                        {message.artifacts && message.artifacts.length > 0 && (
                          <div className="space-y-2">
                            {message.artifacts.map(artifact => (
                              <div key={artifact.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    {artifact.type === 'code' ? (
                                      <Code className="h-4 w-4 text-blue-600" />
                                    ) : artifact.type === 'image' ? (
                                      <Image className="h-4 w-4 text-green-600" />
                                    ) : (
                                      <FileText className="h-4 w-4 text-purple-600" />
                                    )}
                                    <span className="font-medium text-sm">{artifact.name}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                      onClick={() => {
                                        setPreviewContent(artifact)
                                        setShowPreview(true)
                                      }}
                                    >
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                    >
                                      <Save className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-600">{artifact.preview}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-1 pt-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <RotateCcw className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Save className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    {message !== messages[messages.length - 1] && (
                      <Separator className="my-6" />
                    )}
                  </div>
                ))
              )}

              {isLoading && (
                                 <div className="flex items-start gap-4">
                   <Avatar className="h-8 w-8 mt-1">
                     <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                       E
                     </AvatarFallback>
                   </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">Envinage AI</span>
                      <span className="text-xs text-gray-500">thinking...</span>
                    </div>
                                         <div className="flex items-center gap-1">
                       <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                       <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                       <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                     </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="max-w-4xl mx-auto space-y-3">
              {/* Input Controls */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Label>Model:</Label>
                                     <Select value={selectedModel} onValueChange={(value: 'gemini' | 'claude' | 'dalle') => setSelectedModel(value)}>
                     <SelectTrigger className="w-32">
                       <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="gemini">Gemini 2.5</SelectItem>
                       <SelectItem value="claude">Claude Sonnet</SelectItem>
                       <SelectItem value="dalle">DALL-E 3</SelectItem>
                     </SelectContent>
                   </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Label>Response:</Label>
                                     <Select value={responseMode} onValueChange={(value: 'concise' | 'normal' | 'detailed') => setResponseMode(value)}>
                     <SelectTrigger className="w-24">
                       <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="concise">Concise</SelectItem>
                       <SelectItem value="normal">Normal</SelectItem>
                       <SelectItem value="detailed">Detailed</SelectItem>
                     </SelectContent>
                   </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch
                    id="thinking-mode"
                    checked={thinkingMode}
                    onCheckedChange={setThinkingMode}
                  />
                  <Label htmlFor="thinking-mode">Thinking Mode</Label>
                </div>
              </div>
              
              {/* Input Form */}
              <form onSubmit={handleSubmit} className="relative">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message Envinage AI..."
                                     className="min-h-[60px] max-h-[200px] pr-20 resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e)
                    }
                  }}
                />
                <div className="absolute right-2 bottom-2 flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!input.trim() || isLoading}
                                         className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
              
              <p className="text-xs text-gray-500 text-center">
                Envinage AI can make mistakes. Please verify important information.
              </p>
            </div>
          </div>
        </div>

        {/* Right Preview Panel */}
        {showPreview && (
          <div className="w-96 border-l border-gray-200 bg-white flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-medium">Preview</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1 p-4">
              {renderPreview()}
            </ScrollArea>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}