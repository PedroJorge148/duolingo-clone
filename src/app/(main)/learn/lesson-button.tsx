'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Check, Crown, Star } from 'lucide-react'
import Link from 'next/link'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'

import 'react-circular-progressbar/dist/styles.css'

export interface LessonButtonProps {
  id: number
  index: number
  totalCount: number
  locked?: boolean
  current?: boolean
  percentage: number
}

export function LessonButton(props: LessonButtonProps) {
  const cycleLength = 8
  const cycleIndex = props.index % cycleLength

  let identationLevel

  if (cycleIndex <= 2) {
    identationLevel = cycleIndex
  } else if (cycleIndex <= 4) {
    identationLevel = 4 - cycleIndex
  } else {
    identationLevel = cycleIndex - 8
  }

  const rightPosition = identationLevel * 40

  const isFirst = props.index === 0
  const isLast = props.index === props.totalCount
  const isCompleted = !props.current && !props.locked

  const Icon = isCompleted ? Check : isLast ? Crown : Star

  const href = isCompleted ? `/lessons/${props.id}` : '/lesson'

  return (
    <Link
      href={href}
      aria-disabled={props.locked}
      style={{ pointerEvents: props.locked ? 'none' : 'auto' }}
      className=""
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCompleted ? 60 : 24,
        }}
      >
        {props.current ? (
          <div className="relative h-[102px] w-[102px]">
            <div className="absolute -top-6 left-2.5 z-10 animate-bounce rounded-xl border-2 bg-white px-3 py-2.5 font-bold uppercase tracking-wide text-green-500">
              Start
              <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-x-8 border-t-8 border-x-transparent" />
            </div>
            <CircularProgressbarWithChildren
              value={Number.isNaN(props.percentage) ? 0 : props.percentage}
              styles={{
                path: {
                  stroke: '#4ade80',
                },
                trail: {
                  stroke: '#e5e7eb',
                },
              }}
            >
              <Button
                size="rounded"
                variant={props.locked ? 'locked' : 'secondary'}
                className="h-[70px] w-[70px] border-b-8"
              >
                <Icon
                  className={cn(
                    'size-10',
                    props.locked
                      ? 'fill-neutral-400 stroke-neutral-400 text-neutral-400'
                      : 'fill-primary-foreground text-primary-foreground',
                    isCompleted && 'fill-none stroke-[4]',
                  )}
                />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <Button
            size="rounded"
            variant={props.locked ? 'locked' : 'secondary'}
            className="h-[70px] w-[70px] border-b-8"
          >
            <Icon
              className={cn(
                'size-10',
                props.locked
                  ? 'fill-neutral-400 stroke-neutral-400 text-neutral-400'
                  : 'fill-primary-foreground text-primary-foreground',
                isCompleted && 'fill-none stroke-[4]',
              )}
            />
          </Button>
        )}
      </div>
    </Link>
  )
}
