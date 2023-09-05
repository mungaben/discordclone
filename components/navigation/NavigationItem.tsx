
"use client"



import React from 'react'
import ActionsToolTip from '../actionsToolTip';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import { group } from 'console';
import Image from 'next/image';
type NavigationItemProps = {
  id: string;
  name: string;
  imageUrl: string;

}
const NavigationItem = ({id,imageUrl,name }:NavigationItemProps) => {

  const params=useParams()
  const router=useRouter()



  const handleNavigation=()=>{
    router.push(`/Servers/${id}`)
  }
  
  
  

  return (

      <ActionsToolTip
      
       label={name}
        side="right"
        align="center"
        
      >
        <button
        onClick={handleNavigation}
        className=' group relative items-center'
        >
          <div className={
            cn(" absolute left-0 bg-primary rounded-r-full transition-all w-[4px] ",params?.serverid !==id && "group-hover:h-[30px] " ,params?.serverid === id ?"h-[48px] ":"h-[8px]")
          }/>
           <div
           className={cn('relative group  mx-3 flex overflow-hidden w-[48px] h-[48px] rounded-[48px] group-hover:rounded-[16px] transition-all '
           ,params?.serverid === id && "rounded-[16px] bg-primary/10 text-primary")}
           
           >
            <Image
            fill
            src={imageUrl}
            alt='server image'
            
            
            />
       
          

           </div>

        </button>

      </ActionsToolTip>
    
 
  )
}

export default NavigationItem
