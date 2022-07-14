import React from "react";
import { useSelector } from "react-redux";
import useOnDraw from "./customHook";
const Canvas=()=>{
    const height=useSelector((state)=>state.height)
    const width=useSelector((state)=>state.width)
    const Bcolor=useSelector(state=>state.B_color)
    const setCanvasRef=useOnDraw();
    return (
        <>
        
        <canvas id="canva1" height={height} width={width} style={{border:"2px solid white",backgroundColor:Bcolor,marginLeft:200}} ref={setCanvasRef} /> 
        </>
    )
}

export default Canvas;

