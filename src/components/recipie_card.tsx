'use client'

import * as React from 'react'
import type { Recipe } from '~/lib/spoonacular'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { ScrollArea } from './ui/scroll-area'
import { useQuery } from '@tanstack/react-query'

const RecipeCard = ({ recipie, isModalOpen }: { recipie: Recipe }) => {
  return (
    <Card className="cursor-pointer size-full hover:scale-105 transition-transform duration-200">
      <CardHeader>
        <CardTitle>{recipie.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={recipie.image}
          alt={recipie.title}
          className="size-full rounded-md border-neutral-700 border-4 ring-neutral-800 ring-2"
        />
      </CardContent>
    </Card>
  )
}

export const RecipeCardModal = ({
  recipe,
}: {
  recipe: Recipe
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <Dialog>
      <DialogTrigger></DialogTrigger>
			<RecipeDialogContent recipe={recipe} />
    </Dialog>
  )
}
export default RecipeCard

const RecipeDialogContent = ({ recipe }: { recipe: Recipe }) => {
  const queryFn = React.useCallback(async () => {
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
  React.useEffect(() => {
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
