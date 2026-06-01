import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import { AppNavbar } from './components/layout/AppNavbar';
import { Footer } from './components/footer/Footer';
import { ProtectedRoute } from './components/routing/ProtectedRoute';
import { AdminProtectedRoute } from './components/routing/AdminProtectedRoute';

function App() {
  return (
    <div className='app-shell'>
      <BrowserRouter>
        <AppNavbar />
        <main className='app-main'>
          <Routes>
            <Route path='/' element={<Maincomponent />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/unregister' element={<Unregister />}></Route>
            <Route
              path='/videos'
              element={
                <ProtectedRoute>
                  <VideoHome />
                </ProtectedRoute>
              }
            ></Route>
            <Route path='/admin-login' element={<AdminLogin />}></Route>
            <Route
              path='/admin-home'
              element={
                <AdminProtectedRoute>
                  <AdminHome />
                </AdminProtectedRoute>
              }
            ></Route>
            <Route
              path='/add-video'
              element={
                <AdminProtectedRoute>
                  <AddVideo />
                </AdminProtectedRoute>
              }
            ></Route>
            <Route
              path='/view-video/:id'
              element={
                <AdminProtectedRoute>
                  <ViewVideo />
                </AdminProtectedRoute>
              }
            ></Route>
            <Route
              path='/edit-video/:id'
              element={
                <AdminProtectedRoute>
                  <EditVideo />
                </AdminProtectedRoute>
              }
            ></Route>
            <Route
              path='/delete-video/:id'
              element={
                <AdminProtectedRoute>
                  <DeleteVideo />
                </AdminProtectedRoute>
              }
            ></Route>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
