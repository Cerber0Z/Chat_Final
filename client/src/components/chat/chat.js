import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import "./chat.css"

function Chat() {
	const [ state, setState ] = useState({ message: "" })
	const [ chat, setChat ] = useState([])

	const socketRef = useRef()

	useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:9002")
			socketRef.current.on("message", ({  message }) => {
				setChat([ ...chat, {  message } ])
			})
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)

    const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const {  message } = state
		socketRef.current.emit("message", {  message })
		e.preventDefault()
		setState({ message: "" })
	}

	const renderChat = () => {
		return chat.map(({  message }, index) => (
			<div key={index}>
				<h3>
					mensaje: <span>{message}</span>
				</h3>
			</div>
		))
	}

	return (
		<div className="card">
			<form onSubmit={onMessageSubmit}>
				<h1>Mensaje</h1>
				<div>
					<TextField
						name="message"
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="Mensaje"
					/>
				</div>
				<button className="btn btn-primary">Enviar Mensaje</button>
			</form>
			<div className="render-chat">
				<h1>Chat</h1>
				{renderChat()}
			</div>
		</div>
	)
}


export default Chat