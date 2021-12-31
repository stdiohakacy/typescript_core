import { Category } from '../../domain/Category';
import { IBaseRepository } from './IBaseRepository';

export interface ICategoryRepository extends IBaseRepository<Category, string> {}