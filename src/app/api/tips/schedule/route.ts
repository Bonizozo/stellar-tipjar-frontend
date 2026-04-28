import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipient, amount, scheduledDate, recurring, frequency } = body;

    // TODO: Save to database and set up cron job
    // const scheduledTip = await db.scheduledTip.create({
    //   data: {
    //     userId: session.user.id,
    //     recipient,
    //     amount,
    //     scheduledDate: new Date(scheduledDate),
    //     recurring,
    //     frequency,
    //     status: 'pending'
    //   }
    // });

    return NextResponse.json({
      success: true,
      message: 'Tip scheduled successfully',
    });
  } catch (error) {
    console.error('Error scheduling tip:', error);
    return NextResponse.json(
      { error: 'Failed to schedule tip' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // TODO: Fetch from database
    // const scheduledTips = await db.scheduledTip.findMany({
    //   where: { userId: session.user.id },
    //   orderBy: { scheduledDate: 'asc' }
    // });

    return NextResponse.json({
      tips: [],
    });
  } catch (error) {
    console.error('Error fetching scheduled tips:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scheduled tips' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tipId = searchParams.get('tipId');

    if (!tipId) {
      return NextResponse.json(
        { error: 'Tip ID required' },
        { status: 400 }
      );
    }

    // TODO: Cancel in database
    // await db.scheduledTip.update({
    //   where: { id: tipId, userId: session.user.id },
    //   data: { status: 'cancelled' }
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error cancelling scheduled tip:', error);
    return NextResponse.json(
      { error: 'Failed to cancel tip' },
      { status: 500 }
    );
  }
}
