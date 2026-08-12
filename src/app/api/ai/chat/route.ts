import { NextRequest, NextResponse } from 'next/server';

    const MODEL = 'gemini-3.5-flash';

export async function POST(request: NextRequest) {
  try {
    const { question, group } = await request.json();

    if (!question?.trim()) {
      return NextResponse.json(
        {
          error: 'Question is required',
        },
        {
          status: 400,
        }
      );
    }

    if (!group) {
      return NextResponse.json(
        {
          error: 'Group information is required',
        },
        {
          status: 400,
        }
      );
    }

    const prompt = `
You are an AI Learning Assistant inside an LMS.

Your job is ONLY to help students with the current learning group.

========================
CURRENT GROUP
========================

Group Name:
${group.name}

Category:
${group.category}

Description:
${group.description ?? 'No description provided.'}



========================
RULES
========================

1. Answer ONLY questions related to this group.

2. You may help with:
- Course content
- Programming concepts
- Assignments
- Posts
- Debugging code
- Study guidance
- Examples
- Explanations

3. If the student's question is NOT related to this group, reply EXACTLY with:

I'm here to help with the learning topics of this group. Please ask questions related to this group.

4. Keep answers educational.

5. Don't invent information that doesn't exist in the group context.

========================
Student Question
========================

${question}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();

      if (response.status === 429) {
        return NextResponse.json(
          {
            error: 'Too many requests. Please try again in a few moments.',
          },
          {
            status: 429,
          }
        );
      }

      return NextResponse.json(
        {
          error: error.error?.message ?? 'Failed to generate AI response.',
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!answer) {
      return NextResponse.json(
        {
          error: 'The AI returned an empty response.',
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      answer,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Something went wrong.',
      },
      {
        status: 500,
      }
    );
  }
}
