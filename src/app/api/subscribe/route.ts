import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, phone } = await request.json()

    if (!email && !phone) {
      return NextResponse.json(
        { error: 'Email or phone is required' },
        { status: 400 }
      )
    }

    if (!supabase) {
      console.warn('Supabase not configured - subscriber not saved')
      return NextResponse.json({ success: true })
    }

    const { error } = await supabase
      .from('subscribers')
      .upsert(
        {
          ...(email && { email: email.toLowerCase().trim() }),
          ...(phone && { phone: phone.trim() }),
          source: 'antjeworring.com',
        },
        { onConflict: email ? 'email' : 'phone' }
      )

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
