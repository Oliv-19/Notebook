import { useNavigate } from "react-router"
import { createNB, saveCurrNotebook } from "../services/notebooks"
import { Icon } from "../Icon"
import { Book } from "./Book"
import { useState } from "react"
import { Modal } from "./Modal"

export function BooksStyle({setCheckedStyle, checkedStyle}){
    const notebookStyles = {
        green: '#3b5d40',
        brown: '#604545',
        pink: '#af6694',
        violet: '#9b5fbd',
        blue: '#5c5cb2',
        light_blue: '#62afbd',
        light_green: '#4cd881'
    }
    return (
        <>
        <div className="h-fit w-full bg-(--dark-green)/30 rounded-xl flex justify-center items-center">
            <div className="w-full p-1 py-2 flex flex-wrap gap-x-7 gap-y-3">
                {Object.entries(notebookStyles).map(([key, color])=>
                    <div key={color} className={`${checkedStyle == color && 'outline-white'} 
                        h-30 w-20 outline-2 outline-offset-4 outline-transparent rounded-xl`}>
                        <label onChange={()=>{setCheckedStyle(color)
                        }} checked={color == checkedStyle}
                            className="h-full w-full cursor-pointer">
                            <Book color={color}/>
                            <input type="radio" className="hidden" name="style" id="style" />
                        </label>

                    </div>
                )}
            </div>

        </div>
        </>
    )
}

export function NewNotebookModal({close}){
    const navigate = useNavigate()
    const [checkedStyle, setCheckedStyle] = useState('#3b5d40')
    const createNewNotebook = async(e)=> {
        e.preventDefault()
        const formData = new FormData(e.target)
        const name = formData.get('name')
        const notebook = await createNB(name, checkedStyle)
        
        saveCurrNotebook(notebook) 
        navigate(`/notebooks/${name}`)
    }
   
    return (
        <>
        <Modal close={close}>
            <form className='w-full h-full flex flex-col items-center gap-2
                justify-between p-10 relative text-white font-medium'
                onSubmit={createNewNotebook}
                >
                <div className="flex justify-between w-full items-center">
                    <p className='text-2xl'>
                        Create New Notebook
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
                    <input type="text" name="name" id="name" required
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
        </>
    )
}