import React from 'react'

function Loading() {
    return (
        <div 
            className="modal-backdrop"
            style={{position: "fixed",
                    zIndex: "100",
                    left: "0",
                    top: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.7)"}}>
            <div 
                className="modal-small"
                style={{top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        position: "fixed",
                        backgroundColor: "#fefefe",
                        margin: "auto",
                        border: "1px solid #888",
                        width: "28rem",
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        animationName: "animetop",
                        animationDuration: "0.4s",
                        zIndex: "100"}}>
                <div 
                    className="modal-header"
                    style={{padding: "0.1rem 1rem",
                            backgroundColor: "#4ca1af",
                            color: "#fff"}}>
                    <h1 style={{fontSize: "1.5rem", marginLeft: "135px"}}>Please wait..</h1>
                </div>
                <div 
                    className="modal-body"
                    style={{padding: "1rem",
                            maxHeight: "100vh",
                            maxWidth: "100%",
                            overflowY: "auto",
                            backgroundColor: "#fef3f4",
                            textAlign: "center"}}>
                    <p>Page is loading..</p>
                    {/* <button 
                        type="button"
                        style={{width: "5rem",
                                backgroundColor: "#4calaf",
                                color: "#fff",
                                padding: "0.2rem",
                                margin: "auto",
                                display: "block"}}>
                        Ok
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default Loading