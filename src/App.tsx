import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Action, KBarProvider} from "kbar";
import {KBar} from "./KBar"
import { HomeIcon, GalleryVerticalEndIcon, UserCircleIcon, GithubIcon, YoutubeIcon, LinkedinIcon, BirdIcon, SearchIcon, ZapIcon, VideoIcon, BookOpenIcon } from 'lucide-react';

const actions: Action[] = [
  {
    id: 'home',
    name: 'Home',
    priority: 100,
    section: 'Main',
    keywords: 'portfolio home goto main',
    icon: <HomeIcon className='w-[19px] h-[19px]' />,
    perform: () => { window.location.href = "https://vsnth.dev" },
  },
  {
    id: 'blog',
    name: 'Blog',
    priority: 100,
    section: 'Main',
    keywords: 'articles blog posts writing',
    icon: <GalleryVerticalEndIcon className='w-[19px] h-[19px]' />,
    perform: () => { window.location.href = "https://vasanthdeveloper.com" },
  },
  {
    id: 'about',
    priority: 100,
    section: 'Main',
    name: 'About me',
    keywords: 'know me about myself vasanth developer srivatsa',
    icon: <UserCircleIcon className='w-[19px] h-[19px]' />,
    perform: () => { window.location.href = "https://vas.cx/about" },
  },
  {
    priority: 99,
    id: 'youtube',
    name: 'YouTube',
    section: 'Social',
    icon: <YoutubeIcon className='w-[19px] h-[19px]' />,
    keywords: 'social watch videos entertainment knowledge tutorials howto profile',
    perform: () => { window.location.href = "https://vas.cx/videos" },
  },
  {
    id: 'github',
    priority: 99,
    name: 'GitHub',
    section: 'Social',
    keywords: 'projects work code developer software profile',
    icon: <GithubIcon className='w-[19px] h-[19px]' />,
    perform: () => { window.open("https://vas.cx/github") },
  },
  {
    priority: 99,
    id: 'linkedin',
    name: 'LinkedIn',
    section: 'Social',
    icon: <LinkedinIcon className='w-[19px] h-[19px]' />,
    keywords: 'connect professional network social profile',
    perform: () => { window.location.href = "https://vas.cx/linkedin" },
  },
]

function App() {
  return <KBarProvider actions={actions}>
    <KBar />
  </KBarProvider>
}

export default App;
