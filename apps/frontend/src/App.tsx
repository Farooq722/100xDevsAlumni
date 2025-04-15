import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./Home/Index"

function App() {

  return (
   <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
   </div>
  )
}

export default App
