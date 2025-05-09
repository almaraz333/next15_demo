import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Navbar = async () => {
    const session = await auth()
  return (
    <div className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center'>
            <Link href={"/"}>
                <Image src="/logo.jpg" alt="logo" width={144} height={30}/>
            </Link>

            <div className='flex items-center gap-5 text-black'>
                {session && session.user ?
                
                <>
                <Link href={"/create"}><span>Create</span></Link>
                <form action={async () => {
                    "use server"
                    await signOut({redirectTo: "/"})
                }}> <button type='submit'>Sign out</button></form>
                <Link href={`/user/${session.id}`}><span>{session.user.name}</span></Link>
                </>
                :
                <form action={async () => {
                    "use server"
                    await signIn('github')
                }}>
                    <button type='submit'>Sign In</button>
                    </form>
                }
            </div>
        </nav>
    </div>
  )
}
