import {COLORS} from '../../../public/css/color';

export const TabStatus = ({ statusList, activeTab, onChangeTab }) =>{
    
    return(
        <>
        <style>{
            `
            .container-tab{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr  1fr  1fr;
                gap: 1rem
            }
            button{
                border: none;
                padding: 5px; 
                border-radius: 15px;
                background-color: ${COLORS.gray[50]};
                color: ${COLORS.blueFont.dark}
            }
            .active{
                border: none;
                color: ${COLORS.gray[50]};
                background-color: ${COLORS.orange.base};
            }
            `
            }</style>
            <div className="container-tab">
                {statusList.map((status)=>{
                    return(
                <button key={status.id} className={activeTab === status.id ? "active" : ""} onClick={()=>onChangeTab(status.id)}>
                    {status.label}
                </button>
                )
                
                })}
            </div>
        </>



    )
}