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

export interface Recipe {
  id: number
  image: string
  imageType: string
  likes: number
  missedIngredientCount: number
  missedIngredients: MissedIngredient[]
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
			} return `+${ingredient}`
		})
      .join(',')
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${this.apiKey}&${ingredients_params}`,
    )
    const data = await response.json()
		console.debug(data)
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
