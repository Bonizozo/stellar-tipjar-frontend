import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { tipId: string; commentId: string } }
) {
  try {
    const { commentId } = params;

    // TODO: Toggle like in database
    // const like = await db.commentLike.upsert({
    //   where: {
    //     commentId_userId: {
    //       commentId,
    //       userId: session.user.id
    //     }
    //   },
    //   create: { commentId, userId: session.user.id },
    //   update: {}
    // });

    return NextResponse.json({
      success: true,
      isLiked: true,
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    );
  }
}
