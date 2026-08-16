import { useState } from "react"
import { useNotebooks } from "./NotebooksContext"
import { deleteNotebook, editNotebook, saveCurrNotebook } from "../services/notebooks"
import { Icon } from "../Icon"
import { Dropdown } from "../Dropdown"
import { Link } from "react-router"
import { Book } from "./Book"
import { Modal } from "./Modal"
import { BooksStyle } from "./NewNotebookModal"

export function Notebook({notebook}){
    const [isEdit, setIsEdit]= useState(false)
    const [newName, setNewName]= useState(notebook.name)
    const [openOptions, setOpenOptions]= useState(false)
    const [checkedStyle, setCheckedStyle] = useState('#3b5d40')
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
        close()
        await editNotebook(notebook.id, newName, checkedStyle)
        setNewName(notebook.name)
        getNotebooks()
    }
    const close = () =>{
        setIsEdit(false)
    }
    const textSize = notebook.name.length > 30 ? 'text-xs' : (
        notebook.name.length > 20 ? 'text-sm':(
            notebook.name.length > 10 ? 'text-base' : 'text-xl'
        )
    )
    return(
        <>
        <div className="">
            <div className="relative w-40 h-55">
                <button className={`cursor-pointer absolute z-2 top-2 right-2 w-fit h-fit rounded-4xl
                hover:bg-[${notebook.notebookStyle}] hover:bg-black/20 p-1`}
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
                            Edit
                    </button>
                    <button onClick={delNotebook} 
                        className='cursor-pointer w-full bg-transparent flex 
                        font-medium text-white hover:bg-(--dark-green) py-1 px-2 justify-start gap-2 items-center'>
                            <Icon iconName={'delete_notebook'} style={'fill-white w-6'}/>
                            Delete
                    </button>
                </Dropdown>
                <Link onClick={()=>{updateNotebook(notebook)}}
                    to={`/notebooks/${notebook.name}`} 
                    className='h-full w-full flex justify-center '
                    >
                    <Book color={notebook.notebookStyle || "#3b5d40"}>
                        <p className={`min-w-20 max-w-30 min-h-12 h-fit max-h-18 
                            text-black mt-10 rounded flex items-center justify-center
                            font-medium bg-[#fffae7] py-2 ${textSize} text-center
                            `}>
                            {notebook.name}
                        </p>
                    </Book>

                </Link>

            </div>
            {isEdit && <>
                <Modal close={close}>
                    <form className='w-full h-full flex flex-col items-center gap-2
                        justify-between p-10 relative text-white font-medium'
                        onSubmit={edit}
                        >
                        <div className="flex justify-between w-full items-center">
                            <p className='text-2xl'>
                                Edit Notebook
                            </p>
                            <button className='p-1.5 hover:bg-(--dark-green)/50
                                rounded-4xl cursor-pointer' 
                                onClick={close} type='button'>
                                <Icon iconName={'close'} style={'w-6 fill-white hover'}/>
                            </button>

                        </div>
                        <label className='flex flex-col'>
                            <p className="text-[0.9rem] ">
                                Notebook name:
                            </p>
                            <input type="text" name="name" id="name" required defaultValue={notebook.name}
                                className='border-b-2 
                                bg-(--dark-green)/60 p-1 rounded border-(--dark-green)
                                focus:outline-0 focus:border-white  transition-colors 
                                duration-300 ease-in-out'/>
                        </label>
                        <BooksStyle setCheckedStyle={setCheckedStyle} checkedStyle={checkedStyle}/>
                        <button className='bg-(--dark-green) p-2 rounded cursor-pointer
                            hover:bg-(--dark-green)/60'
                            type="submit">
                                Create
                        </button>
                    </form>
                </Modal>
            </>}

        </div>
        </>
    )
}