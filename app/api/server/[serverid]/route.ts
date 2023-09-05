import { Server } from '@prisma/client';
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { db } from '@/lib/db';


import {v4 as uuid} from 'uuid'




export async function PATCH( req:Request,{params}:{params:{serverid:string}}){


    try {
        const profile =await currentProfile()
        if(!profile){
            return NextResponse.json({message:"You are not logged in"}, {status:401})
        }

        if(!params.serverid) {
            return NextResponse.json({message:"Server not found"}, {status:404})
        }

        const server=await db.server.update({
            where:{
                id:params.serverid,
                ProfileId:profile.id
            },
            data:{
                inviteCode:uuid()

            }


        })

        return NextResponse.json({message:"Server invite code updated",server}, {status:200})


        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Something went wrong"}, {status:500})

        
    }


}