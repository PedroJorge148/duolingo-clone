import { Button } from '@/components/ui/button'
import Image from 'next/image'

const flags = [
  {
    flag: 'hr',
    country: 'Croatian',
  },
  {
    flag: 'es',
    country: 'Spanish',
  },
  {
    flag: 'fr',
    country: 'French',
  },
  {
    flag: 'it',
    country: 'Italian',
  },
  {
    flag: 'jp',
    country: 'Japanese',
  },
]

export function Footer() {
  return (
    <footer className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        {flags.map((item) => (
          <Button key={item.flag} size="lg" variant="ghost" className="w-full">
            <Image
              src={`/${item.flag}.svg`}
              alt={item.country}
              height={32}
              width={32}
              className="mr-4 rounded-md"
            />
            {item.country}
          </Button>
        ))}
      </div>
    </footer>
  )
}
