import { useState } from "react";


export const useOutlet = ()=>{
    const [outlet, setOutlet]= useState(()=>{
        const outletData = localStorage.getItem('outlet')
        return outletData ? JSON.parse(outletData) : null;
    })

    const updateOutlet = (newOutletData) => {
        localStorage.setItem("outlet", JSON.stringify(newOutletData));
        setOutlet(newOutletData);
    };
    return {
        outletName: outlet?.name || "",
        outletId: outlet?.id || null,
        outletAddress: outlet?.address || "",
        updateOutlet
    }
} 


