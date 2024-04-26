'use client'

import Image from 'next/image'
import { toast } from 'sonner'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { refillHearts } from '@/actions/user-progress'
import { createStripeUrl } from '@/actions/user-subscription'
import { POINTS_TO_REFILL } from '@/constants'

interface ItemsProps {
  hearts: number
  points: number
  hasActiveSubscription: boolean
}

export function Items({ hearts, points, hasActiveSubscription }: ItemsProps) {
  const [pending, startTransition] = useTransition()

  function onRefillHearts() {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
      return null
    }

    startTransition(() => {
      refillHearts().catch(() => toast.error('Something went wrong'))
    })
  }

  function onUpgrade() {
    startTransition(() => {
      createStripeUrl()
        .then((response) => {
          if (response.data) {
            window.location.href = response.data
          }
        })
        .catch(() => toast.error('Something went wrong'))
    })
  }

  return (
    <ul className="w-full">
      <div className="flex w-full items-center gap-4 border-t-2 p-4">
        <Image src="/heart.svg" alt="Heart" width={60} height={60} />
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-lg">
            Refill hearts
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={hearts === 5 || points < POINTS_TO_REFILL}
        >
          {hearts === 5 ? (
            'full'
          ) : (
            <div className="flex items-center justify-between">
              <Image src="/points.svg" alt="Points" width={20} height={20} />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex w-full items-center gap-4 border-t-2 p-4 pt-8">
        <Image src="/unlimited.svg" alt="Unlimited" width={60} height={60} />
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-lg">
            Unlimited Hearts
          </p>
        </div>
        <Button onClick={onUpgrade} disabled={pending}>
          {hasActiveSubscription ? 'settings' : 'upgrade'}
        </Button>
      </div>
    </ul>
  )
}
