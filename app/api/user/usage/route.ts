import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try{
    const { userId } =await auth()
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user=await prisma.user.findUnique(({
        where:{
            id:userId
        },
        select:{
            currentPlan:true,
            subscriptionStatus:true,
            meetingsThisMonth:true,
            chatMessagesToday:true,
            billingPeriodStart:true
        }
    }))

    if(!user){
        return NextResponse.json({error:'User not found'},{status:404})
    }

    return NextResponse.json(user)
    }catch(error){
        console.error('Error fetching user usage',error)
        return NextResponse.json({error:'Internal server error'},{status:500})
    }
}