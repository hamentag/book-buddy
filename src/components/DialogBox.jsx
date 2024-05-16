export default function DialogBox({msg, setMsg}){    

    return(
        <>
            <div className="dialog-box">
                <div className="dialog-box-main">
                    <p>{msg.msgTxt}</p>
                    <button onClick={()=>{setMsg(null)}}>Close</button>
                    {msg.propo}
                </div>
            </div>
            <div className="overlay" onClick={()=>{setMsg(null)}}></div>
        </>
    )
    }
    