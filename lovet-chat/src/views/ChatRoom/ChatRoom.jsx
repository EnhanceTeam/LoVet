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
    Chip,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    LinearProgress,
    Rating,
    Snackbar,
    TextField,
    ThemeProvider,
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
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
    const [isVet, setIsVet] = useState(false)
    const [username, setUsername] = useState("")
    const [profilePicture, setProfilePicture] = useState("")

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

    const checkIsVet = () => {
        fb.firestore
            .collection("Veterinarian")
            .get()
            .then((docs) => {
                const vet = docs.docs.filter((vet) => {
                    return vet.get("email") === user.email
                })
                console.log(vet.length)
                if (vet.length > 0) {
                    setIsVet(true)
                } else {
                    setIsVet(false)
                }
            })
    }

    useEffect(() => {
        checkIsVet()
    }, [])

    useEffect(() => {
        getUserData()
    }, [isVet])

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
                        fb.firestore
                            .collection("Ratings")
                            .doc(roomID)
                            .get()
                            .then((doc) => {
                                if (!doc.exists) {
                                    handleRatingModalOpen()
                                }
                            })
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

    const getUserData = () => {
        roomRef.get().then((doc) => {
            if (isVet) {
                setUsername(doc.get("guestName"))
                setProfilePicture(doc.get("guestProfilePicture"))
            } else {
                setUsername(doc.get("vetName"))
                setProfilePicture(doc.get("vetProfilePicture"))
            }
        })
    }

    // Rating
    // Modal
    const [ratingModalState, setRatingModalState] = useState(false)
    const handleRatingModalOpen = () => setRatingModalState(true)
    const handleRatingModalClose = () => setRatingModalState(false)
    // Send
    const [ratingSendLoadingState, setRatingSendLoadingState] = useState(false)
    const handleRatingSend = () => {
        setRatingSendLoadingState(true)
        const tags = []

        if (ratingChipDoctorResponseState) {
            tags.push(ratingChipDoctorResponseValue)
        }
        if (ratingChipWebsiteFunctionalityState) {
            tags.push(ratingChipWebsiteFunctionalityValue)
        }
        if (ratingChipWebsiteEaseOfUseState) {
            tags.push(ratingChipWebsiteEaseOfUseValue)
        }

        fb.firestore
            .collection("Ratings")
            .doc(roomID)
            .set({
                rating: rating,
                tags: tags,
                message: ratingMessage,
            })
            .then(() => {
                setRatingSendLoadingState(false)
                handleRatingModalClose()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    // Star
    const [rating, setRating] = useState(0)
    // Message
    const [ratingMessage, setRatingMessage] = useState("")
    // Chip
    const ratingChipWebsiteFunctionalityValue = "Fungsionalitas Website"
    const [
        ratingChipWebsiteFunctionalityState,
        setRatingChipWesbiteFunctionalityState,
    ] = useState(false)
    const handleRatingChipWebsiteFunctionalityClick = () =>
        setRatingChipWesbiteFunctionalityState(
            !ratingChipWebsiteFunctionalityState
        )
    const ratingChipWebsiteEaseOfUseValue = "Kemudahan Penggunaan Website"
    const [
        ratingChipWebsiteEaseOfUseState,
        setRatingChipWesbiteEaseOfUseState,
    ] = useState(false)
    const handleRatingChipWebsiteEaseOfUseClick = () =>
        setRatingChipWesbiteEaseOfUseState(!ratingChipWebsiteEaseOfUseState)
    const ratingChipDoctorResponseValue = "Respon Dokter"
    const [
        ratingChipDoctorResponseState,
        setRatingChipWesbiteDoctorResponseState,
    ] = useState(false)
    const handleRatingChipWebsiteDoctorResponseClick = () =>
        setRatingChipWesbiteDoctorResponseState(!ratingChipDoctorResponseState)

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
            <Dialog open={ratingModalState}>
                <DialogTitle>Bagaimana pengalaman chatting Anda?</DialogTitle>
                <DialogContent>
                    <div className="flex flex-col items-center">
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newRating) => {
                                setRating(newRating)
                            }}
                            size="large"
                        />
                    </div>

                    {rating !== 0 && (
                        <div className="flex flex-col gap-y-4 pt-6">
                            <div>
                                <DialogContentText>
                                    {rating > 3
                                        ? "Pelayanan apa yang menurut Anda baik?"
                                        : "Pelayanan apa yang menurut Anda kurang baik?"}
                                </DialogContentText>
                                <div className="flex flex-row gap-x-2">
                                    <Chip
                                        label={ratingChipDoctorResponseValue}
                                        color={
                                            ratingChipDoctorResponseState
                                                ? "primary"
                                                : "default"
                                        }
                                        variant={
                                            ratingChipDoctorResponseState
                                                ? ""
                                                : "outlined"
                                        }
                                        onClick={
                                            handleRatingChipWebsiteDoctorResponseClick
                                        }
                                    />
                                    <Chip
                                        label={
                                            ratingChipWebsiteFunctionalityValue
                                        }
                                        color={
                                            ratingChipWebsiteFunctionalityState
                                                ? "primary"
                                                : "default"
                                        }
                                        variant={
                                            ratingChipWebsiteFunctionalityState
                                                ? ""
                                                : "outlined"
                                        }
                                        onClick={
                                            handleRatingChipWebsiteFunctionalityClick
                                        }
                                    />
                                    <Chip
                                        label={ratingChipWebsiteEaseOfUseValue}
                                        color={
                                            ratingChipWebsiteEaseOfUseState
                                                ? "primary"
                                                : "default"
                                        }
                                        variant={
                                            ratingChipWebsiteEaseOfUseState
                                                ? ""
                                                : "outlined"
                                        }
                                        onClick={
                                            handleRatingChipWebsiteEaseOfUseClick
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <DialogContentText>
                                    Apa yang bisa kami lakukan untuk
                                    meningkatkan layanan?
                                </DialogContentText>
                                <TextField
                                    id="rating-feedback"
                                    placeholder="Ceritakan pengalamanmu di sini"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    value={ratingMessage}
                                    onChange={(e) =>
                                        setRatingMessage(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    {rating !== 0 && (
                        <LoadingButton
                            onClick={handleRatingSend}
                            variant="contained"
                            loading={ratingSendLoadingState}
                        >
                            Kirim
                        </LoadingButton>
                    )}
                </DialogActions>
            </Dialog>
            <div className="flex flex-col h-screen">
                <div className="flex flex-row justify-center items-center gap-x-2 px-4 py-2 bg-primary-container drop-shadow">
                    <div className="flex flex-auto flex-row justify-start items-center gap-x-4">
                        <Avatar className="bg-white" src={profilePicture} />
                        <p className="font-bold">
                            {username ? username : "Unknown"}
                        </p>
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

                <div
                    className="flex flex-auto flex-col overflow-y-auto bg-background"
                    onScroll={checkScrollPos}
                >
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
                                            <p
                                                ref={chatContentRef}
                                                className="break-words-link"
                                            >
                                                {message.text}
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
                            <form
                                onSubmit={sendMessage}
                                className="flex flex-auto"
                            >
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
