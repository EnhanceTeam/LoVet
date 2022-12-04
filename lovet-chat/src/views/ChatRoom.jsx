import fb from "../services/firebase";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { Logout } from "./Auth";
import { UserAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import {
    Avatar,
    Button,
    IconButton,
    TextField,
    ThemeProvider,
} from "@mui/material";
import { Send, PowerSettingsNew, AttachFile } from "@mui/icons-material";
import { buttonTheme } from "../themes/theme";
import "../themes/mui-styles.css";
import "./ChatRoom.css";

const ChatRoom = () => {
    const { roomID } = useParams();

    // Message queries from Firebase
    const messagesRef = fb.firestore
        .collection("Rooms")
        .doc(roomID)
        .collection("messages");
    const query = messagesRef.orderBy("timestamp");
    const roomRef = fb.firestore.collection("Rooms").doc(roomID);

    // Chat messages
    const [messages, setMessages] = useState([]);
    const [atBottom, setAtBottom] = useState(true);
    const [inputMessageDisabled, setInputMessageDisabled] = useState(false);

    // Send Message
    const sendMessage = (e) => {
        e.preventDefault();

        // Check if message is not empty
        if (formValue.trim().length === 0) {
            return;
        }

        // Save message to Firebase
        messagesRef.add({
            text: formValue.trim(),
            uid,
            timestamp: Date.now(),
        });

        // Clear text form field
        setFormValue("");
        setAtBottom(true);
    };

    // Chat Image
    const [imageUpload, setImageUpload] = useState(null);

    // Send Image
    const sendImage = (e) => {
        if (imageUpload == null) return;
        const imageRef = ref(fb.storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                messagesRef.add({
                    text: url,
                    uid,
                    timestamp: Date.now(),
                });
            });
        });

        e.preventDefault();

        // Check if message is not empty
        if (formValue.trim().length === 0) {
            return;
        }

        // Clear text form field
        setFormValue("");
        setAtBottom(true);
    };

    // Timer
    const [hours, setHours] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(null);

    useEffect(() => {
        onSnapshot(query, (snapshot) => {
            setMessages(
                snapshot.docs.map((doc) => {
                    // Convert Firebase Timestamp to JS Date
                    // const data = doc.data()
                    // data.timestamp = new Date(data.timestamp)
                    return { id: doc.id, ...doc.data() };
                })
            );
        });
    }, []);

    const [formValue, setFormValue] = useState("");

    // Get authenticated user ID and profile picture URL
    const { user } = UserAuth();
    const uid = user.uid;

    const chatTimer = async () => {
        await roomRef.get().then((doc) => {
            if (doc.exists) {
                const interval = setInterval(() => {
                    const now = new Date().getTime();

                    const distance =
                        doc.get("endConsultation").seconds * 1000 - now;

                    const hoursTimer = Math.floor(
                        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
                    );
                    const minutesTimer = Math.floor(
                        (distance % (60 * 60 * 1000)) / (1000 * 60)
                    );
                    const secondsTimer = Math.floor(
                        (distance % (60 * 1000)) / 1000
                    );

                    if (distance < 0) {
                        clearInterval(interval);
                        setHours("00");
                        setMinutes("00");
                        setSeconds("00");
                        setInputMessageDisabled(true);
                    } else {
                        hoursTimer < 10
                            ? setHours("0" + hoursTimer.toString())
                            : setHours(hoursTimer.toString());

                        minutesTimer < 10
                            ? setMinutes("0" + minutesTimer.toString())
                            : setMinutes(minutesTimer.toString());

                        secondsTimer < 10
                            ? setSeconds("0" + secondsTimer.toString())
                            : setSeconds(secondsTimer.toString());
                    }
                });
            }
        });
    };

    useEffect(() => {
        chatTimer();
    }, []);

    const useChatContentScroll = (messages) => {
        const ref = useRef(null);

        useEffect(() => {
            if (ref.current && atBottom === true) {
                ref.current.scrollIntoView({ behavior: "smooth" });
            }
        }, [messages]);

        return ref;
    };

    // Check URL
    const isValidUrl = (urlString) => {
        try {
            return Boolean(new URL(urlString));
        } catch (e) {
            return false;
        }
    };

    // Avatar
    const [avatarId, setAvatarId] = useState("");

    useEffect(() => {
        setAvatarId(Math.floor(Math.random() * 5000));
    }, []);

    // Date
    const chatDateOptions = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    const chatContentRef = useChatContentScroll(messages);

    const checkScrollPos = (e) => {
        const bottom =
            e.target.scrollHeight - Math.ceil(e.target.scrollTop) ===
            e.target.clientHeight;

        if (bottom) {
            setAtBottom(true);
        } else {
            setAtBottom(false);
        }
    };

    return (
        <>
            <div className="chat_main">
                <div className="chat_header">
                    <div className="chat_header_center">
                        <Avatar
                            className="chat_header_profile_picture"
                            src={`https://avatars.dicebear.com/api/human/${avatarId}.svg`}
                        />
                        <p>Dokter Hewan</p>
                    </div>
                    <div>
                        {hours !== null && minutes !== null && seconds !== null
                            ? `${hours}:${minutes}:${seconds}`
                            : "Loading..."}
                    </div>
                    {inputMessageDisabled ? (
                        <>
                            <div className="chat_header_right">
                                <Logout />
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>

                <div className="chat_body" onScroll={checkScrollPos}>
                    {messages.map((message, id) => {
                        if (isValidUrl(message.text)) {
                            return (
                                <>
                                    {
                                        // Always show date on first message
                                        id === 0 ? (
                                            <div
                                                key={`date_${id}`}
                                                className="chat_date"
                                            >
                                                <p className="chat_date_content">
                                                    {new Date(
                                                        message.timestamp
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        chatDateOptions
                                                    )}
                                                </p>
                                            </div>
                                        ) : (
                                            // Show date if message date is different from previous message date
                                            new Date(
                                                messages[id - 1].timestamp
                                            ).toDateString() !==
                                                new Date(
                                                    messages[id].timestamp
                                                ).toDateString() && (
                                                <div
                                                    key={`date_${id}`}
                                                    className="chat_date"
                                                >
                                                    {console.log(messages)}
                                                    <p className="chat_date_content">
                                                        {new Date(
                                                            message.timestamp
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                            chatDateOptions
                                                        )}
                                                    </p>
                                                </div>
                                            )
                                        )
                                    }

                                    <img
                                        className={`chat_image ${
                                            message.uid === uid &&
                                            "chat_image_sender"
                                        }`}
                                        src={message.text}
                                        alt=""
                                        ref={chatContentRef}
                                    />
                                </>
                            );
                        } else {
                            return (
                                <>
                                    {
                                        // Always show date on first message
                                        id === 0 ? (
                                            <div
                                                key={`date_${id}`}
                                                className="chat_date"
                                            >
                                                <p className="chat_date_content">
                                                    {new Date(
                                                        message.timestamp
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        chatDateOptions
                                                    )}
                                                </p>
                                            </div>
                                        ) : (
                                            // Show date if message date is different from previous message date
                                            new Date(
                                                messages[id - 1].timestamp
                                            ).toDateString() !==
                                                new Date(
                                                    messages[id].timestamp
                                                ).toDateString() && (
                                                <div
                                                    key={`date_${id}`}
                                                    className="chat_date"
                                                >
                                                    {console.log(messages)}
                                                    <p className="chat_date_content">
                                                        {new Date(
                                                            message.timestamp
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                            chatDateOptions
                                                        )}
                                                    </p>
                                                </div>
                                            )
                                        )
                                    }

                                    <div
                                        key={`message_${id}`}
                                        className={`chat_message ${
                                            message.uid === uid &&
                                            "chat_message_sender"
                                        }`}
                                    >
                                        <div className="chat_message_content">
                                            <p ref={chatContentRef}>
                                                {" "}
                                                {message.text}{" "}
                                            </p>
                                            <p className="chat_message_timestamp">{`${new Date(
                                                message.timestamp
                                            ).getHours()}:${new Date(
                                                message.timestamp
                                            ).getMinutes()}`}</p>
                                        </div>
                                    </div>
                                </>
                            );
                        }
                    })}
                </div>

                <div className="chat_footer">
                    <div className="chat_footer_left">
                        <IconButton>
                            <label htmlFor="input_image">
                                <form onSubmit={sendImage}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => {
                                            setImageUpload(
                                                event.target.files[0]
                                            );
                                        }}
                                        id="input_image"
                                        style={{
                                            display: "none",
                                        }}
                                    />
                                </form>
                                <AttachFile
                                    style={{
                                        cursor: "pointer",
                                    }}
                                />
                            </label>
                        </IconButton>

                        <Button
                            className="icon_button secondary_button"
                            startIcon={<AttachFile />}
                            variant="contained"
                            color="secondary"
                            disableElevation
                        ></Button>
                    </div>
                    {inputMessageDisabled ? (
                        <>
                            <p className="chat_footer_center">
                                <strong>Waktu telah habis!</strong>
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="chat_footer_center">
                                <TextField
                                    id="message_text_field"
                                    className="rounded_outlined_text_field"
                                    variant="outlined"
                                    placeholder="Ketik pesan"
                                    value={formValue}
                                    onChange={(e) =>
                                        setFormValue(e.target.value)
                                    }
                                    onSubmit={sendMessage}
                                    size="small"
                                    fullWidth
                                    autoFocus
                                />
                            </div>
                            <div className="chat_footer_right">
                                <ThemeProvider theme={buttonTheme}>
                                    <Button
                                        className="icon_button"
                                        onClick={sendMessage}
                                        startIcon={<Send />}
                                        variant="contained"
                                        color="secondary"
                                        disableElevation
                                    ></Button>
                                </ThemeProvider>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ChatRoom;
