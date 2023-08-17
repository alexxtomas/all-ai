import { auth } from '@clerk/nextjs'
import { prismadb } from '@/lib/prismadb'
import { MAX_FREE_COUNTS } from '@/utils/constants'

export async function increaseApiLimitCount() {
  const { userId } = auth()

  if (!userId) {
    return
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId
    }
  })

  if (!userApiLimit) {
    await prismadb.userApiLimit.create({
      data: { userId, count: 1 }
    })
    return
  }

  await prismadb.userApiLimit.update({
    where: {
      userId
    },
    data: { count: userApiLimit.count + 1 }
  })
}

export async function checkApiLimitCount() {
  const { userId } = auth()

  if (!userId) {
    return
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId }
  })

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true
  }

  return false
}

export async function getApiLimitCount() {
  const { userId } = auth()

  if (!userId) {
    return 0
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId }
  })

  if (!userApiLimit) return 0

  return userApiLimit.count
}
