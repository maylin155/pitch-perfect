
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {

  const query = (await searchParams).query;
  const params = {search : query || null};


  const {data : posts} = await sanityFetch({query: STARTUPS_QUERY, params})
  const session = await auth();

  console.log(session?.id);

  console.log(JSON.stringify(posts, null, 2));

  // const posts = [{ _createdAt: new Date(), views: 55, author: {_id: 1, name: "Elon Musk"}, description: 'This is a description', image: 'https://media.istockphoto.com/id/1414699113/photo/small-robot-assistant-work-with-graphic-display.jpg?s=612x612&w=0&k=20&c=gGfba4h97L1tFjVWkPTiZUlfNHtkrf0fHhsmkY4S5Ng=', category: 'Robots', title: "We Robots"}
  // ]
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br /> Share Your Vision</h1>
        <p className="sub-heading !max-w-3xl">
          Submit Your Pitch, Vote to Support, and Elevate Your Presence!
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
