
import { SelectQueryBuilder } from 'typeorm';

interface ApiFeaturesOptions {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: any;
  relationMap:any
}

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
        console.log(alias,path)
        this.query.leftJoinAndSelect(`${path}`, `${alias}`).getMany();
      }
    });
    return this; // Allows method chaining
  }

  // applyFilters() {
  //   const { filter } = this.options;
  //   if (filter) {
  //     // Example: Add your filtering logic based on filter fields
  //     Object.keys(filter).forEach(key => {
  //       this.query.andWhere(`restaurant.${key} = :${key}`, { [key]: filter[key] });
  //     });
  //   }
  //   return this; // Allows method chaining
  // }

  applyFilters() {
    const { filter } = this.options;

    console.log(this.options)
    if (filter) {
      Object.keys(filter).forEach(key => {
        const value = filter[key];
  
        if (key.includes('.')) {     
          const [relationAlias, field] = key.split('.');
  
          this.query.andWhere(`${relationAlias}.${field} LIKE :${relationAlias}_${field}`, {
            [`${relationAlias}_${field}`]: `%${value}%`,
          });
        } else {
         
          this.query.andWhere(`restaurant.${key} LIKE :${key}`, { [key]: `%${value}%` });
        }
      });
    }
    return this;
  }
  

  applySorting() {
    const { sort } = this.options;
    if (sort) {
      const [sortField, sortOrder] = sort.split(':');
      this.query.orderBy(`restaurant.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    }
    else{
      this.query.orderBy('createdAt', 'DESC');
    }
    return this; 
  }

  async paginate() {
    const { page = 1, limit = 10 } = this.options;
    
    console.log(page,limit)
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
