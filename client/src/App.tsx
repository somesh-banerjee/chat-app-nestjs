import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <h1 className="underline">ok</h1>,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
