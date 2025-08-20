import { prisma } from "@/lib/db";
import { canUserChat, incrementChatUsage } from "@/lib/usage";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST=async(request:NextRequest)=>{
    try{
        const {userId}=await auth()
        if(!userId){
            return NextResponse.json({error:'Unauthorized'},{status:401})
        }

        const user=await prisma.user.findUnique({
            where:{
                id:userId
            },
            select:{
                id:true,
                currentPlan:true,
                subscriptionStatus:true,
                chatMessagesToday:true,
                billingPeriodStart:true
            }
        })
        if(!user){
            return NextResponse.json({error:'User not found'},{status:404})
        }

        const chatCheck = await canUserChat(user.id)

        if (!chatCheck.allowed) {
            return NextResponse.json({
                error: chatCheck.reason,
                upgradeRequired: true
            }, { status: 403 })
        }

        await incrementChatUsage(user.id)

        return NextResponse.json({ success: true })
        
    }catch(error){
        console.error('Error incrementing chat usage',error)
        return NextResponse.json({error:'Internal server error'},{status:500})
    }
}