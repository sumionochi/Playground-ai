import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 
import { createWorkFlowForm } from "@/schema/workflowForm"; 
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); 

    const parsedBody = createWorkFlowForm.parse({
      name: body.name,
      description: body.description,
    });

    const { userId, definition, status } = body;

    if (!userId || !definition) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const workflow = await prisma.workflow.create({
      data: {
        userId,
        name: parsedBody.name, 
        description: parsedBody.description,
        definition,
        status,
      },
    });

    return NextResponse.json(workflow, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors.map((e) => e.message) },
        { status: 400 }
      );
    }

    console.error("Error creating workflow:", error);
    return NextResponse.json(
      { error: "Failed to create workflow" },
      { status: 500 }
    );
  }
}
