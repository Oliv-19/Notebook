import { useNavigate } from "react-router"
import { createNB, saveCurrNotebook } from "../services/notebooks"
import { Icon } from "../Icon"

export function NewNotebookModal({close}){
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
        <div className="w-full h-full absolute z-2 flex">
            <div onClick={close} 
                className="h-full w-full absolute bg-black/20" />
            <div className="bg-(--green) w-150 h-80 m-auto z-3 rounded-2xl">
                <form className='w-full h-full flex flex-col items-center 
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
                        <button className='bg-(--dark-green) p-2 rounded cursor-pointer
                            hover:bg-(--dark-green)/60'
                            type="submit">
                                Create
                        </button>
                </form>
            </div>
        </div>
        </>
    )
}