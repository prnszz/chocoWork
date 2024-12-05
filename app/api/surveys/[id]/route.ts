import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const survey = await prisma.survey.findUnique({
    where: { id: parseInt(params.id) }
  });
  
  return NextResponse.json(survey);
}