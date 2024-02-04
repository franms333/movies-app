import './App.css'
import { PiFilmSlateDuotone } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import Card from './components/Card';
import { useEffect, useState } from 'react';
import GetData from './services/GETData';
import useWindowSize from './hooks/useWindowSize';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonCard from './components/SkeletonCard';

function App() {
  const [movies, setMovies] = useState(Array<any>);
  const [allMovies, setAllMovies] = useState(Array<any>);
  const [pageIndex, setPageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const {width} = useWindowSize();

  useEffect(()=>{
    if(movies.length === 0){
      fetchMovies();
      setIsLoading(false)
    }
  },[]);

  async function fetchMovies(){
    const {data} = await GetData();
    const paginatedMovies:any[] = await chunkArray(data, 15);
    setMovies(paginatedMovies);
    setAllMovies(paginatedMovies[0]);
  } 

  function chunkArray(movies:any, chunkSize=15):Array<{}> {
    const result = [];
    for (let i = 0; i < movies.length; i += chunkSize) {
        result.push(movies.slice(i, i + chunkSize));
    }
    return result;
  }

  function handlePageSelection(listIndex:number) {
    setPageIndex(listIndex);
  }

  function simulateFetchMovies(){
    const nextPageIndex = pageIndex + 1;

    if (nextPageIndex < movies.length) {
      setIsLoading(true);
      setTimeout(()=>{
        setPageIndex(nextPageIndex);
        const nextPageData = movies[nextPageIndex];
        setAllMovies((prevMovies) => [...prevMovies, ...nextPageData]);
      }, 3000)
    } else {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className='lg:px-72 md:px-10'>
        <header className='flex items-center justify-between p-4 bg-slate-900/70 rounded-lg'>
          <PiFilmSlateDuotone 
            className='text-gray-400 font-bold text-4xl cursor-pointer transition-colors duration-100 hover:text-gray-200'
          />
          <div className='flex items-center gap-3'>
            <p className='font-bold cursor-pointer transition-colors duration-100 hover:text-gray-200'>Movies</p>
            <p className='font-bold cursor-pointer transition-colors duration-100 hover:text-gray-200'>Shows</p>
            <p className='font-bold cursor-pointer transition-colors duration-100 hover:text-gray-200'>Suggest me</p>
          </div>
        </header>
        <main className='pt-40 px-4'>
          <h1 className='text-6xl font-bold text-white/80'>Kriet</h1>
          <p className='text-lg text-white lg:w-1/2 md:w-3/5 mt-7'>List of movies and TV Shows, I, Kriet have watched till date. Explore what I have watched and also feel free to make a suggestion. 😉</p>
          
          <div className='flex items-center gap-3 border-2 border-gray-600 rounded-xl p-4 mt-4 lg:w-2/6 md:w-3/5'>
            <CiSearch 
            className='text-xl text-gray-400'
            />
            <input type="text" className='outline-none bg-transparent text-white grow' placeholder='Search Movies' />
          </div>

          <h2 className='text-3xl font-bold text-white/80 mt-20 mb-8'>Movies</h2>

          {/* <div className='lg:gap-x-5 md:grid md:gap-y-4 md:grid-cols-auto-fill-md xs:grid-cols-auto-fill-sm xs:gap-x-4 '> */}
          <div className='lg:gap-x-5 md:grid md:gap-y-4 md:grid-cols-auto-fill-md'>
            {movies.length > 0 && width > 550 && movies[pageIndex].map((movie:any)=>(
              <Card 
              key={movie.id}
              poster={movie.image}
              title={movie.title}
              />
            ))}
            {allMovies.length > 0 && width < 510 &&
              <InfiniteScroll
              className='md:hidden xs:grid xs:gap-y-4 xs:grid-cols-auto-fill-sm xs:gap-x-4'
              dataLength={allMovies.length} //This is important field to render the next data
              next={simulateFetchMovies}
              hasMore={true}
              loader={isLoading && <SkeletonCard />}>
                {allMovies.map((movie)=>(
                  <Card 
                  key={movie.id}
                  poster={movie.image}
                  title={movie.title}
                  />
                ))}
              </InfiniteScroll>
            }
          </div>
          <div className='w-full justify-center items-center mt-16 md:flex xs:hidden'>
            <div className="join">
              {movies.length > 0 && movies.map((_, index)=>(
                <input 
                className="join-item btn btn-square" 
                type="radio" 
                name="options" 
                onChange={()=>handlePageSelection(index)}
                checked={pageIndex === index}
                aria-label={`${index + 1}`} />
              ))}
            </div>
          </div>
        </main>
        <footer className='p-6'></footer>
      </div>
    </>
  )
}

export default App
