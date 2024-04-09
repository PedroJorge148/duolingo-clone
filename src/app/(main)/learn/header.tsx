import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <div className="sticky top-0 mb-5 flex items-center justify-between border-b-2 bg-white pb-3 text-neutral-400 lg:z-50 lg:pt-7">
      <Link href="/courses">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="size-5 stroke-2 text-neutral-200" />
        </Button>
      </Link>
      <h1 className="text-lg font-bold">{title}</h1>
      <div />
    </div>
  )
}
