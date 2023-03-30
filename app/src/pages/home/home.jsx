import React from "react";
const {remote} = require('electron');
// const mainProcess = remote.require('../../../electron/main.js')

function Home() {
    const openFile = () => {
        alert('hi there')
        // mainProcess.uploadTextFile();
    }
    return (
        <>
            <h2>Hello, welcome to Nota </h2>
            <button onClick={openFile}>Upload My Clippings File</button>
        </>
    )
}

export default Home;