import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { orderStatuses } from "src/enums/orderStatuses.enum";

export class CreateOrderstatusDto {
    @IsEnum(orderStatuses)
    @IsNotEmpty()
    status:orderStatuses
}
