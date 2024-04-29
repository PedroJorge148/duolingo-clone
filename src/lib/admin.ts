import { auth } from '@clerk/nextjs'

const adminIds = ['user_2eoslS4gEu57kQTgdkzZjDEB486']

export function isAdmin() {
  const { userId } = auth()

  if (!userId) return false

  return adminIds.indexOf(userId) !== -1
}
