import React, { Suspense } from 'react'
import { DETAILS_QUERY, PLAYLIST_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import markdownit from 'markdown-it';
import { parse } from 'path';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    const [posts, { select: editorPosts }] = await Promise.all([
        client.fetch(DETAILS_QUERY, { id }),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editor-picks' })
    ])
    const md = markdownit();

    // const posts = await client.fetch(DETAILS_QUERY, { id });

    // const editorPostsResponse = await client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editor-picks' });

    // Check if the response contains the expected data
    // if (!editorPostsResponse) {
    //     console.error("Unexpected data structure:", editorPostsResponse);
    //     return notFound(); // or handle the error appropriately
    // }

    // // Access the select array from the fetched playlist
    // const editorPosts = editorPostsResponse.select || []; // Use an empty array as a fallback

    if (!posts) return notFound();

    const parsedContent = md.render(posts?.pitch || '');

    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <p className="tag">
                    {formatDate(posts?._createdAt)}
                </p>
                <h1 className="heading">
                    {posts.title}
                </h1>
                <p className="sub-heading !max-w-5xl">
                    {posts.description}
                </p>
            </section>

            <section className="section_container">
                <img
                    src={posts.image}
                    alt="thumbnail"
                    className="w-full h-auto rounded-xl"
                />
                <div className="space-y-5 mt-10 max-w-full mx-auto">
                    <div className="flex-between gap-5">
                        <Link href={`/user/${posts.author?._id}`} className="flex gap-2 items-center mb-3">
                            <Image src={posts.author?.image} alt="avatar" width={64} height={64}
                                className="rounded-full drop-shadow-lg" />
                            <div>
                                <p className="text-20-medium">{posts.author?.name}</p>
                                <p className="text-16-medium !text-black-300">@{posts.author?.username}</p>
                            </div>
                        </Link>

                        <p className="category-tag">
                            {posts.category}
                        </p>
                    </div>
                    <h3 className="text-30-bold">Pitch Details</h3>
                    {parsedContent ? (
                        <article dangerouslySetInnerHTML={{ __html: parsedContent }}
                            className="prose max-w-4xl font-work-sans break-all"
                        />
                    ) : (
                        <p className="no-result">
                            No details provided
                        </p>
                    )}
                </div>

                <hr className="divider" />

                {/* Aligned Editor Picks Section */}
                {editorPosts.length > 0 && (
                   <div className="space-y-5">
                   <p className="text-30-semibold">Editor Picks</p>
                   <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                       {editorPosts.map((post: StartupTypeCard) => (
                           <StartupCard key={post._id} post={post} />
                       ))}
                   </ul>
               </div>
                )}

                <Suspense fallback={<Skeleton className="view_skeleton" />}>
                    <View id={id} />
                </Suspense>
            </section>
        </>

    );
};

export default Page;