import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons";

const navigation = ({ toggleNav ,setToggleNav }) => {
    return (
        <nav className="nav">
            <h1>Waves</h1>
            <button className="lib-music" onClick={() => setToggleNav(!toggleNav)}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    );
}
 
export default navigation;