import { useState } from 'react'
import {Link, useNavigate} from 'react-router'
import { createNB } from '../services/notebooks'
import { useAuth } from '../AuthContext'

function NewNotebookModal({close}){
    const navigate = useNavigate()
    const createNewNotebook = (e)=> {
        e.preventDefault()
        const formData = new FormData(e.target)
        const name = formData.get('name')
        createNB(name)
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

export function Notebooks(){
    const [isOpen, setIsOpen]= useState()
    const {userNotebooks} = useAuth()
    console.log(userNotebooks);
    
    if(!userNotebooks || userNotebooks.length == 0) return null
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
                {userNotebooks.map((notebook) => {
                    return <Link key={notebook.name} to={`/notebooks/${notebook.name}`} 
                        className="bg-(--green) w-40 h-50">
                        {notebook.name}
                    </Link>
                    }
                )}
            </div>
        </div>
        </>
    )
}