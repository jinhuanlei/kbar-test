import React, {useEffect, useState} from 'react'
import {
  Action,
  useMatches,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useRegisterActions,
  createAction, useKBar, KBarState, ActionImpl
} from 'kbar'
import {
  BirdIcon,
  SearchIcon,
  ZapIcon,
  VideoIcon,
  BookOpenIcon,
  Trello,
  HomeIcon,
  GalleryVerticalEndIcon, UserCircleIcon, YoutubeIcon, GithubIcon, LinkedinIcon
} from 'lucide-react';

const getKeywords = (str: string): string => {
  return str
    .toLowerCase() // Convert to lowercase first
    .replace(/\B./g, ''); // Remove every other character except for word boundaries
};

const filterResults = (results: any[]) => {
  return results;
}

const onRender = (item: any, active: any, currentRootActionId: any) => {
  if (typeof item == 'string') {
    return (
      <div className='text-xs pt-3 pb-1 px-[34px] text-neutral-500 font-bold uppercase'>
        {item}
      </div>);
  }
  console.log("item:", item);
  if (!currentRootActionId && item && item.ancestors.length !== 0) {
    return <></>;
  }
  return (
    // each item
    <div className='flex flex-col py-1'>
      <div className='flex flex-col px-4'>
        <div
          className={`flex pl-4 py-3 transition-colors rounded-md ${active ? 'bg-stone-600/70 cursor-pointer' : 'bg-stone-700/40'}`}>
          {/* the icon */}
          {item.icon && <div
              className={`flex items-center justify-center ml-0 mr-3 transition-colors ${active
                ? 'text-white'
                : 'text-neutral-400'
              }`}>
            {item.icon}
          </div>}

          {/* name & subtitle */}
          <div className='flex flex-col text-sm'>
                              <span
                                className={`transition-colors ${active ? 'text-white' : 'text-neutral-400'}`}>{item.name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const actions: Action[] = [
  {
    id: 'board',
    name: 'board',
    priority: 100,
    keywords: 'board',
    section: 'Board',
    icon: <Trello className='w-[19px] h-[19px]'/>,
  },
  {
    id: 'list',
    name: 'list',
    priority: 100,
    keywords: 'list',
    section: 'Board',
    icon: <Trello className='w-[19px] h-[19px]'/>,
  },
  {
    id: 'card',
    name: 'card',
    priority: 100,
    keywords: 'card',
    section: 'Board',
    icon: <Trello className='w-[19px] h-[19px]'/>,
  },
  {
    id: 'board-create',
    name: 'create',
    priority: 0,
    section: 'Board',
    icon: <Trello className='w-[19px] h-[19px]'/>,
    parent: 'board',
    perform: (action) => {
      console.log("action:", action);
    },
  },
  {
    id: 'home',
    name: 'Home',
    priority: 100,
    section: 'Main',
    keywords: 'portfolio home goto main',
    icon: <HomeIcon className='w-[19px] h-[19px]'/>,
    perform: () => {
      window.location.href = "https://vsnth.dev"
    },
  },
  {
    id: 'blog',
    name: 'Blog',
    priority: 100,
    section: 'Main',
    keywords: 'articles blog posts writing',
    icon: <GalleryVerticalEndIcon className='w-[19px] h-[19px]'/>,
    perform: () => {
      window.location.href = "https://vasanthdeveloper.com"
    },
  },
  {
    id: 'about',
    priority: 100,
    section: 'Main',
    name: 'About me',
    keywords: 'know me about myself vasanth developer srivatsa',
    icon: <UserCircleIcon className='w-[19px] h-[19px]'/>,
    perform: (action) => {
      window.location.href = "https://vas.cx/about"
    },
  },
  {
    priority: 99,
    id: 'youtube',
    name: 'YouTube',
    section: 'Social',
    icon: <YoutubeIcon className='w-[19px] h-[19px]'/>,
    keywords: 'social watch videos entertainment knowledge tutorials howto profile',
    perform: () => {
      window.location.href = "https://vas.cx/videos"
    },
  },
  {
    id: 'github',
    priority: 99,
    name: 'GitHub',
    section: 'Social',
    keywords: 'projects work code developer software profile',
    icon: <GithubIcon className='w-[19px] h-[19px]'/>,
    perform: () => {
      window.open("https://vas.cx/github")
    },
  },
  {
    priority: 99,
    id: 'linkedin',
    name: 'LinkedIn',
    section: 'Social',
    icon: <LinkedinIcon className='w-[19px] h-[19px]'/>,
    keywords: 'connect professional network social profile',
    perform: () => {
      window.location.href = "https://vas.cx/linkedin"
    },
  },
]

export function KBar() {
  // HOOKS
  const {results} = useMatches()
  const [shorts, setShorts] = useState<Action[]>([])
  const [videos, setVideos] = useState<Action[]>([])
  const [articles, setArticles] = useState<Action[]>([])
  useRegisterActions(shorts, [shorts])
  useRegisterActions(videos, [videos])
  useRegisterActions(articles, [articles])
  useRegisterActions(actions, [actions])
  const {query, disabled, currentRootActionId, searchQuery, state} = useKBar((state: KBarState) => ({
    disabled: state.disabled,
    currentRootActionId: state.currentRootActionId,
    searchQuery: state.searchQuery,
    state,
  }));
  // console.log("currentRootActionId:", currentRootActionId);
  // console.log("searchQuery:", searchQuery);
  useEffect(() => {
    fetch('https://vsnth.dev/api/shorts')
      .then(res => res.json())
      .then(shorts => {
        setShorts(shorts.map((short: any) => createAction({
          priority: 20,
          name: short.title,
          section: 'Shorts',
          keywords: getKeywords(short.title),
          icon: <ZapIcon className='w-5 h-5'/>,
          perform: () => window.location.replace(`https://youtube.com/watch?v=${short.id}`),
        })))
      })

    fetch('https://vsnth.dev/api/videos')
      .then(res => res.json())
      .then(videos => {
        setVideos(videos.map((video: any) => createAction({
          priority: 10,
          name: video.title,
          section: 'Videos',
          keywords: getKeywords(video.title),
          icon: <VideoIcon className='w-5 h-5'/>,
          perform: () => window.location.replace(`https://youtube.com/watch?v=${video.id}`),
        })))
      })

    fetch('https://vasanthdeveloper.com/api.json')
      .then(res => res.json())
      .then(articles => {
        setArticles(articles.map((article: any) => createAction({
          priority: 30,
          name: article.title,
          section: 'Articles',
          keywords: getKeywords(article.title),
          icon: <BookOpenIcon className='w-5 h-5'/>,
          perform: () => window.location.replace(`https://vasanthdeveloper.com/${article.slug}`),
        })))
      })
  }, [])
  // console.log(results);
  return <KBarPortal>
    <KBarPositioner
      className='z-[1001] bg-black/60 backdrop-blur-sm'
      style={{
        animationName: 'animate-opacity',
        animationDuration: '200ms',
      }}>
      <KBarAnimator
        className='font-content bg-stone-900 rounded-md shadow-xl flex flex-col space-x-4 w-[35rem] overflow-hidden'>
        <div className='flex px-2 font-medium text-neutral-400 focus-within:text-neutral-200 selection:bg-white/20'>
          <div className='flex items-center ml-3 mt-[2px]'>
            <SearchIcon className='w-5 h-5 aspect-square transition-colors' strokeWidth={2.2}/>
          </div>
          <KBarSearch
            className='w-full outline-none transition-colors bg-transparent rounded pl-4 pr-6 py-4 placeholder:text-neutral-400'/>
        </div>
        <div className='flex flex-col'>
          {/* showing results */}
          {results.length !== 0 && <div className='animate-faceIn border-t-2 border-stone-700/50 pb-3 pt-2'>
              <KBarResults
                  items={currentRootActionId ? results : filterResults(results)}
                  onRender={
                    ({item, active}) => onRender(item, active, currentRootActionId)}
              />
          </div>}

          {/* when no results */}
          {results.length === 0 && <div
              className='animate-faceIn select-none pointer-events-none  text-neutral-400 flex flex-col justify-center items-center pt-8 pb-12 space-y-4'>
              <BirdIcon className='w-20 h-20 select-none' strokeWidth={1}/>
              <p className='text-lg'>No search results</p>
          </div>}
        </div>
      </KBarAnimator>
    </KBarPositioner>
  </KBarPortal>
}