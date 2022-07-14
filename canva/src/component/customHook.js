import {  useRef } from "react"
import { useSelector ,useDispatch} from "react-redux";
import { actions } from "../store/textboxStore";
import io from 'socket.io-client'

const useOnDraw=()=>{
    const canvaRef=useRef(null);
    const dispatch=useDispatch();
    const mousePressed=useRef(false)
    var isDrawing=false
    const MouseMoveListenerRef=useRef(null)
    const MouseDownListenerRef=useRef(null)
    const MouseUpListenerRef=useRef(null)
    const previousRef=useRef(null);
    const ctx=useRef(null);
    var socket=io.connect("http://localhost:3001")
    
    const StrokeColor=useSelector(state=>state.pencolor)
    const StrokeWidth=useSelector(state=>state.stroke)


    function setCanvasRef(ref){
        if(!ref) return;
        if(canvaRef.current)
        {

        canvaRef.current.removeEventListener("mousedown",MouseDownListenerRef.current)
        }
        window.removeEventListener("mouseup",MouseUpListenerRef.current)
        window.removeEventListener("mousemove",MouseMoveListenerRef.current)
        canvaRef.current=ref
        initMouseMoveListener()
        initMouseDownListener();
        initMouseUpListener();
        
     
        
    }
   

    function initMouseDownListener(){
        if(!canvaRef.current) return;
        const mouseDownEventListener=(e)=>{
                mousePressed.current=true;
                // let point=transformCoordinates(e.clientX,e.clientY)
                // socket.emit("down",point);
                
        }
        MouseDownListenerRef.current=mouseDownEventListener;
        canvaRef.current.addEventListener("mousedown",mouseDownEventListener);
    }

    function initMouseUpListener(){
        if(!canvaRef.current) return;
        const mouseUpEventListener=()=>{
            dispatch(actions.setCanva(canvaRef.current));
           
                mousePressed.current=false; 
                previousRef.current=null;
        }
        
        MouseUpListenerRef.current=mouseUpEventListener
        window.addEventListener("mouseup",mouseUpEventListener)
         
    }

    socket.on("isDraw",(data)=>{
        if(canvaRef.current)
        {
        ctx.current=canvaRef.current.getContext('2d');;
        drawLine(data[0],data[1],data[2],data[3])
        }
        // ctx.current.lineTo(data[1].x,data[1].y);
        // ctx.current.stroke();

    })
    // socket.on("onDown",(data)=>{
    //     drawLine(data[0],data[1],data[2],data[3])
    // })

   

    function initMouseMoveListener(){
        const mouseMoveEventListener=(e)=>{
            if(mousePressed.current)
            {
            const Point=transformCoordinates(e.clientX,e.clientY)
            ctx.current=canvaRef.current.getContext('2d');
            socket.emit("draw",[previousRef.current,Point,StrokeColor,StrokeWidth])
            onDraw(Point,previousRef.current);
            previousRef.current=Point
            
            
           }
    }
    MouseMoveListenerRef.current=mouseMoveEventListener;
        window.addEventListener("mousemove",mouseMoveEventListener)
    }

    

    function onDraw(Point,previousRef){
        
        drawLine(previousRef,Point,StrokeColor,StrokeWidth)

    }

    function drawLine(start,end,color,width){
        
            if(!start)
            start=end
            ctx.current.beginPath();
            ctx.current.lineWidth=width;
            ctx.current.strokeStyle=color;
            ctx.current.moveTo(start.x,start.y);
            ctx.current.lineTo(end.x,end.y);
            ctx.current.stroke();
            ctx.current.fillStyle=color;
            ctx.current.beginPath();
            ctx.current.arc(end.x,end.y,width/2,0,2*Math.PI)
            ctx.current.fill();
            isDrawing=false;
      
        
    }

    function transformCoordinates(clientX,clientY){
        if(canvaRef.current)
        {
            const rectangularPoints=canvaRef.current.getBoundingClientRect();
            return {
                x:clientX-rectangularPoints.left,
                y:clientY-rectangularPoints.top,
            }
        }
        else
        return null;

    }
    return setCanvasRef
}

export default useOnDraw;