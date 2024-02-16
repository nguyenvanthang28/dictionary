import React, { useState, useEffect, useContext } from 'react';
import { InputContext } from '../App';
import MeaningList from './MeaningList';
import Example from './Example';
import Synonym from './Synonym';
import Antonym from './Antonym';
import { Link, animateScroll as scroll } from 'react-scroll';

const ResultList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { inputValue } = useContext(InputContext);

  const fetchData = async (param) => {
    setIsPending(true);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${param}`);

      if (!res.ok) {
        throw new Error('could not fetch data');
      }

      const data = await res.json();

      setData(data);
      setError(null);
      setIsPending(false);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData(inputValue);
    }
  }, [inputValue]);

  const scrollToSection = (sectionId) => {
    scroll.scrollTo(sectionId, {
      duration: 500,
      smooth: true,
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl mt-5">

      <div>
        {isPending && <h1 className="text-center text-gray-500 font-semibold">Loading...</h1>}
        {error && <h3 className="text-center text-gray-500 font-semibold">No Definitions Found</h3>}
      </div>

      {data && (
        <div>
            <nav className="flex justify-around">
                <Link to="meaning" smooth={true} duration={500} className='cursor-pointer font-semibold' onClick={() => scrollToSection('meaning')}>
                Meaning & Definitions
                </Link>
                <Link to="example" smooth={true} duration={500} className='cursor-pointer font-semibold' onClick={() => scrollToSection('example')}>
                Example
                </Link>
                <Link to="synonym" smooth={true} duration={500} className='cursor-pointer font-semibold' onClick={() => scrollToSection('synonym')}>
                Synonym
                </Link>
                <Link to="antonym" smooth={true} duration={500} className='cursor-pointer font-semibold' onClick={() => scrollToSection('antonym')}>
                Antonym
                </Link>
            </nav>
          
            <div>
                <h3 className='text-2xl font-bold mt-4' id="meaning">Meaning & Definitions:</h3>
                <MeaningList mean={data}/>  
            </div>
            <div>
                <h3 className='text-2xl font-bold mt-4' id="example">Example:</h3>
                <Example mean={data}/> 
            </div>
            <div>
                <h3 className='text-2xl font-bold mt-4' id="synonym">Synonym:</h3>
                <Synonym mean={data}/>
            </div>
            <div>
                <h3 className='text-2xl font-bold mt-4' id="antonym">Antonym:</h3>
                <Antonym mean={data}/>
            </div> 
        </div>
      )}
    </div>
  );
};

export default ResultList;
