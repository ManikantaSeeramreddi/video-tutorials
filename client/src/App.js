import './App.css';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom';
import { Maincomponent } from './components/login/main component/main-component';
import { Login } from './components/login/login';
import { Register } from './components/Register/register';
import { Unregister } from './components/unregister/unregister';
import { VideoHome } from './components/videos-Home/video-home';
import { AdminLogin } from './components/admin-login/admin-login';
import { AdminHome } from './components/admin-home/admin-home';
import { AddVideo } from './components/add-video/add-video';
import { ViewVideo } from './components/view-video/view-video';
import { EditVideo } from './components/edit-video/edit-video';
import { DeleteVideo } from './components/delete-video/delete-video';




function App() {
  return (
    
    <div className='container-fluid'>
      <BrowserRouter>
      <header className='d-flex justify-content-between bg-dark text-white p-2 '>
        <div>
          <h2> <Link to='/' className='text-decoration-none text-white'>Tech Video</Link></h2>
        </div>
        <div>
          <Link to='/login' className='btn btn-danger me-2'>User SignIn</Link>
           <Link to='admin-login' className='btn btn-danger'>Admin SignIn</Link>
        </div>
      </header>
      <section className='d-flex ' style={{height:"100vh"}}>
        <Routes>
          <Route path='/' element={<Maincomponent/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/unregister' element={<Unregister/>}></Route>
          <Route path='/videos' element={<VideoHome/>}></Route>
          <Route path='/admin-login' element={<AdminLogin/>}></Route>
          <Route path='/admin-home' element={<AdminHome/>}></Route>
          <Route path='/add-video' element={<AddVideo/>}></Route>
          <Route path='/view-video/:id' element={<ViewVideo/>}></Route>
          <Route path='/edit-video/:id' element={<EditVideo/>}></Route>
          <Route path='/delete-video/:id' element={<DeleteVideo/>}></Route>

        </Routes>
      </section>
      </BrowserRouter>
    </div>
    
  )
}

export default App;
