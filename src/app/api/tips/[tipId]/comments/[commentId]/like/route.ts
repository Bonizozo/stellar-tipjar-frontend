import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ tipId: string; commentId: string }> }
) {
  try {
    const { commentId } = await params;
    void commentId; // used in real DB query
    return NextResponse.json({ success: true, isLiked: true });
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json({ error: 'Failed to toggle like' }, { status: 500 });
  }
}
