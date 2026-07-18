import { useState } from "react"
import { login, signup } from "./services/auth"
import { useAuth } from "./AuthContext"
import { useNavigate } from "react-router"

function Form({onSubmit, changeView, submitText}){
    const submit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        onSubmit({email: formData.get('email'), password: formData.get('password')})
    }
    return (
        <>
            <form onSubmit={submit} className="flex flex-col items-center 
                justify-center h-full">
                    <h1>{submitText}</h1>
                <label >
                    Email: 
                    <input name="email" type="email" className="border"/>
                </label>
                 <label>
                    Password: 
                    <input name="password" type="password" className="border"/>
                </label>
                <button type="submit"> {submitText} </button>
                <button type="button" onClick={changeView}> {submitText== 'login'? 'sign up' : 'log in'} </button>
            </form>
        </>
    )
}

export function Auth(){
    const [isLogin, setIsLogin] = useState(true)
    const {loginUser} = useAuth()
    const navigate = useNavigate()
    const onSubmit = async(formData) => {
        let res = null
        if(isLogin){
            res = await login(formData)
        } else {
            res= await signup(formData)
        }
        if(res) {
            loginUser(res.id)
            navigate('/')
        }
    }
    return (
        <>
            <div className="h-screen">
                {isLogin ? <>
                    <Form key={'login'} onSubmit={onSubmit} submitText={'login'} 
                    changeView={()=> {setIsLogin(false)}}/>
                </>
                : <>
                    <Form key={'signup'} onSubmit={onSubmit} submitText={'signup'} 
                    changeView={()=> {setIsLogin(true)}}/>
                </>
                
                }
                
            </div>
        </>
    )
}