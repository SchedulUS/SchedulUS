import {useState} from "react";
import {getKeyCloakObj} from "../utils/keycloakUtils.ts";

function Fuck_qui()
{
    let obj = getKeyCloakObj();
    const [texte,setTexte] = useState("");
    return(
        <>
            <div>
                <button onClick={() => setTexte("FUCK " + obj.tokenParsed.given_name)}>Fuck qui ?</button>
                <button onClick={() => setTexte("SALUT " + obj.tokenParsed.given_name)}>Salut qui ?</button>
                <span>{texte}</span>
            </div>
        </>
    )
}

export default Fuck_qui