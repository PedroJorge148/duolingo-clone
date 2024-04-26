import { FeedWrapper } from '@/components/feed-wrapper'
import { StickyWrapper } from '@/components/sticky-wrapper'
import { Progress } from '@/components/ui/progress'
import { UserProgress } from '@/components/user-progress'
import { getUserProgress, getUserSubscription } from '@/db/queries'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const quests = [
  {
    title: 'Earn 20 XP',
    value: 20,
  },
  {
    title: 'Earn 50 XP',
    value: 50,
  },
  {
    title: 'Earn 100 XP',
    value: 100,
  },
  {
    title: 'Earn 500 XP',
    value: 500,
  },
  {
    title: 'Earn 1000 XP',
    value: 1000,
  },
]

export default async function QuestsPage() {
  const userProgressData = getUserProgress()
  const userSubscriptionData = getUserSubscription()

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ])

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses')
  }

  const isPro = !!userSubscription?.isActive

  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image src="/quests.svg" alt="Quests" width={90} height={90} />
        </div>
        <h1 className="my-7 text-center text-2xl font-bold text-neutral-800">
          Quests
        </h1>
        <p className="mb-6 text-center text-lg text-muted-foreground">
          Complete quests by earning points.
        </p>
        <ul className="w-full">
          {quests.map((quest) => {
            const progress = (userProgress.points / quest.value) * 100

            return (
              <div
                key={quest.title}
                className="flex w-full items-center gap-4 p-4"
              >
                <Image src="/points.svg" alt="Points" width={60} height={60} />
                <div className="flex w-full flex-col gap-2">
                  <p className="text-xl font-bold text-neutral-700">
                    {quest.title}
                  </p>
                  <Progress value={progress} className="h-3" />
                </div>
              </div>
            )
          })}
        </ul>
      </FeedWrapper>
    </div>
  )
}
