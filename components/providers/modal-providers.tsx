



"use client"




import React, { useEffect, useState } from 'react'
import CreateServerModal from '../Modals/create-server-modal'

const ModalProvider = () => {
const [ isopen ,setisOpen]=useState(false)



useEffect(()=>{
    setisOpen(true)
},[])

if(!isopen){
    return null
}

    
  return (
    <div>
      <CreateServerModal/>
    </div>
  )
}

export default ModalProvider
