import React from "react";
import "./mainContainer.css"

const MainContainer = ({children}) => {
    return (
        <div className="main">
            {children}
        </div>
    )
}

export default MainContainer;