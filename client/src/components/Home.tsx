import { useNavigate } from "react-router-dom";
import { useGlobalStateContext } from "../utils/Context";
import { useEffect, useRef, useState } from "react";

export const Home = () => {
    const navigate = useNavigate();
    const { user } = useGlobalStateContext();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen">
            <NewRoom />
            <RoomList />
        </div>
    );
}

const NewRoom = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = nameRef.current?.value;
        const description = descriptionRef.current?.value;
        const response = await fetch("http://localhost:3000/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, description }),
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-6">New Room</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                <input ref={nameRef} type="text" placeholder="Name" className="border-2 border-black mb-2 p-1" />
                <input ref={descriptionRef} type="text" placeholder="Description (optional)" className="border-2 p-1 border-black mb-2" />
                <button type="submit" className="border-2 p-1 border-black">Submit</button>
            </form>
        </div>
    );

}

const RoomList = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const getRooms = async () => {
            const response = await fetch("http://localhost:3000/rooms");
            const data = await response.json();
            setRooms(data);
        }
        getRooms();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-6">Room List</h1>
            <div className="flex flex-col items-center justify-center">
                {rooms.map((room: {
                    _id: string,
                    name: string,
                    description: string,
                }) => (
                    <div key={room._id} className="flex flex-col items-center justify-center cursor-pointer mb-2 border-4 px-4" onClick={() => navigate(`${room._id}`)}>
                        <div className="flex flex-row items-center justify-center">
                            <p className="text-xl font-bold">{room.name}</p>
                        </div>
                        <p className="text-xl font-bold">{room.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}