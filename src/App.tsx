import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
         <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <button className="bg-blue-500 text-white p-2 rounded-md cursor-pointer" onClick={() => setCount(count + 1)}>Click me</button>
        <p>Count: {count}</p>
    </>
  )
}

export default App
