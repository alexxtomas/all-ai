import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon
} from 'lucide-react'
import { Montserrat } from 'next/font/google'

export const ROUTES = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    color: 'text-sky-500'
  },
  {
    label: 'Conversation',
    href: '/conversatioin',
    icon: MessageSquare,
    color: 'text-violet-500'
  },
  {
    label: 'Image Generation',
    href: '/image',
    icon: ImageIcon,
    color: 'text-pink-700'
  },
  {
    label: 'Video Generation',
    href: '/video',
    icon: VideoIcon,
    color: 'text-orange-700'
  },
  {
    label: 'Music Generation',
    href: '/music',
    icon: Music,
    color: 'text-emerald-500'
  },
  ,
  {
    label: 'Code Generation',
    href: '/code',
    icon: Code,
    color: 'text-green-700'
  },
  ,
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    color: ''
  }
]

export const MONTSERRAT = Montserrat({ weight: '600', subsets: ['latin'] })
