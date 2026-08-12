import { useState } from 'react'
import {Link, useNavigate} from 'react-router'
import { changeNotebookName, createNB, deleteNotebook, saveCurrNotebook } from '../services/notebooks'
import { useAuth } from '../AuthContext'
import { useCanvas } from '../Canvas/CanvasContext'
import { useNotebooks } from './NotebooksContext'
import { useEffect } from 'react'
import { Icon } from '../Icon'

function NewNotebookModal({close}){
    const navigate = useNavigate()
    const createNewNotebook = async(e)=> {
        e.preventDefault()
        const formData = new FormData(e.target)
        const name = formData.get('name')
        const notebook = await createNB(name)
        
        saveCurrNotebook(notebook) 
        navigate(`/notebooks/${name}`)
    }
    return (
        <>
        <div className="absolute h-full w-full flex justify-center items-center">
            <div className=" bg-(--green) w-150 h-60">
                <form className='w-full h-full flex flex-col items-center 
                    justify-center'
                    onSubmit={createNewNotebook}
                    >
                    <button onClick={close} type='button'>close</button>
                    <label >
                        Notebook name:
                        <input type="text" name="name" id="name"  className='border'/>
                    </label>
                    <button type="submit">create</button>
                </form>
            </div>
        </div>
        </>
    )
}
function Notebook({notebook}){
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
    return(
        <>
        <div className="bg-(--dark-green) w-60 h-40 flex flex-col items-center 
            rounded-2xl  shadow-gray-800 shadow-xl/40 relative">
            <button className='cursor-pointer absolute top-3 right-3' onClick={()=> {setOpenOptions(true)}}>
                <Icon iconName={'three_dots'} style={'w-7 fill-white'}/>
            </button>
            <div onClick={()=> {setOpenOptions(false)}} 
                    className={`${openOptions? 'block': 'hidden'} z-2 fixed inset-0 
                    bg-black/5 transition-opacity` }/>
            {openOptions && 
                <div className="flex gap-2 justify-start z-3 absolute top-10 -right-30
                    bg-(--green) w-40 p-1 h-fit rounded flex-col">
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
                </div>
            }
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
                            className='h-full w-full'
                        >
                        <p className='w-full h-full flex justify-center text-white 
                            font-medium first-letter:uppercase lowercase text-xl 
                            items-center'>
                            {notebook.name}
                        </p>
                    </Link>
                </>
            )
            }
        </div>
        </>
    )
}

export function Notebooks(){
    const [isOpen, setIsOpen]= useState()
    const {user} = useAuth()
    const {userNotebooks, getNotebooks, isLoading} = useNotebooks()
    useEffect(()=> {
        getNotebooks()
    },[user])
    if(isLoading) return <div className="">Loading...</div>
    return (
        <>
        <div className="flex flex-col justify-center items-center 
            p-20 overflow-y-auto h-screen w-full">
            {isOpen && <NewNotebookModal close={()=>{setIsOpen(false)}}/>}
            <div className="flex flex-col justify-center items-center 
                w-full h-full p-20">
                <button onClick={()=> {setIsOpen(true)}}>
                    Add new notebook
                </button>
            </div>
            <div className="h-400 w-full flex flex-wrap justify-start gap-5 
                ">
                {userNotebooks && userNotebooks.map((notebook) => 
                    <Notebook notebook={notebook} key={notebook.name}/>
                )}
            </div>
        </div>
        </>
    )
}