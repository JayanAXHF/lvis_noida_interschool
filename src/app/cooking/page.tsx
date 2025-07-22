'use client'
import { useEffect, useState } from 'react'
import { AppSidebar } from '~/components/app-sidebar'
import { MultiSelect } from '~/components/multi-select'
import RecipeCard, { RecipeCardModal } from '~/components/recipie_card'
import { SiteHeader } from '~/components/site-header'
import { Button } from '~/components/ui/button'
import { HoverEffect } from '~/components/ui/card-hover-effect'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import {
  COMMON_INGREDIENTS,
  type Recipe,
  SpoonacularClient,
} from '~/lib/spoonacular'
const page = () => {
  const [value, setValue] = useState<string[]>([])

  const [searchResults, setSearchResults] = useState<Recipe[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const spoonacularClient = new SpoonacularClient(
    process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY as string,
  )
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
        <div className="grid h-full h-max-full w-full grid-flow-col grid-cols-3">
          <div className="col-span-1 bg-neutral-900 px-5 py-10">
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
            <h1 className="scroll-m-20 text-balance font-extrabold text-4xl tracking-tight">
              Search Results
            </h1>
            <div className="h-full w-full grid grid-flow-row grid-cols-3 gap-5">
              {searchResults &&
                searchResults.map((item) => (
                  <RecipeCardModal
                    recipe={item}
                    key={item.id}
                    isOpen={modalOpen}
                    setIsOpen={setModalOpen}
                  />
                ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default page
