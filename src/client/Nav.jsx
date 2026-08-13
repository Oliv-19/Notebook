import { Link } from "react-router";

export function Nav({children}){
    return (
        <>
        <nav className="bg-(--dark-green) p-3 flex justify-between w-full h-[8%]">
            <Link to={'/notebooks'} className="text-white font-medium text-2xl">
                Notebook
            </Link>
            {children}
        </nav>
        </>
    )
}