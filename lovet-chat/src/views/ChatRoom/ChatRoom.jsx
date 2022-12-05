import fb from "../../services/firebase"
import React, { useRef, useState } from "react"
import { useEffect } from "react"
import { onSnapshot } from "firebase/firestore"
import { Logout } from "../Auth"
import { UserAuth } from "../../context/AuthContext"
import { useParams } from "react-router-dom"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import {
    Avatar,
    Button,
    IconButton,
    LinearProgress,
    TextField,
    ThemeProvider,
} from "@mui/material"
import { Send, AttachFile } from "@mui/icons-material"
import { buttonTheme } from "../../themes/theme"
import "../../themes/mui-styles.css"
import "./ChatRoom.css"

const ChatRoom = () => {
    const { roomID } = useParams()

    // Message queries from Firebase
    const messagesRef = fb.firestore
        .collection("Rooms")
        .doc(roomID)
        .collection("messages")
    const query = messagesRef.orderBy("timestamp")
    const roomRef = fb.firestore.collection("Rooms").doc(roomID)

    // Chat messages
    const [messages, setMessages] = useState([])
    const [atBottom, setAtBottom] = useState(true)
    const [inputMessageDisabled, setInputMessageDisabled] = useState(false)

    // Send Message
    const sendMessage = (e) => {
        e.preventDefault()

        // Check if message is not empty
        if (formValue.trim().length === 0) {
            return
        }

        // Save message to Firebase
        messagesRef.add({
            text: formValue.trim(),
            uid,
            timestamp: Date.now(),
        })

        // Clear text form field
        setFormValue("")
        setAtBottom(true)
    }

    // Chat Image
    const [selectedImage, setSelectedImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    // Image preview
    useEffect(() => {
        // https://stackoverflow.com/a/57781164
        if (!selectedImage) {
            setImagePreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedImage)
        setImagePreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedImage])

    // Send Image
    const sendImage = (e) => {
        // Check if selected image is not null
        if (selectedImage == null) return

        // Save image to Firebase Storage
        const imageRef = ref(fb.storage, `images/${selectedImage.name + v4()}`)
        uploadBytes(imageRef, selectedImage).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                messagesRef.add({
                    text: url,
                    uid,
                    timestamp: Date.now(),
                })
            })
        })

        // Remove selected image to remove preview
        setSelectedImage(undefined)

        e.preventDefault()

        setAtBottom(true)
    }

    // Timer
    const [hours, setHours] = useState(null)
    const [minutes, setMinutes] = useState(null)
    const [seconds, setSeconds] = useState(null)

    useEffect(() => {
        onSnapshot(query, (snapshot) => {
            setMessages(
                snapshot.docs.map((doc) => {
                    // Convert Firebase Timestamp to JS Date
                    // const data = doc.data()
                    // data.timestamp = new Date(data.timestamp)
                    return { id: doc.id, ...doc.data() }
                })
            )
        })
    }, [])

    const [formValue, setFormValue] = useState("")

    // Get authenticated user ID
    const { user } = UserAuth()
    const uid = user.uid

    const chatTimer = async () => {
        setLoadingState({ isTimerLoading: true })
        await roomRef.get().then((doc) => {
            if (doc.exists) {
                const interval = setInterval(() => {
                    const now = new Date().getTime()

                    const distance =
                        doc.get("endConsultation").seconds * 1000 - now

                    const hoursTimer = Math.floor(
                        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
                    )
                    const minutesTimer = Math.floor(
                        (distance % (60 * 60 * 1000)) / (1000 * 60)
                    )
                    const secondsTimer = Math.floor(
                        (distance % (60 * 1000)) / 1000
                    )

                    if (distance < 0) {
                        clearInterval(interval)
                        setHours("00")
                        setMinutes("00")
                        setSeconds("00")
                        setInputMessageDisabled(true)
                    } else {
                        hoursTimer < 10
                            ? setHours("0" + hoursTimer.toString())
                            : setHours(hoursTimer.toString())

                        minutesTimer < 10
                            ? setMinutes("0" + minutesTimer.toString())
                            : setMinutes(minutesTimer.toString())

                        secondsTimer < 10
                            ? setSeconds("0" + secondsTimer.toString())
                            : setSeconds(secondsTimer.toString())
                    }
                })
            }
            setLoadingState({ isTimerLoading: false })
        })
    }

    useEffect(() => {
        chatTimer()
    }, [])

    // Check URL
    const isValidUrl = (urlString) => {
        try {
            return Boolean(new URL(urlString))
        } catch (e) {
            return false
        }
    }

    // Progress indicator
    const [loadingState, setLoadingState] = useState({
        isTimerLoading: true,
    })

    // Scroll
    const useChatContentScroll = (messages) => {
        const ref = useRef(null)

        useEffect(() => {
            if (ref.current && atBottom === true) {
                ref.current.scrollIntoView({ behavior: "smooth" })
            }
        }, [messages])

        return ref
    }
    const chatContentRef = useChatContentScroll(messages)

    const checkScrollPos = (e) => {
        const bottom =
            e.target.scrollHeight - Math.ceil(e.target.scrollTop) ===
            e.target.clientHeight

        if (bottom) {
            setAtBottom(true)
        } else {
            setAtBottom(false)
        }
    }

    // Avatar
    const [avatarId, setAvatarId] = useState("")

    useEffect(() => {
        setAvatarId(Math.floor(Math.random() * 5000))
    }, [])

    // Date
    const chatDateOptions = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    }

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
                        {hours &&
                            minutes &&
                            seconds &&
                            `${hours}:${minutes}:${seconds}`}
                    </div>
                    {inputMessageDisabled && (
                        <div className="chat_header_right">
                            <Logout />
                        </div>
                    )}
                </div>

                <div className="chat_body" onScroll={checkScrollPos}>
                    {(messages.length === 0 || loadingState.isTimerLoading) && (
                        <LinearProgress />
                    )}
                    {messages.map((message, id) => {
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

                                {isValidUrl(message.text) ? (
                                    // Show image
                                    <div
                                        key={`message_${id}`}
                                        className={`chat_message_image ${
                                            message.uid === uid &&
                                            "chat_message_sender"
                                        }`}
                                    >
                                        <img
                                            className={
                                                "chat_message_image_content"
                                            }
                                            src={message.text}
                                            alt=""
                                            ref={chatContentRef}
                                        />
                                    </div>
                                ) : (
                                    // Show text
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
                                )}
                            </>
                        )
                    })}
                </div>
                <div className="chat_footer">
                    {selectedImage && (
                        <div className="chat_footer_preview">
                            <img
                                className="chat_footer_preview_image"
                                src={imagePreview}
                                alt=""
                            />
                        </div>
                    )}
                    <div className="chat_footer_actions">
                        <div className="chat_footer_left">
                            <ThemeProvider theme={buttonTheme}>
                                <Button
                                    className="icon_button"
                                    startIcon={<AttachFile />}
                                    variant="outlined"
                                    color="secondary"
                                    component="label"
                                    disableElevation
                                    disabled={inputMessageDisabled}
                                >
                                    <form onSubmit={sendImage}>
                                        <input
                                            hidden
                                            accept="image/*"
                                            type="file"
                                            // multiple
                                            onChange={(e) => {
                                                setSelectedImage(
                                                    e.target.files[0]
                                                )
                                            }}
                                        />
                                    </form>
                                </Button>
                            </ThemeProvider>
                        </div>
                        <div className="chat_footer_center">
                            <form onSubmit={sendMessage}>
                                <TextField
                                    id="message_text_field"
                                    className="rounded_outlined_text_field"
                                    variant="outlined"
                                    placeholder={
                                        inputMessageDisabled
                                            ? "Waktu telah habis"
                                            : "Ketik pesan"
                                    }
                                    value={formValue}
                                    onChange={(e) =>
                                        setFormValue(e.target.value)
                                    }
                                    size="small"
                                    fullWidth
                                    autoFocus
                                    disabled={inputMessageDisabled}
                                />
                            </form>
                        </div>
                        <div className="chat_footer_right">
                            <ThemeProvider theme={buttonTheme}>
                                <Button
                                    className="icon_button"
                                    onClick={(e) => {
                                        sendMessage(e)
                                        sendImage(e)
                                    }}
                                    startIcon={<Send />}
                                    variant="contained"
                                    color="secondary"
                                    disableElevation
                                    disabled={inputMessageDisabled}
                                ></Button>
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatRoom
