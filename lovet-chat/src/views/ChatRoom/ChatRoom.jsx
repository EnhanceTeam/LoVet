import fb from "../../services/firebase"
import React, { useRef, useState } from "react"
import { useEffect } from "react"
import { onSnapshot } from "firebase/firestore"
import { Logout } from "../Auth/Auth"
import { UserAuth } from "../../context/AuthContext"
import { useParams } from "react-router-dom"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import {
    Alert,
    Avatar,
    Button,
    LinearProgress,
    Snackbar,
    TextField,
    ThemeProvider,
} from "@mui/material"
import { SendRounded, AttachFileRounded } from "@mui/icons-material"
import { buttonTheme } from "../../themes/theme"

const ChatRoom = () => {
    const { roomID } = useParams()

    // Get authenticated user ID
    const { user } = UserAuth()
    const uid = user.uid

    // Message queries from Firebase
    const messagesRef = fb.firestore
        .collection("Rooms")
        .doc(roomID)
        .collection("messages")
    const query = messagesRef.orderBy("timestamp")
    const roomRef = fb.firestore.collection("Rooms").doc(roomID)

    // Chat messages
    const [messages, setMessages] = useState([])
    const [formValue, setFormValue] = useState("")
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
    const [timerSnackbar, setTimerSnackbar] = useState("")
    const [timerSnackbarState, setTimeSnackbarState] = useState({
        tenMinutes: false,
        fiveMinutes: false,
        twoMinutes: false,
        oneMinutes: false,
    })

    useEffect(() => {
        onSnapshot(query, (snapshot) => {
            setMessages(
                snapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() }
                })
            )
        })
    }, [])

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
                        // Set timer snackbar
                        if (
                            minutesTimer < 11 &&
                            secondsTimer < 1 &&
                            !timerSnackbarState.tenMinutes
                        ) {
                            // 10 minutes
                            setTimerSnackbar(minutesTimer)
                            setSnackbarState(true)
                            timerSnackbarState.tenMinutes = true
                        } else if (
                            minutesTimer < 6 &&
                            secondsTimer < 1 &&
                            !timerSnackbarState.fiveMinutes
                        ) {
                            // 5 minutes
                            setTimerSnackbar(minutesTimer)
                            setSnackbarState(true)
                            timerSnackbarState.fiveMinutes = true
                        } else if (
                            minutesTimer < 3 &&
                            secondsTimer < 1 &&
                            !timerSnackbarState.twoMinutes
                        ) {
                            // 2 minutes
                            setTimerSnackbar(minutesTimer)
                            setSnackbarState(true)
                            timerSnackbarState.twoMinutes = true
                        } else if (
                            minutesTimer < 2 &&
                            secondsTimer < 1 &&
                            !timerSnackbarState.oneMinutes
                        ) {
                            // 1 minute
                            setTimerSnackbar(minutesTimer)
                            setSnackbarState(true)
                            timerSnackbarState.oneMinutes = true
                        }
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
    const firebaseHostName = "firebasestorage.googleapis.com"
    const isValidUrl = (urlString) => {
        try {
            const url = new URL(urlString)
            return url.hostname === firebaseHostName
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

    // Snackbar
    const [snackbarState, setSnackbarState] = useState(false)
    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return
        }

        setSnackbarState(false)
    }

    // Date
    const chatDateOptions = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackbarState}
                autoHideDuration={10000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    variant="filled"
                    severity="warning"
                    sx={{ width: "100%" }}
                >
                    Waktu tersisa {timerSnackbar} menit
                </Alert>
            </Snackbar>
            <div className="flex flex-col h-screen">
                <div className="flex flex-row justify-center items-center gap-x-2 px-4 py-2 bg-primary-container drop-shadow">
                    <div className="flex flex-auto flex-row justify-start items-center gap-x-4">
                        <Avatar
                            className="!w-10 !h-10 p-2 bg-white"
                            src={`https://avatars.dicebear.com/api/human/${avatarId}.svg`}
                        />
                        <p className="font-bold">Dokter Hewan</p>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-x-4">
                        <p>
                            {hours &&
                                minutes &&
                                seconds &&
                                `Sisa waktu konsultasi - ${hours}:${minutes}:${seconds}`}
                        </p>
                        {inputMessageDisabled && <Logout />}
                    </div>
                </div>

                <div className="flex flex-auto flex-col overflow-y-auto bg-background" onScroll={checkScrollPos}>
                    {loadingState.isTimerLoading && <LinearProgress />}
                    {messages.map((message, id) => {
                        return (
                            <>
                                {
                                    // Always show date on first message
                                    id === 0 ? (
                                        <div
                                            key={`date_${id}`}
                                            className="flex self-center rounded-2xl w-fit px-4 py-2 m-2 bg-slate-200"
                                        >
                                            <p className="text-xs">
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
                                                className="flex self-center rounded-2xl w-fit px-4 py-2 m-2 bg-slate-200"
                                            >
                                                <p className="text-xs">
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
                                        className={`rounded-2xl w-fit p-4 m-2 bg-surface-variant ${
                                            message.uid === uid &&
                                            "ml-auto bg-tertiary-container"
                                        }`}
                                    >
                                        <div className="flex flex-row justify-center items-center gap-x-2">
                                            <img
                                                className="max-h-48 rounded-lg"
                                                src={message.text}
                                                alt=""
                                                ref={chatContentRef}
                                            />
                                            <p className="self-end text-xs text-slate-600">{`${new Date(
                                                message.timestamp
                                            ).getHours()}:${new Date(
                                                message.timestamp
                                            ).getMinutes()}`}</p>
                                        </div>
                                    </div>
                                ) : (
                                    // Show text
                                    <div
                                        key={`message_${id}`}
                                        className={`flex rounded-2xl w-fit max-w-full-x-24 px-4 py-2 m-2 bg-surface-variant ${
                                            message.uid === uid &&
                                            "ml-auto bg-tertiary-container"
                                        }`}
                                    >
                                        <div className="flex flex-row justify-center items-center gap-x-2">
                                            <p ref={chatContentRef} className="break-words-link">
                                                {" "}
                                                {message.text}{" "}
                                            </p>
                                            <p className="self-end text-xs text-slate-600">{`${new Date(
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
                <div className="flex flex-col justify-center items-center gap-y-2 px-4 py-2 bg-surface shadow-reverse">
                    {selectedImage && (
                        <div className="flex flex-row justify-center items-center max-h-24">
                            <img
                                className="w-24 h-24 object-cover rounded-lg"
                                src={imagePreview}
                                alt=""
                            />
                        </div>
                    )}
                    <div className="flex flex-row justify-center items-center gap-x-2 w-full">
                        <div className="flex flex-row justify-center items-center gap-y-2">
                            <ThemeProvider theme={buttonTheme}>
                                <Button
                                    className="icon-button"
                                    startIcon={<AttachFileRounded />}
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
                        <div className="flex flex-auto flex-row justify-center items-center gap-x-2">
                            <form onSubmit={sendMessage} className="flex flex-auto">
                                <TextField
                                    className="rounded-outlined-text-field"
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
                        <div className="flex flex-row justify-center items-center gap-x-2">
                            <ThemeProvider theme={buttonTheme}>
                                <Button
                                    className="icon-button"
                                    onClick={(e) => {
                                        sendMessage(e)
                                        sendImage(e)
                                    }}
                                    startIcon={<SendRounded />}
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
