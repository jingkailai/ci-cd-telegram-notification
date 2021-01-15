import React, { useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Layout from './components/Layout';
import { LoadUser } from './API/auth';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LoadUser());
  }, [LoadUser]);

  return (
    <div>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div >
  );
}

export default App;
