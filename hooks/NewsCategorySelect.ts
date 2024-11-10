import category from "@/constants/category"
import { useCallback, useState } from "react"
export const NewsCategorySelect = () =>{
    const [categ, setCateg] = useState(category);

    const toggle = useCallback((id:number)=>{
        setCateg((prevCat)=>{
            return prevCat.map((item)=>{
                if(item.id === id){
                    return{
                        ...item,
                        selected:!item.selected
                    }
                }
                return item
            })
        })
    },[])

    return{
        categ,
        toggle
    }
    
}