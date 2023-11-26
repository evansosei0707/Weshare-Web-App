import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { userQuery } from './utils/data';

import { Home } from './Pages';
import { Login } from './Components';

const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const user = userQuery();
   
    if (!user) {
     navigate('/login')
    }
   
   },[])


  return (
    <Routes>
      <Route path='/*' element={<Home />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App