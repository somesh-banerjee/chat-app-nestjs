import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStateContext } from "../utils/Context";

export const Login = () => {

    const navigate = useNavigate();
    const { updateGlobalState } = useGlobalStateContext();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            const apiResponse = await fetch('http://localhost:3000/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            const responseDate = await apiResponse.json();

            console.log('from login', responseDate)
            updateGlobalState({
                user: responseDate.user,
                tokens: responseDate.tokens
            });

            navigate('/');
        } catch (error) {
            console.log(error)
        }
    };
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            ref={emailRef}
            autoComplete="email"
            required
            className="rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full sm:text-sm border p-2"
            placeholder="Email address"
          />
          <input
            type="password"
            ref={passwordRef}
            autoComplete="current-password"
            required
            className="rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full sm:text-sm border p-2"
            placeholder="Password"
          />
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
        <div className="flex justify-center cursor-pointer">
          <span onClick={() => {navigate('/register')}}>Don't have an account? Register here.</span>
        </div>
      </div>
    </div>
  );
};

