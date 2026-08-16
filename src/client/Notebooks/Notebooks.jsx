import { useState } from 'react'
import { useAuth } from '../AuthContext'
import { useNotebooks } from './NotebooksContext'
import { useEffect } from 'react'
import { Icon } from '../Icon'
import { Nav } from '../Nav'
import { NewNotebookModal } from './NewNotebookModal'
import { Notebook } from './Notebook'
import { Book } from './Book'


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
        <div className="relative h-full">
            {isOpen && <NewNotebookModal close={()=>{setIsOpen(false)}}/>}
            <div className="overflow-y-auto overflow-x-hidden h-fit min-h-138 w-full p-20">
                <div className="h-fit w-271 flex flex-wrap justify-start gap-x-10
                    gap-y-8 m-auto">
                    <div className="w-40 h-55 relative">
                        <Book color={"#3b5d40"}>
                            <button className='w-full h-full flex justify-center text-white 
                            font-medium text-xl flex-col cursor-pointer
                            items-center' onClick={()=> {setIsOpen(true)}}>
                                <Icon iconName={'add_notebook'} style={'w-8 fill-white'} />
                                Create notebook
                            </button>
                        </Book>

                    </div>
                    {userNotebooks && userNotebooks.map((notebook) => 
                        <Notebook notebook={notebook} key={notebook.name}/>
                    )}
                </div>

            </div>
        </div>
        </>
    )
}