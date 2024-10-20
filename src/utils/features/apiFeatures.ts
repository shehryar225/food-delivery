import { SelectQueryBuilder } from "typeorm";

export class ApiFeatures<T>{

    public query: SelectQueryBuilder<T>;
    public queryString: any;

    constructor(query: SelectQueryBuilder<T>, queryString: any) {
        this.query = query;
        this.queryString = queryString;
      }

      
  // Pagination
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;

    this.query.skip(skip).take(limit);

    return this;
  }

   // Filtering (supports basic filtering like ?field=value)
   filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const filters = JSON.parse(queryStr);

    Object.keys(filters).forEach((key) => {
      this.query.andWhere(`${key} = :${key}`, { [key]: filters[key] });
    });

    return this;
  }

   // Sorting
   sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query.orderBy(sortBy);
    } else {
      this.query.orderBy('created_at', 'DESC');  // Default sorting by createdAt
    }

    return this;
  }

   // Build response (can be customized)
   buildResponse(doc: T[], total: number, page: number, limit: number, res: any) {
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      status: 'success',
      total,
      page,
      totalPages,
      limit,
      count: doc.length,
      data: doc,
    });
  }

}