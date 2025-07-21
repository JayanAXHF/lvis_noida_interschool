import type { ElementType } from 'react'

export interface User {
  name: string
  email: string
  avatar: string
}

export interface NavMainChild {
  title: string
  thread_id: number
}

export interface NavMainItem {
  title: string
  url: string
  icon: ElementType
  items?: NavMainChild[]
}

export interface NavCloudsChild {
  title: string
  url: string
}

export interface NavCloudsItem {
  title: string
  icon: ElementType
  isActive?: boolean
  url: string
  items: NavCloudsChild[]
}

export interface NavSecondaryItem {
  title: string
  url: string
  icon: ElementType
}

export interface PageData {
  user: User
  navMain: NavMainItem[]
  navClouds: NavCloudsItem[]
  navSecondary: NavSecondaryItem[]
}
