import Link from 'next/link'
import Image from 'next/image'
import { quests } from '@/constants'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface QuestsProps {
  points: number
}

export function Quests({ points }: QuestsProps) {
  return (
    <div className="space-y-4 rounded-xl border-2 p-4">
      <div className="flex w-full items-center justify-between space-y-2">
        <h3 className="text-lg font-bold">Quests</h3>
        <Link href="/quests">
          <Button variant="primaryOutline" size="sm">
            View all
          </Button>
        </Link>
      </div>
      <ul className="w-full space-y-4">
        {quests.map((quest) => {
          const progress = (points / quest.value) * 100

          return (
            <div
              key={quest.title}
              className="flex w-full items-center gap-4 border-t-2 pb-4"
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
    </div>
  )
}
