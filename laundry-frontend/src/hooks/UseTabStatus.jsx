import { useState } from "react";

export const UseTabStatus = (defaultStatus = "Semua")=>{
    const [activeTab, setActiveTab] = useState(defaultStatus);

    const statusList = [
        {id: "baru", label: "Baru"},
        {id: "proses", label: "Proses"},
        {id: "siap", label: "Siap"},
        {id: "selesai", label: "Selesai"},        
        {id: "semua", label: "Semua"}
    ];
    const changeTab = (id)=>{
        setActiveTab(id);
    }
    return {
        activeTab, statusList, changeTab
    }
}