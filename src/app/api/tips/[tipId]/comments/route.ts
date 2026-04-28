import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { tipId: string } }
) {
  try {
    const { tipId } = params;

    // TODO: Fetch from database
    // const comments = await db.comment.findMany({
    //   where: { tipId },
    //   include: { author: true, replies: true, likes: true }
    // });

    return NextResponse.json({
      comments: [],
      count: 0,
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { tipId: string } }
) {
  try {
    const { tipId } = params;
    const body = await request.json();
    const { content, parentId } = body;

    // TODO: Save to database with moderation
    // const comment = await db.comment.create({
    //   data: {
    //     tipId,
    //     content,
    //     parentId,
    //     authorId: session.user.id,
    //     status: 'pending' // For moderation
    //   }
    // });

    return NextResponse.json({
      success: true,
      comment: {
        id: Date.now().toString(),
        content,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { tipId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('commentId');

    if (!commentId) {
      return NextResponse.json(
        { error: 'Comment ID required' },
        { status: 400 }
      );
    }

    // TODO: Delete from database with authorization check
    // await db.comment.delete({
    //   where: { id: commentId, authorId: session.user.id }
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}
