import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Main from './pages/Main'
import GymDetails from './pages/GymDetails'
import GymOpt from './pages/GymOpt'
import Gymdet from './components/AllUpdates/Gymdet'
import GymdetUpdate from './components/AllUpdates/GymdetUpdate'
import AddMachine from './components/AllUpdates/AddMachine'
import RemoveMachine from './components/AllUpdates/RemoveMachine'
import ShowAllMachines from './components/AllUpdates/ShowAllMachines'
import AddCustomer from './components/AllUpdates/AddCustomer'
import ShowCustomer from './components/AllUpdates/ShowCustomer'
import UpdateCUstomer from './components/AllUpdates/UpdateCUstomer'
import Login from './components/HomePage/Login'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/main/:id' element={<GymDetails />} />
        <Route path='/:id' element={<GymOpt />} />
        <Route path='/:id/gym_details' element={<Gymdet />} />
        <Route path='/:id/update_gym_details' element={<GymdetUpdate />} />
        <Route path='/:id/add_new_machine' element={<AddMachine />} />
        <Route path='/:id/remove_machine' element={<RemoveMachine />} />
        <Route path='/:id/all_machine' element={<ShowAllMachines />} />
        <Route path='/:id/add_new_customer' element={<AddCustomer />} />
        <Route path='/:id/customer_details' element={<ShowCustomer />} />
        <Route path='/:id/update_customer_details' element={<UpdateCUstomer />} />
      </Routes>
    </>
  )
}

export default App
