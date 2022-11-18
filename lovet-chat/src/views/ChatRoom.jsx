import fb from "../services/firebase";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { Logout } from "./Auth";
import { Avatar, IconButton } from "@mui/material";
import {
    InsertEmoticon,
    Send,
    PowerSettingsNew,
    SearchOutlined,
} from "@mui/icons-material";
import "./ChatRoom.css";

const ChatRoom = () => {
    // Message queries from Firebase
    const messagesRef = fb.firestore.collection("messages");
    const query = messagesRef.orderBy("createdAt").limitToLast(25);

    // Chat messages
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        onSnapshot(query, (snapshot) => {
            setMessages(
                snapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                })
            );
        });
    }, []);

    const [formValue, setFormValue] = useState("");

    // Get authenticated user ID and profile picture URL
    const { uid, photoURL } = fb.auth.currentUser;

    const sendMessage = (e) => {
        e.preventDefault();

        // Check if message is not empty
        if (formValue.trim().length === 0) {
            return;
        }

        // Save message to Firebase
        messagesRef
            .add({
                text: formValue.trim(),
                createdAt: fb.firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL,
            })
            .finally(() => {});

        // Clear text form field
        setFormValue("");

        // Scroll to bottom
        const chatBody = document.getElementById("chat_body");
        chatBody.scrollIntoView({ block: "end" });
    };

    const chatBody = useRef([]);
    const scrollToBottom = () => {
        // Scroll to bottom
        chatBody.current.scrollIntoView({ behavior: "smooth", block: "end" });
    };

    // Avatar
    const [avatarId, setAvatarId] = useState("");

    useEffect(() => {
        setAvatarId(Math.floor(Math.random() * 5000));
    }, []);

    return (
        <>
            <div className="chat_main">
                <div className="chat_header">
                    <div className="chat_header_center">
                        <Avatar
                            src={`https://avatars.dicebear.com/api/human/${avatarId}.svg`}
                        />
                        <h3>Dokter Hewan</h3>
                    </div>
                    <div className="chat_header_right">
                        <IconButton onClick={Logout}>
                            <PowerSettingsNew />
                        </IconButton>
                    </div>
                </div>
                <div ref={chatBody} className="chat_body">
                    {messages.map((message, id) => {
                        return (
                            <div
                                key={id}
                                className={`chat_message ${
                                    message.uid === uid
                                        && "chat_message_receiver"
                                }`}
                            >
                                <div className="chat_message_content">
                                    {/* <img
                                        src={message.photoURL}
                                        className="chat_message_profile_picture"
                                    /> */}
                                    <p> {message.text} </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="chat_footer">
                    <div className="chat_footer_center">
                        <form onSubmit={sendMessage}>
                            <input
                                type="text"
                                placeholder="Ketik pesan"
                                value={formValue}
                                onChange={(e) => setFormValue(e.target.value)}
                            />
                        </form>
                    </div>
                    <div className="chat_footer_right">
                        <IconButton className="button_send" onClick={sendMessage}>
                            <Send />
                        </IconButton>
                        {/* <IconButton onClick={scrollToBottom}>
                            <InsertEmoticon />
                        </IconButton> */}
                    </div>
                </div>
            </div>

            {/* <div className="flex justify-center my-4 bg-black fixed top-0 left-0 right-0 p-2">
                <Logout />
                <h1 className="text-3xl text-white">LoVet</h1>
            </div>

            <div className="py-14">
                {messages.map((message, id) => {
                    return (
                        <div
                            key={id}
                            className="flex my-5 justify-end w-full pr-5 "
                        >
                            <div className="flex flex-col">
                                <img src={message.photoURL} />
                                <p> {message.text} </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <form
                onSubmit={sendMessage}
                className="flex justify-center mb-8 fixed bottom-0 left-0 right-0 h-2/12"
            >
                <input
                    value={formValue}
                    className="border-black rounded-2xl border-2 p-2 bg-white focus:outline-none "
                    onChange={(e) => setFormValue(e.target.value)}
                />

                <button
                    type="submit"
                    className="transition ml-3 bg-black rounded-xl border-black border-2 text-white hover:bg-white hover:text-black hover:rounded-md p-2"
                >
                    Send
                </button>
            </form> */}
        </>
    );
};

export default ChatRoom;
