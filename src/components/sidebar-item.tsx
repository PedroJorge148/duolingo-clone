'use client'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

interface SidebarItem {
  label: string
  iconSrc: string
  href: string
}

export function SidebarItem({ label, iconSrc, href }: SidebarItem) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Button
      variant={active ? 'sidebarOutline' : 'sidebar'}
      className="h-[52px] justify-start"
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          alt={label}
          height={32}
          width={32}
          className="mr-5"
        />
        {label}
      </Link>
    </Button>
  )
}
