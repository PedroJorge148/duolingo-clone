import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { InfinityIcon } from 'lucide-react'

export interface UserProgressProps {
  activeCourse: { imageSrc: string; title: string } // TODO: Replace with DB types
  hearts: number
  points: number
  hasActiveSubscription: boolean
}

export function UserProgress({
  activeCourse,
  points,
  hearts,
  hasActiveSubscription,
}: UserProgressProps) {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <Link href="/courses">
        <Button variant="ghost">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
      </Link>

      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="/points.svg"
            alt="P  oints"
            height={28}
            width={28}
            className="mr-2"
          />
          {points}
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500">
          <Image
            src="/heart.svg"
            alt="Hearts"
            height={22}
            width={22}
            className="mr-2"
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="size-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  )
}
