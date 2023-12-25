import { useEffect, useRef, useState } from "react"
import { useGlobalStateContext } from "../utils/Context";

export const Chat = () => {

    const { socket } = useGlobalStateContext();
    
    const [room, setRoom] = useState<{
        _id?: string | undefined,
        name?: string | undefined,
        description?: string | undefined,
        messages?: {
            _id: string,
            message: string,
            user: string,
            date: Date,
        }[] | undefined,
    }>();

    useEffect(() => {
        socket?.on("message", (message: {
            _id: string,
            message: string,
            user: string,
            date: Date,
        }) => {
            console.log('message from server', message)
            setRoom((prev) => {
                return {
                    ...prev,
                    messages: [...prev!.messages!, message],
                }
            })

            // remove duplicate messages
            setRoom((prev) => {
                return {
                    ...prev,
                    messages: prev!.messages!.filter((msg, index, self) => {
                        return self.findIndex((m) => m && m._id === msg._id) === index;
                    })
                }
            })

        })
    }, [socket, room]);

    

    useEffect(() => {
        const roomId = window.location.pathname.split("/")[2];

        const getChat= async () => {
            const response = await fetch("http://localhost:3000/rooms/" + roomId);
            const data = await response.json();
            setRoom(data);
        }
        getChat();
    }, []);

    console.log(room)

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-6">{room?.name}</h1>
            <div className="flex flex-col items-center justify-center">
                {room?.messages?.map((message: {
                    _id: string,
                    message: string,
                    user: string,
                    date: Date,
                }) => (
                    <div key={message._id} className="border-2 border-black p-2 mb-2">
                        <p>{message.message}</p>
                        <p>{message.user || " "}</p>
                        <p>{String(message.date)}</p>
                    </div>
                ))}
            </div>
            <NewMessage />
        </div>
    );
}

const NewMessage = () => {
    
    const { socket } = useGlobalStateContext();
    const messageRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const message = messageRef.current?.value;
        const roomId = window.location.pathname.split("/")[2];
        // use socket.io to send message to server
        socket?.emit("message", {
            message,
            roomId,
        });

        messageRef.current!.value = "";
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-6">New Message</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                <input ref={messageRef} type="text" placeholder="Message" className="border-2 border-black mb-2 p-1" />
                <button type="submit" className="border-2 p-1 border-black">Submit</button>
            </form>
        </div>
    );
}