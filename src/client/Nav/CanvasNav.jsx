import { BrushResize } from "./BrushResize";
import { useCanvas } from "../Canvas/CanvasContext";
import { ColorChanger } from "./ColorChanger";
import { Button } from "./Buttons";
import { ImportPDF } from "./ImportPDF";
import { SaveButton } from "./SaveButton";
import { useAuth } from "../AuthContext";
import { Link } from "react-router";


export function CanvasNav(){
    const {user, logoutUser} = useAuth()
    return (
        <>
        <nav className="bg-(--green) p-3 flex justify-between">
            <Link to={'/notebooks'} className="text-white font-medium text-2xl">
                Notebook
            </Link>
            <div className="flex gap-2">
                <SaveButton/>
                <ImportPDF/>
                <Button type={'select'}/>
                <Button type={'delete'}/>
                <Button type={'draw'}/>
                <Button type={'undo'}/>
                <Button type={'redo'}/>
                <ColorChanger />
                <BrushResize />
                {user && <button onClick={logoutUser}>logout</button>}
                
            </div>
        </nav> 
        </>
    )
}