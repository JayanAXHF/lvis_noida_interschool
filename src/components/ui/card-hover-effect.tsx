import { AnimatePresence, motion } from 'motion/react'
import { cn } from '~/lib/utils'

import { useCallback, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { ScrollArea } from '~/components/ui/scroll-area'
import type { Recipe } from '~/lib/spoonacular'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { useQuery } from '@tanstack/react-query'

export const HoverEffect = ({
  items,
  className,
}: {
  items: Recipe[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className={cn(
        'grid h-full w-full grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {items.map((item, idx) => (
        <Dialog key={item.id}>
          <DialogTrigger asChild>
            <div
              key={item?.id}
              className="group relative block h-full w-full p-2"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 block h-full w-full rounded-3xl bg-neutral-200 dark:bg-slate-800/[0.8]"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
              <Card>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="size-full rounded-md border-4 border-neutral-700 ring-2 ring-neutral-800"
                  />
                </CardContent>
              </Card>
            </div>
          </DialogTrigger>
          <RecipeDialogContent recipe={item} />
        </Dialog>
      ))}
    </div>
  )
}

const RecipeDialogContent = ({ recipe }: { recipe: Recipe }) => {
  const queryFn = useCallback(async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipe.id}?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`,
    )
    const data = await response.json()
    console.debug(data)
    return data
  }, [recipe.id])
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['recipe', recipe.id],
    queryFn,
  })
  useEffect(() => {
    console.debug(data)
  }, [data])

  return (
    <DialogContent className="h-[90vh] max-w-3xl">
      <ScrollArea className="h-full w-full rounded-md p-4">
        <DialogHeader>
          <DialogTitle>{recipe.title}</DialogTitle>
        </DialogHeader>
        {isSuccess && data && (
          <div className="grid gap-4 py-4">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full rounded-md"
            />
            {data.extendedIngredients &&
              data.extendedIngredients.length > 0 && (
                <div>
                  <h3 className="mb-2 font-semibold text-lg">Ingredients</h3>
                  <ul className="list-inside list-disc space-y-1">
                    {data.extendedIngredients.map((ingredient) => (
                      <li key={ingredient.id} className="text-sm">
                        {ingredient.original}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            {data.analyzedInstructions &&
              data.analyzedInstructions.length > 0 && (
                <div>
                  <h3 className="mb-2 font-semibold text-lg">Instructions</h3>
                  <ol className="list-inside list-decimal space-y-2">
                    {data.analyzedInstructions[0].steps.map((step) => (
                      <li key={step.number} className="text-sm">
                        {step.step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
          </div>
        )}
      </ScrollArea>
    </DialogContent>
  )
}
