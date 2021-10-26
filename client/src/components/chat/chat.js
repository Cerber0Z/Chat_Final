import React from "react"
import "./chat.css"
import { useHistory } from "react-router-dom"

const Chat = ({setLoginUser}) => {

    const history = useHistory()

    return (
        <div class="chat-container">
            <header class="chat-header">
                <h1><i class="fas fa-smile"></i> Chat</h1>
                <div id="leave-btn"  onClick={() => history.push("/")}  class="btn">Salir de la sala</div>
            </header>
            <main class="chat-main">
                <div class="chat-sidebar">
                <h3><i class="fas fa-comments"></i> Nombre de la sala:</h3>
                <h2 id="room-name"></h2>
                <h3><i class="fas fa-users"></i> Usuarios</h3>
                <ul id="users"></ul>
                </div>
                <div class="chat-messages"></div>
            </main>
            <div class="chat-form-container">
                <form id="chat-form">
                <input id="msg" type="text" placeholder="Ingrese Mensaje" required autocomplete="off" />
                <button class="btn">Enviar</button>
                </form>
            </div>
        </div>
    )
}

export default Chat