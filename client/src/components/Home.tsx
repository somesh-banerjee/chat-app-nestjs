import { useNavigate } from "react-router-dom";
import { useGlobalStateContext } from "../utils/Context";
import { useEffect } from "react";

export const Home = () => {
    const navigate = useNavigate();
    const { user } = useGlobalStateContext();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            Home
        </div>
    );

}