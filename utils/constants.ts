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
    href: '/conversation',
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
  {
    label: 'Code Generation',
    href: '/code',
    icon: Code,
    color: 'text-green-700'
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    color: ''
  }
]

export const TOOLS = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    href: '/conversation'
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    href: '/music'
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    href: '/image'
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    href: '/video'
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    bgColor: 'bg-green-500/10',
    href: '/code'
  }
]

export const MONTSERRAT = Montserrat({ weight: '600', subsets: ['latin'] })
