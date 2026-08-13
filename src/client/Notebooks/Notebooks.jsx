import { useState } from 'react'
import {Link, useNavigate} from 'react-router'
import { changeNotebookName, createNB, deleteNotebook, saveCurrNotebook } from '../services/notebooks'
import { useAuth } from '../AuthContext'
import { useNotebooks } from './NotebooksContext'
import { useEffect } from 'react'
import { Icon } from '../Icon'
import { Dropdown } from '../Dropdown'
import { Nav } from '../Nav'

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
        <div className="absolute h-full w-full flex justify-center items-center z-2">
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
                            font-medium bg-[#fffae7] py-2 ${textSize}
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
        <Nav>
            <button>
                Log out
            </button>
        </Nav>
        <div className="flex flex-col justify-center items-center 
            p-20 overflow-y-auto h-screen w-full">
            {isOpen && <NewNotebookModal close={()=>{setIsOpen(false)}}/>}
            <div className="h-fit min-h-120 w-271 flex flex-wrap justify-start gap-x-10">
                <div className="bg-(--dark-green) w-45 h-60 flex flex-col items-center 
                    rounded-2xl  border-l-17 border-[#381807]  shadow-gray-800 
                    shadow-xl/40 relative">
                     <button className='w-full h-full flex justify-center text-white 
                        font-medium text-xl flex-col cursor-pointer
                        items-center' onClick={()=> {setIsOpen(true)}}>
                            <Icon iconName={'add_notebook'} style={'w-8 fill-white'} />
                            Create notebook
                            <div className="bg-[#fcf9f1] w-45 h-8 absolute bottom-1 
                                right-0 rounded-l-3xl rounded-r shadow-(--shadow)
                                border-l-6 border-[#381807]">
                                <hr className='mt-2 w-43 ml-1 text-[#c4c1b1]' />
                                <hr className='mt-1 w-43 ml-1 text-[#c4c1b1]' />
                                <hr className='mt-1 w-43 ml-1 text-[#c4c1b1]' />
                                <hr className='mt-1 w-43 ml-1 text-[#c4c1b1]' />
                                <hr className='mt-1 w-43 ml-1 text-[#c4c1b1]' />
                            </div>
                    </button>
                </div>
                {userNotebooks && userNotebooks.map((notebook) => 
                    <Notebook notebook={notebook} key={notebook.name}/>
                )}
            </div>
        </div>
        </>
    )
}