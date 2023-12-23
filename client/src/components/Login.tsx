import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {



        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        console.log({ email, password });
    };
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            ref={emailRef}
            required
            className="rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full sm:text-sm border p-2"
            placeholder="Email address"
          />
          <input
            type="password"
            ref={passwordRef}
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

