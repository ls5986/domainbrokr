import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      domain_id,
      domain_name,
      name,
      email,
      company,
      phone,
      offer_amount,
      message,
    } = body;

    // Validate required fields
    if (!domain_id || !domain_name || !name || !email || !offer_amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert offer into database
    const { data: offer, error } = await supabaseAdmin
      .from('offers')
      .insert({
        domain_id,
        domain_name,
        name,
        email,
        company,
        phone,
        offer_amount: parseFloat(offer_amount),
        message,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save offer' },
        { status: 500 }
      );
    }

    // Send email notification
    try {
      await resend.emails.send({
        from: 'DomainBrokr <noreply@domainbrokr.com>',
        to: [process.env.ADMIN_EMAIL!],
        subject: `New Offer for ${domain_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937;">New Domain Offer Received</h2>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Domain Details</h3>
              <p><strong>Domain:</strong> ${domain_name}</p>
              <p><strong>Offer Amount:</strong> $${offer_amount.toLocaleString()}</p>
            </div>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            </div>
            
            ${message ? `
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #374151; margin-top: 0;">Message</h3>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
            ` : ''}
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                This offer was submitted through DomainBrokr. Please respond to the buyer directly.
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true, offer });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

