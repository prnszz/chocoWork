import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')
  const skip = (page - 1) * limit

  const surveys = await prisma.survey.findMany({
    where: { isActive: true },
    take: limit,
    skip,
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json(surveys)
}