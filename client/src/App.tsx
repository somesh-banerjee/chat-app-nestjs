import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Home } from './components/Home';
import { Chat } from './components/Chat';
import { useEffect } from 'react';
import { useGlobalStateContext } from './utils/Context';
import { io } from 'socket.io-client';

const routes = [
  {
    path: '/room/:id',
    element: <Chat />,
  },
{
    path: '/login',
    element:    <Login />,
},
{
    path: '/register',
    element:    <Register />,
},
{
    path: '*',
    element:    <Home />,
},
];

const router = createBrowserRouter(routes);

function App() {
    const {  tokens, updateGlobalState } = useGlobalStateContext();

    useEffect(() => {
        const connectSocket = async () => {
            const newSocket = io("http://localhost:8001", {
                query: {
                    token: tokens?.accessToken,
                },
            });
            updateGlobalState({ socket: newSocket });
        }

        if(tokens)
            connectSocket();

    }, [tokens])

  return <RouterProvider router={router} />;
}

export default App;
