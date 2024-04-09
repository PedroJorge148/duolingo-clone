import { lessons, units } from '@/db/schema'
import { UnitBanner } from './unit-banner'
import { LessonButton } from './lesson-button'

export interface UnitProps {
  id: number
  order: number
  title: string
  description: string
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean
  })[]
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect
      })
    | undefined
  activeLessonPercentage: number
}

export function Unit(props: UnitProps) {
  return (
    <>
      <UnitBanner title={props.title} description={props.description} />
      <div className="relative flex flex-col items-center">
        {props.lessons.map((lesson, index) => {
          const isCurrent = lesson.id === props.activeLesson?.id
          const isLocked = !lesson.completed && !isCurrent

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={props.lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={props.activeLessonPercentage}
            />
          )
        })}
      </div>
    </>
  )
}
