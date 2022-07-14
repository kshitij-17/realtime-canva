import React from "react";
import { useSelector,useDispatch } from "react-redux/es/exports";
import { actions } from "../store/textboxStore";

const Toolbox=()=>{

    const initialHeight=useSelector((state)=>state.height)
    const initialWidth=useSelector((state)=>state.width)
    const initialcolor=useSelector(state=>state.B_color)
    const initalStroke=useSelector(state=>state.stroke)
    const current=useSelector(state=>state.canvaVal)
    const dispatch=useDispatch();
    const changeHeight=(val)=>{
        dispatch(actions.setHeight(val))
    }
    const changeWidth=(val)=>{
        dispatch(actions.setWidth(val))
    }

    const changeColor=(val)=>{
        dispatch(actions.setColor(val))
    }
    const changePenColor=(val)=>{
dispatch(actions.setPencolor(val))
    }
    const changeStrokeWidth=(val)=>{
        dispatch(actions.setStroke(val))
    }

    const download=async(current)=>{
        if(!current)
        alert('draw something!')
        const image=current.toDataURL('image/jpg');
        const blob=await(await fetch(image)).blob();
        const blobUrl=URL.createObjectURL(blob);
        const link=document.createElement('a');
        link.href=blobUrl;
        link.download="image.jpg";
        link.click();

    } 
    return (
        <div id="tool1" >
            <label htmlFor="height1">Enter Height:</label>
            <input id="height1" type="number" name="height" value={initialHeight} onChange={(e)=>{changeHeight(e.target.value)}}/><br/>
            <label htmlFor="width1">Enter Width:</label>
            <input id="width1" type="number" name="widht" value={initialWidth} onChange={(e)=>{changeWidth(e.target.value)}}/><br/>
            <label htmlFor="color1">Enter Background Color:</label>
            <input id="color1" type="text" name="color" value={initialcolor} onChange={(e)=>{changeColor(e.target.value)}}/><br/>
            <div style={{margin:5,}}>
                <p>Select The pen color</p>
                <button className="but1" onClick={()=>changePenColor("red")} style={{backgroundColor:"red"}}/>
                <button className="but1" onClick={()=>changePenColor("black")} style={{backgroundColor:"black"}}/>
                <button className="but1" onClick={()=>changePenColor("white")} style={{backgroundColor:"white"}}/>
                <button className="but1" onClick={()=>changePenColor("blue")} style={{backgroundColor:"blue"}}/>
                <button className="but1" onClick={()=>changePenColor("green")} style={{backgroundColor:"green"}}/>
                <button className="but1" onClick={()=>changePenColor("purple")} style={{backgroundColor:"purple"}}/>
                <button className="but1" onClick={()=>changePenColor("gray")} style={{backgroundColor:"gray"}}/>
                <button className="but1" onClick={()=>changePenColor("yellow")} style={{backgroundColor:"yellow"}}/>
                <button className="but1" onClick={()=>changePenColor("pink")} style={{backgroundColor:"pink"}}/>
                <button className="but1" onClick={()=>changePenColor("lightblue")} style={{backgroundColor:"lightblue"}}/>
                <button className="but1" onClick={()=>changePenColor("#67DB78")} style={{backgroundColor:"#67DB78"}}/>
                <button className="but1" onClick={()=>changePenColor("#DB679D")} style={{backgroundColor:"#DB679D"}}/>
                <button className="but1" onClick={()=>changePenColor("#7867DB")} style={{backgroundColor:"#7867DB"}}/>
                <button className="but1" onClick={()=>changePenColor("#099DA9")} style={{backgroundColor:"#099DA9"}}/>
                <button className="but1" onClick={()=>changePenColor("#E56D14")} style={{backgroundColor:"#E56D14"}}/>
                <button className="but1" onClick={()=>changePenColor("#F050EB")} style={{backgroundColor:"#F050EB"}}/>
                <button className="but1" onClick={()=>changePenColor("#570303 ")} style={{backgroundColor:"#570303 "}}/>
                <button className="but1" onClick={()=>changePenColor("magenta")} style={{backgroundColor:"magenta"}}/>
                <button className="but1" onClick={()=>changePenColor("pink")} style={{backgroundColor:"pink"}}/>
                <button className="but1" onClick={()=>changePenColor("#495703")} style={{backgroundColor:"#495703"}}/>
            </div>
            <div style={{marginTop:5,}}>
                <p>Stroke width: 
                <input type="number" value={initalStroke} name="swidth" onChange={(e)=>changeStrokeWidth(e.target.value)} style={{width:"50px",}}/>
                </p>
            </div>
            <button id="button2" onClick={()=>download(current)}>download jpg</button>
        </div>
    )
}

export default Toolbox;