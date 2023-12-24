import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Home } from './components/Home';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
{
    path: '/login',
    element:    <Login />,
},
{
    path: '/register',
    element:    <Register />,
},
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
