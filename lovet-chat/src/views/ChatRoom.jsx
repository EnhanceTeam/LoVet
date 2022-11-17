import fb from "../services/firebase"
import { useState } from "react"
import { useEffect } from "react"
import { onSnapshot } from "firebase/firestore"
import { Logout } from "./Auth"

const ChatRoom = () => {
    const messagesRef = fb.firestore.collection("messages")
    const query = messagesRef.orderBy("createdAt").limit(25)

    const [messages, setMessages] = useState([])

    useEffect(() => {
        onSnapshot(query, (snapshot) => {
            setMessages(
                snapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() }
                })
            )
        })
    }, [])

    const [formValue, setFormValue] = useState("")

    const sendMessage = (e) => {
        e.preventDefault()

        const { uid, photoURL } = fb.auth.currentUser

        messagesRef.add({
            text: formValue,
            createdAt: fb.firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
        })

        setFormValue("")
    }

    return (
        <>
            <div className="flex justify-center my-4 bg-black fixed top-0 left-0 right-0 p-2">
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
                    )
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
            </form>
        </>
    )
}

export default ChatRoom
