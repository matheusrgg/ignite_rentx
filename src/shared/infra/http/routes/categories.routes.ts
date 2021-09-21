import { Router } from 'express';

import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';

const categoriesRoutes = Router();


const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle)
categoriesRoutes.get("/", listCategoriesController.handle)

export { categoriesRoutes }