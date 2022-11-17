import fb from "../services/firebase"

const Login = () => {
    const signInWithPopup = () => {
        const provider = new fb.firebase.auth.GoogleAuthProvider()
        fb.auth.signInWithPopup(provider)
    }

    return <button onClick={signInWithPopup}>Login with Google</button>
}

const Logout = () => {
    return (
        fb.auth.currentUser && (
            <div>
                <button onClick={() => fb.auth.signOut()}>Logout</button>
            </div>
        )
    )
}

export { Login, Logout }
