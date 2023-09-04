

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'


export default function Home() {
  const state=false
  return (
    <div className=''>
         <p className=' text-3xl font-bold  text-indigo-700 '>
    hello discord
   </p>
   <Button size="sm" className={cn("bg-yellow-600",state && "bg-red-500")}>

    click here
   </Button>

    </div>

  )
}
