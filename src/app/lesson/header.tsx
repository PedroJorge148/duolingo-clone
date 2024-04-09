import { Progress } from '@/components/ui/progress'
import { InfinityIcon, X } from 'lucide-react'
import Image from 'next/image'

interface HeaderProps {
  hearts: number
  percentage: number
  hasActiveSubscription: boolean
}

export function Header({
  hearts,
  percentage,
  hasActiveSubscription,
}: HeaderProps) {
  return (
    <header className="mx-auto flex w-full max-w-[1140px] items-center justify-between gap-7 px-10 pt-[20px] lg:pt-[50px]">
      <X
        onClick={() => {}} // TODO: Add onClick exit
        className="cursor-pointer text-slate-500 transition hover:opacity-75"
      />
      <Progress value={percentage} className="" />
      <div className="flex items-center font-bold text-rose-500">
        <Image
          src="/heart.svg"
          height={28}
          width={28}
          alt="Heart"
          className="mr-2"
        />
        {hasActiveSubscription ? (
          <InfinityIcon className="size-6 stroke-[3]" />
        ) : (
          hearts
        )}
      </div>
    </header>
  )
}
