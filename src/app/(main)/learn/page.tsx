import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from '@/db/queries'
import { Promo } from '@/components/promo'
import { FeedWrapper } from '@/components/feed-wrapper'
import { UserProgress } from '@/components/user-progress'
import { StickyWrapper } from '@/components/sticky-wrapper'
import { redirect } from 'next/navigation'
import { Header } from './header'
import { Unit } from './unit'
import { lessons, units as unitsSchema } from '@/db/schema'
import { Quests } from '@/components/quests'

export default async function LearnPage() {
  const unitsData = getUnits()
  const userProgressData = getUserProgress()
  const courseProgressData = getCourseProgress()
  const userSubscriptionData = getUserSubscription()
  const lessonPercentageData = getLessonPercentage()

  const [
    userProgress,
    courseProgress,
    lessonPercentage,
    userSubscription,
    units,
  ] = await Promise.all([
    userProgressData,
    courseProgressData,
    lessonPercentageData,
    userSubscriptionData,
    unitsData,
  ])

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses')
  }

  if (!courseProgress) {
    redirect('/courses')
  }

  const isPro = !!userSubscription?.isActive

  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress?.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress?.activeCourse?.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              title={unit.title}
              order={unit.order}
              description={unit.description}
              lessons={unit.lessons}
              activeLesson={
                courseProgress.activeLesson as
                  | (typeof lessons.$inferSelect & {
                      unit: typeof unitsSchema.$inferSelect
                    })
                  | undefined
              }
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}
