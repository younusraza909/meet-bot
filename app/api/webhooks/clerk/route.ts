// import { prisma } from "@/lib/db";
import { prisma } from "@/lib/db";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from 'svix'

export async function POST(request: NextRequest) {
    try {
        const payload = await request.text()
        const headers = {
            'svix-id': request.headers.get('svix-id') || '',
            'svix-timestamp': request.headers.get('svix-timestamp') || '',
            'svix-signature': request.headers.get('svix-signature') || '',
        }

        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
        if (webhookSecret) {
            const wh = new Webhook(webhookSecret)
            try {
                wh.verify(payload, headers)
            } catch (err) {
                return NextResponse.json({ error: 'Invalid Signature' }, { status: 400 })
            }
        }

        const event = JSON.parse(payload) as WebhookEvent
        console.log('clerk webhook received', event.type)

        if (event.type === "user.created") {
            const { id, email_addresses, first_name, last_name } = event.data
            const primaryEmail = email_addresses.find(email => email.id === event.data.primary_email_address_id)?.email_address

            // Check if user already exists because if someone hit this webhook on his own from clerk again it would throw an error
            const existingUser = await prisma.user.findUnique({
                where: { id: id }
            })

            if (existingUser) {
                return NextResponse.json({ message: "user already exists" })
            }
            const newUser = await prisma.user.create({
                data: {
                    id: id,
                    clerkId: id,
                    email: primaryEmail || null,
                    name: `${first_name} ${last_name}`
                }
            })
            return NextResponse.json({ message: "user created successfully" })
        }

        return NextResponse.json({ message: 'webhook received' })
    } catch (error) {
        console.error('webhook error:', error)
        return NextResponse.json({ error: 'Webhook processign failed' }, { status: 500 })
    }
}