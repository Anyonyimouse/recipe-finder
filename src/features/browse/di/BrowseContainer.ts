import { MealDbBrowseRepository } from '../data/repositories/MealDbBrowseRepository';
import { BrowseRepository } from '../domain/repositories/BrowseRepository';
import { FetchOnlineRecipesUseCase } from '../domain/usecases/FetchOnlineRecipesUseCase';

export const browseRepository: BrowseRepository = new MealDbBrowseRepository();
export const fetchOnlineRecipesUseCase = new FetchOnlineRecipesUseCase(browseRepository);
