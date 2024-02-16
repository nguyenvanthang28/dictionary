import Header from "./components/Header";
import {createContext, useState} from 'react'
import ResultList from "./components/ResultList";

//create context

export const InputContext = createContext()

function App() {
  const [inputValue, setInputValue] = useState('')

  const value = {
    inputValue,
    setInputValue
  }

  return (
    <InputContext.Provider value={value}>
      <div className="App">
        <Header/>
        <ResultList/>
      </div>
    </InputContext.Provider>
  );
}

export default App;
