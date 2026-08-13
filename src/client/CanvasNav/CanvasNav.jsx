import { BrushResize } from "./BrushResize";
import { useCanvas } from "../Canvas/CanvasContext";
import { ColorChanger } from "./ColorChanger";
import { Button } from "./Buttons";
import { Link } from "react-router";
import { Setting } from "./Settings";
import { Options } from "./Options";
import { Nav } from "../Nav";


export function CanvasNav(){
    return (
        <>
        <Nav>
            <Button type={'draw'}/>
            <Button type={'select'}/>
            <Button type={'erase'}/>
            <Button type={'delete'}/>
            <Button type={'undo'}/>
            <Button type={'redo'}/>
            <Button type={'rect'}/>
            <Button type={'circle'}/>
            <Button type={'plane'}/>
            <ColorChanger />
            <BrushResize />
            <Options/>
            <Setting />

        </Nav>
        </>
    )
}