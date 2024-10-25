
import { ApiFeaturesOptions } from 'src/interfaces/relationApiFeature.interface';
import { SelectQueryBuilder } from 'typeorm';

export class ApiiFeatures {
  query: SelectQueryBuilder<any>;
  options: ApiFeaturesOptions;

  constructor(query: SelectQueryBuilder<any>, options: ApiFeaturesOptions) {
    this.query = query;
    this.options = options;
  }
  
  loadRelations() {

    Object.entries(this.options.relationMap).forEach(([alias, path]) => {
      if (typeof path === 'string' && typeof alias === 'string') {
        this.query.leftJoinAndSelect(`${path}`, `${alias}`).getMany();
      }
    });
    return this;
  }

  applyFilters() {
    const { filter } = this.options;


    if (filter) {
      Object.keys(filter).forEach(key => {
        const value = filter[key];
  
        if (key.includes('.')) {     
          const [relationAlias, field] = key.split('.');
  
          this.query.andWhere(`${relationAlias}.${field} LIKE :${relationAlias}_${field}`, {
            [`${relationAlias}_${field}`]: `%${value}%`,
          });
        } else {
         
          this.query.andWhere(`${this.options.parent}.${key} LIKE :${key}`, { [key]: `%${value}%` });
        }
      });
    }
    return this;
  }
  

  applySorting() {
    const { sort } = this.options;
    if (sort) {
      const [sortField, sortOrder] = sort.split(':');
      this.query.orderBy(`${this.options.parent}.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    }
    else{
      this.query.orderBy(`${this.options.parent}.createdAt`, 'DESC');
    }
    return this; 
  }

  async paginate() {
    const { page = 1, limit = 10 } = this.options;
    
    const skip = (page - 1) * limit;

    
    this.query.skip(skip).take(limit);

    const total = await this.query.getCount();
    const docs = await this.query.getMany();

    return {
      status: 'success',
      total,
      page,
      limit,
      count: docs.length,
      data: docs,
    };
  }
}
