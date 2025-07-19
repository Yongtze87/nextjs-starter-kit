'use client'

import { useState } from 'react'
import { User, Bell, Shield, Palette, Download, Trash2, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [notifications, setNotifications] = useState(true)
  const [dataCollection, setDataCollection] = useState(false)
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('en')

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-semibold">Settings</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="flex h-full">
          <TabsList className="flex flex-col h-full w-48 bg-gray-50 rounded-none justify-start p-2">
            <TabsTrigger value="general" className="w-full justify-start gap-2 mb-1">
              <User className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="w-full justify-start gap-2 mb-1">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="w-full justify-start gap-2 mb-1">
              <Shield className="h-4 w-4" />
              Privacy & Safety
            </TabsTrigger>
            <TabsTrigger value="appearance" className="w-full justify-start gap-2 mb-1">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="data" className="w-full justify-start gap-2 mb-1">
              <Download className="h-4 w-4" />
              Data & Privacy
            </TabsTrigger>
            <TabsTrigger value="help" className="w-full justify-start gap-2">
              <HelpCircle className="h-4 w-4" />
              Help & Support
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="general" className="p-6 m-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Account</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                          U
                        </div>
                        <div>
                          <p className="font-medium">User Account</p>
                          <p className="text-sm text-gray-500">Free Plan</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Language & Region</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="language">Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="it">Italiano</SelectItem>
                          <SelectItem value="pt">Português</SelectItem>
                          <SelectItem value="ja">日本語</SelectItem>
                          <SelectItem value="ko">한국어</SelectItem>
                          <SelectItem value="zh">中文</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="p-6 m-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifications">Push Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications about new features and updates</p>
                      </div>
                      <Switch
                        id="notifications"
                        checked={notifications}
                        onCheckedChange={setNotifications}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive important updates via email</p>
                      </div>
                      <Switch id="email-notifications" />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketing">Marketing Communications</Label>
                        <p className="text-sm text-gray-500">Receive news about Anthropic products</p>
                      </div>
                      <Switch id="marketing" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="p-6 m-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Privacy & Safety</h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Conversation Privacy</CardTitle>
                        <CardDescription>
                          Your conversations are private and not used to train our models without your consent.
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="data-collection">Allow Data Collection</Label>
                        <p className="text-sm text-gray-500">Help improve Claude by sharing anonymized usage data</p>
                      </div>
                      <Switch
                        id="data-collection"
                        checked={dataCollection}
                        onCheckedChange={setDataCollection}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Clear All Conversations</Label>
                        <p className="text-sm text-gray-500">Permanently delete all your conversation history</p>
                      </div>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear All
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="p-6 m-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Appearance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="theme">Theme</Label>
                      <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Compact Mode</Label>
                        <p className="text-sm text-gray-500">Use smaller spacing and text sizes</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Timestamps</Label>
                        <p className="text-sm text-gray-500">Display message timestamps in conversations</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="data" className="p-6 m-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Data & Privacy</h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Export Your Data</CardTitle>
                        <CardDescription>
                          Download a copy of your conversations and account data
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Request Data Export
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Delete Account</CardTitle>
                        <CardDescription>
                          Permanently delete your account and all associated data
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="help" className="p-6 m-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Help & Support</h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Documentation</CardTitle>
                        <CardDescription>
                          Learn how to get the most out of Claude
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline">View Documentation</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Contact Support</CardTitle>
                        <CardDescription>
                          Get help with technical issues or billing questions
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline">Contact Support</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Community</CardTitle>
                        <CardDescription>
                          Join our community to share tips and get help from other users
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline">Join Community</Button>
                      </CardContent>
                    </Card>
                    
                    <div className="pt-4 text-center text-sm text-gray-500">
                      <p>Claude v3.0 • Terms of Service • Privacy Policy</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}