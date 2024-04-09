import { Button } from '@/components/ui/button'
import { NotebookText } from 'lucide-react'
import Link from 'next/link'

export interface UnitBannerProps {
  title: string
  description: string
}

export function UnitBanner({ title, description }: UnitBannerProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-green-500 p-5 text-white">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>
      <Link href="/lessons">
        <Button
          size="lg"
          variant="secondary"
          className="border-2 border-b-4 active:border-b-2"
        >
          <NotebookText className="xl:mr-2" />
          <span className="hidden xl:flex">Continue</span>
        </Button>
      </Link>
    </div>
  )
}
