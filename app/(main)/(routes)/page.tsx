

import { ModeToggle } from '@/components/modeToggle'
import { UserButton } from '@clerk/nextjs'


export default function Home() {
  const state=false
  return (
    <div className=''>
        <UserButton afterSignOutUrl="/"/>
        <ModeToggle/>

    </div>

  )
}
