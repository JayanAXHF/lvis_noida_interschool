export interface MissedIngredient {
  aisle: string
  amount: number
  id: number
  image: string
  meta: string[]
  name: string
  original: string
  originalName: string
  unit: string
  unitLong: string
  unitShort: string
}

export interface AnalyzedInstruction {
  name: string
  steps: Step[]
}

export interface Step {
  number: number
  step: string
  ingredients: MissedIngredient[]
  equipment: Equipment[]
  length?: Length
}

export interface Equipment {
  id: number
  name: string
  localizedName: string
  image: string
}

export interface Length {
  number: number
  unit: string
}

export interface Recipe {
  id: number
  image: string
  imageType: string
  likes: number
  missedIngredientCount: number
  missedIngredients: MissedIngredient[]
  title: string
  summary?: string
  extendedIngredients?: MissedIngredient[]
  analyzedInstructions?: AnalyzedInstruction[]
}

export interface SpoonacularApi {
  apiKey: string
  getRecipes(ingredients: string[]): Promise<Recipe[]>
}

export class SpoonacularClient implements SpoonacularApi {
  apiKey: string
  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async getRecipes(ingredients: string[]): Promise<Recipe[]> {
    const ingredients_params = ingredients
      .map((ingredient, i) => {
        if (i === 0) {
          return `ingredients=${ingredient}`
        }
        return `+${ingredient}`
      })
      .join(',')
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${this.apiKey}&${ingredients_params}`,
    )
    const data: Recipe[] = await response.json()

    const detailedRecipes: Recipe[] = []
    for (const recipe of data) {
      const detailedRecipe = await this.getRecipeInformation(recipe.id)
      detailedRecipes.push(detailedRecipe)
    }

    return detailedRecipes
  }

  async getRecipeInformation(id: number): Promise<Recipe> {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.apiKey}`,
    )
    const data: Recipe = await response.json()
    return data
  }
}

export const COMMON_INGREDIENTS = [
  'chicken',
  'beef',
  'pork',
  'fish',
  'eggs',
  'milk',
  'cheese',
  'butter',
  'flour',
  'sugar',
  'salt',
  'pepper',
  'onion',
  'garlic',
  'potato',
  'tomato',
  'carrot',
  'broccoli',
  'rice',
  'pasta',
  'bread',
  'olive oil',
  'vinegar',
  'lemon',
  'lime',
  'ginger',
  'soy sauce',
  'honey',
  'mustard',
  'ketchup',
  'mayonnaise',
  'yogurt',
  'spinach',
  'bell pepper',
  'mushroom',
  'corn',
  'beans',
  'cabbage',
  'cucumber',
  'apple',
  'banana',
  'orange',
  'grapes',
  'strawberries',
  'blueberries',
  'oats',
  'quinoa',
  'lentils',
  'chickpeas',
  'nuts',
  'seeds',
  'herbs',
  'spices',
]
