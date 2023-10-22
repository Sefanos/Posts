import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/login'
import SignUp from './pages/signUp'
import './App.css'

function App() {


  return (
  <Router>
    <Routes>
      <Route path='/SignUp' element={ <SignUp/>} />
      <Route path='/Login' element={ <Login/>} />
    </Routes>
  </Router>
  )
}

export default App
