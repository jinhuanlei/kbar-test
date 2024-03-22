import React, { useEffect, useState } from 'react'
import { Action, useMatches, KBarPortal, KBarPositioner, KBarAnimator, KBarSearch, KBarResults, useRegisterActions, createAction } from 'kbar'
import { BirdIcon, SearchIcon, ZapIcon, VideoIcon, BookOpenIcon } from 'lucide-react';
const getKeywords = (str: string): string => {
    return str
        .toLowerCase() // Convert to lowercase first
        .replace(/\B./g, ''); // Remove every other character except for word boundaries
};


export function KBar() {
    // HOOKS
    const { results } = useMatches()
    const [shorts, setShorts] = useState<Action[]>([])
    const [videos, setVideos] = useState<Action[]>([])
    const [articles, setArticles] = useState<Action[]>([])
    useRegisterActions(shorts, [shorts])
    useRegisterActions(videos, [videos])
    useRegisterActions(articles, [articles])

    useEffect(() => {
        fetch('https://vsnth.dev/api/shorts')
            .then(res => res.json())
            .then(shorts => {
                setShorts(shorts.map((short: any) => createAction({
                    priority: 20,
                    name: short.title,
                    section: 'Shorts',
                    keywords: getKeywords(short.title),
                    icon: <ZapIcon className='w-5 h-5' />,
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
                    icon: <VideoIcon className='w-5 h-5' />,
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
                    icon: <BookOpenIcon className='w-5 h-5' />,
                    perform: () => window.location.replace(`https://vasanthdeveloper.com/${article.slug}`),
                })))
            })
    }, [])

    return <KBarPortal>
        <KBarPositioner
            className='z-[1001] bg-black/60 backdrop-blur-sm'
            style={{
                animationName: 'animate-opacity',
                animationDuration: '200ms',
            }}>
            <KBarAnimator className='font-content bg-stone-900 rounded-md shadow-xl flex flex-col space-x-4 w-[35rem] overflow-hidden'>
                <div className='flex px-2 font-medium text-neutral-400 focus-within:text-neutral-200 selection:bg-white/20'>
                    <div className='flex items-center ml-3 mt-[2px]'>
                        <SearchIcon className='w-5 h-5 aspect-square transition-colors' strokeWidth={2.2} />
                    </div>
                    <KBarSearch className='w-full outline-none transition-colors bg-transparent rounded pl-4 pr-6 py-4 placeholder:text-neutral-400'/>
                </div>
                <div className='flex flex-col'>
                    {/* showing results */}
                    {results.length != 0 && <div className='animate-faceIn border-t-2 border-stone-700/50 pb-3 pt-2'>
                      <KBarResults
                        items={results}
                        onRender={({ item, active }) =>
                            typeof item == 'string' ? (
                                // section heading
                                <div className='text-xs pt-3 pb-1 px-[34px] text-neutral-500 font-bold uppercase'>
                                    {item}
                                </div>
                            ) : (
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
                                                <span className={`transition-colors ${active ? 'text-white' : 'text-neutral-400'}`}>{item.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                      />
                    </div>}

                    {/* when no results */}
                    {results.length == 0 && <div className='animate-faceIn select-none pointer-events-none  text-neutral-400 flex flex-col justify-center items-center pt-8 pb-12 space-y-4'>
                      <BirdIcon className='w-20 h-20 select-none' strokeWidth={1} />
                      <p className='text-lg'>No search results</p>
                    </div>}
                </div>
            </KBarAnimator>
        </KBarPositioner>
    </KBarPortal>
}