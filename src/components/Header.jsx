import React, {useContext, useState} from 'react'
import {InputContext} from '../App'

const Header = () => {
    const [value, setValue] = useState("")
    const {inputValue, setInputValue} = useContext(InputContext)


    const handleClick = () => {
        setInputValue(value)
        setValue("")
    }

    const handleInputKeyDown = (e) => {
        if(e.key === 'Enter') {
            setInputValue(value)
            setValue("")
        }
    }
  
  return (
    <div className='bg-gray-700'>
        <div className="container py-8 mx-auto">
            <h1 className='text-center font-bold text-3xl text-white'>Simple Dictionary</h1>
            <p className='text-center mt-1 mb-10 text-lg text-slate-300'>Find definitions or words</p>
        
            <div className='flex items-center justify-center mt-5'>
                <div className='flex border-2 border-gray-200 rounded'> 
                    <input className='px-4 py-2 md:w-80' type="text" placeholder='search...'
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        onKeyDown={handleInputKeyDown}
                    />
                    <button className='bg-blue-300 border-l px-4 py-2 text-white' onClick={handleClick}>Search</button>
                </div>
            </div>
            {inputValue && (
                <h3 className='text-center mt-4 text-gray-50'>Result for: <span className='text-white font-bold'>{inputValue}</span></h3>
            )}
        </div>
    </div>
  )
}

export default Header