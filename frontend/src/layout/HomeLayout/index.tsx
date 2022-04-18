import React from "react"
import Header from "./Header"

// ----------------------------------------------------------------------

const HomeLayout: React.FC = ({ children }) => {
    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    )
}

export default HomeLayout
