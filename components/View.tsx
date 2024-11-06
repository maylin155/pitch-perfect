import React from 'react'
import Ping from './Ping'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import {client} from '@/sanity/lib/client';
import { writeClient } from '@/sanity/lib/write-client';
import { unstable_after as after } from 'next/server';


const View = async ({id}:{id: string}) => {

    const {views: totalViews} = await client.withConfig({useCdn: false}).fetch(STARTUP_VIEWS_QUERY, {id})

    // TODO : Update the number of views whenever somebody see this post
    after(async () => 
    await writeClient
    .patch(id)
    .set({views: totalViews + 1})
    .commit()); 


  return (
    <div className="view-container">
        <div className="absolute -top-2 -right-2">
            <Ping />
        </div>
        <p className="view-text">
            {totalViews} {totalViews === 1 ? 'view' : 'views'}
        </p>
    </div>
  )
}

export default View