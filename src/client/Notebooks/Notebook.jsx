import { useState } from "react"
import { useNotebooks } from "./NotebooksContext"
import { changeNotebookName, deleteNotebook, saveCurrNotebook } from "../services/notebooks"
import { Icon } from "../Icon"
import { Dropdown } from "../Dropdown"
import { Link } from "react-router"

export function Notebook({notebook}){
    const [isEdit, setIsEdit]= useState(false)
    const [newName, setNewName]= useState(notebook.name)
    const [openOptions, setOpenOptions]= useState(false)
    const {getNotebooks} = useNotebooks()
    const updateNotebook = ()=> {
        saveCurrNotebook(notebook) 
    }
    const delNotebook = async()=> {
        setOpenOptions(false)
        await deleteNotebook(notebook.id)
        getNotebooks()
    }
    const edit = async()=> {
        setIsEdit(false)
        await changeNotebookName(notebook.id, newName)
        setNewName(notebook.name)
        getNotebooks()
    }
    const textSize = notebook.name.length > 30 ? 'text-xs' : (
        notebook.name.length > 20 ? 'text-sm':(
            notebook.name.length > 10 ? 'text-base' : 'text-xl'
        )
    )
    return(
        <>
        <div className="bg-(--dark-green) w-45 h-60 flex flex-col items-center 
            rounded-2xl  border-l-17 border-[#381807]  shadow-gray-800 shadow-xl/40 relative">
            <button className='cursor-pointer absolute top-3 right-3 w-fit h-fit rounded-4xl
             hover:bg-(--green) p-1' 
                onClick={()=> {setOpenOptions(true)}}>
                <Icon iconName={'three_dots'} style={'w-7 fill-white'}/>
            </button>
            <Dropdown isOpen={openOptions} close={()=> {setOpenOptions(false)} }
                    position={'top-10 -right-30'}>
                <button onClick={()=> {
                        setIsEdit(prev => !prev)
                        setOpenOptions(false)
                    }} 
                    className='cursor-pointer w-full bg-transparent flex 
                    font-medium text-white hover:bg-(--dark-green) py-1 px-2 justify-start gap-2 items-center'>
                        <Icon iconName={'edit'} style={'fill-white w-6'}/>
                        Edit title
                </button>
                <button onClick={delNotebook} 
                    className='cursor-pointer w-full bg-transparent flex 
                    font-medium text-white hover:bg-(--dark-green) py-1 px-2 justify-start gap-2 items-center'>
                        <Icon iconName={'delete_notebook'} style={'fill-white w-6'}/>
                        Delete
                </button>
            </Dropdown>
            {isEdit ? (
                <>
                <div className="h-full w-full">
                    <input type="text" value={newName} 
                        onChange={(e)=> {setNewName(e.target.value)}}
                        className='border w-full'/>
                    <button onClick={edit}>Save</button>
                </div>
                </>
            ) : (
                <>
                    <Link onClick={()=>{updateNotebook(notebook)}}
                            to={`/notebooks/${notebook.name}`} 
                            className='h-full w-full flex justify-center '
                        >
                        <p className={`min-w-20 max-w-30 min-h-12 h-fit max-h-18 
                            text-black mt-10 rounded flex items-center justify-center
                            font-medium bg-[#fffae7] py-2 ${textSize} text-center
                            `}>
                            {notebook.name}
                        </p>
                        <div className="bg-[#fcf9f1] w-45 h-8 absolute bottom-1 
                            right-0 rounded-l-3xl rounded-r shadow-(--shadow)
                            border-l-6 border-[#381807]">
                            <hr className='mt-2 w-43 ml-1 text-[#c4c1b1]' />
                            <hr className='mt-1 w-43 ml-1 text-[#c4c1b1]' />
                            <hr className='mt-1 w-43 ml-1 text-[#c4c1b1]' />
                            <hr className='mt-1 w-43 ml-1 text-[#c4c1b1]' />
                            <hr className='mt-1 w-43 ml-1 text-[#c4c1b1]' />
                        </div>
                    </Link>
                </>
            )
            }
        </div>
        </>
    )
}