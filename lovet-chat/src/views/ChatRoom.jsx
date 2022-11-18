import fb from "../services/firebase";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { Logout } from "./Auth";
import { Avatar, IconButton } from "@mui/material";
import { Send, PowerSettingsNew } from "@mui/icons-material";
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
                    // Convert Firebase Timestamp to JS Date
                    const data = doc.data();
                    data.createdAt = new Date(
                        data.createdAt.seconds * 1000
                    );
                    return { id: doc.id, ...data };
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
                                    message.uid === uid &&
                                    "chat_message_receiver"
                                }`}
                            >
                                <div className="chat_message_content">
                                    {/* <img
                                        src={message.photoURL}
                                        className="chat_message_profile_picture"
                                    /> */}
                                    <p> {message.text} </p>
                                    <p className="chat_message_timestamp">{`${message.createdAt.getHours()}:${message.createdAt.getMinutes()}`}</p>
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
                        <IconButton onClick={sendMessage}>
                            <Send />
                        </IconButton>
                        {/* <IconButton onClick={scrollToBottom}>
                            <InsertEmoticon />
                        </IconButton> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatRoom;
