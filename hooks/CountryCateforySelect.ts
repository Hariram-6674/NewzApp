import countries from "@/constants/countries"
import { useCallback, useState } from "react"
export const CountryCategorySelect = () =>{
    const [categcount, setCateg] = useState(countries);

    const togglecount = useCallback((id:number)=>{
        setCateg((prevCat)=>{
            return prevCat.map((item,index)=>{
                if(index === id){
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
        categcount,
        togglecount
    }
    
}