import { Category } from '../../domain/category/Category';
import { IBaseRepository } from './IBaseRepository';

export interface ICategoryRepository extends IBaseRepository<Category, string> {}