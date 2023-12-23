import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';

const routes = [
  {
    path: '/',
    element: <h1 className="underline">ok</h1>,
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
