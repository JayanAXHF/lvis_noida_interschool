'use client'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import { useEffect, useState } from 'react'
import { MultiSelect } from '~/components/multi-select'
import {
  SpoonacularClient,
  COMMON_INGREDIENTS,
  type Recipe,
} from '~/lib/spoonacular'
import { AppSidebar } from '~/components/app-sidebar'
import { SiteHeader } from '~/components/site-header'
import { Button } from '~/components/ui/button'
const page = () => {
  const [value, setValue] = useState<string[]>([])

  const [searchResults, setSearchResults] = useState<Recipe[]>([])
  const spoonacularClient = new SpoonacularClient(process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY as string)
  const handleSearch = async () => {
    const results = await spoonacularClient.getRecipes(value)
		console.debug(results)
    setSearchResults(results)
  }
	useEffect(() => {
		console.debug(searchResults)
	}, [searchResults])
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="h-full w-full h-max-full grid grid-flow-col grid-cols-3">
          <div className="bg-neutral-900 col-span-1 px-5 py-10">
            <MultiSelect
              options={COMMON_INGREDIENTS.map((ingredient) => ({
                label: ingredient,
                value: ingredient,
              }))}
              onValueChange={(state) => {
                setValue(state)
              }}
              defaultValue={value}
              placeholder="Select ingredients"
              animation={0.5}
              maxCount={3}
            />
            <Button
              variant="outline"
              className="mt-5 w-full cursor-pointer"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
          <div className=" col-span-2 px-5 py-10">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
              Search Results
            </h1>
            <div className="h-full w-full grid grid-flow-row grid-cols-3 gap-4">
              {searchResults && searchResults.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-neutral-900 rounded-lg p-5 flex flex-col gap-2				"
                >
                  <h2 className="text-xl font-bold">{recipe.title}</h2>
                  <p className="text-sm">{recipe.imageType}</p>
                  <p className="text-sm">{recipe.image}</p>
                  <p className="text-sm">{recipe.likes}</p>
                  <p className="text-sm">{recipe.missedIngredientCount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default page
