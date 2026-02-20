import { lazy, Suspense, useEffect } from 'react';
import './App.css'
import AuthStore from './store/authStore'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

//lazy load pages and components for optimization
const Homepage = lazy(() => import('./pages/Homepage'));
const Login = lazy(() => import('./pages/AuthPage'));
const Navbar = lazy(() => import('./components/Navbar'));
const PostPage = lazy(() => import('./pages/PostPage'));

function App() {

  const {AuthUser, loadingUser, getUser} = AuthStore();

  useEffect(() => {
    getUser();
  }, [getUser]);
  // TO BE FIXED TO

  if (loadingUser && !AuthUser) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <span className="loading-xl loading-spinner"></span>
      </div>
    );
  }

  
  return (
    <>
      <div data-theme="corporate">
        <Toaster position='bottom-right'/>
        <Navbar user={AuthUser}/>
        <Suspense fallback={
          <div className='w-full h-screen flex justify-center items-center'>
            <span className="loading-xl loading-spinner"></span>
          </div>
        }>
          <Routes>
            <Route path='/' element={AuthUser ? <Navigate to="/homepage"/> : <Navigate to="/login"/>}/>
            <Route path='/homepage' element={AuthUser ? <Homepage/> : <Navigate to="/"/>}/>
            <Route path='/login' element={AuthUser ? <Navigate to="/homepage"/> : <Login/>}/>
            <Route path='/post/:id' element={<PostPage/>}/>
          </Routes>
        </Suspense>
      </div>
    </>
  )
  

  //GAWING ISANG PAGE NALANG YUNG AUTHENTICATION TBD BUKAS --DONE
}

export default App
