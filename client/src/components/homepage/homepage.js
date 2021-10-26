import React from "react"
import "./homepage.css"
import { useHistory } from "react-router-dom"

const Homepage = ({setLoginUser}) => {

    const history = useHistory();

    
    return (
        <div className="homepage">
            <div class="join-container">
                <header class="join-header">
                    <h1>Teams</h1>
                </header>
                <main className="join-main">
                        <div class="form-control">
                            <label for="room">Salas</label>
                            <select name="room" id="room">
                                <option value="JavaScript">JavaScript</option>
                                <option value="Python">Python</option>
                                <option value="PHP">PHP</option>
                                <option value="C#">C#</option>
                                <option value="Ruby">Ruby</option>
                                <option value="Java">Java</option>
                            </select>
                        </div>
                        <button type="submit"  onClick={() => history.push("/chat")} class="btn">Unirse al chat</button>
                </main>
		    </div>
                <div className="button" onClick={() => setLoginUser({})} >Cerrar Sesión</div>
        </div>
    )
}

export default Homepage