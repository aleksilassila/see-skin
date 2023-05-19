import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export type QueryOptions = {
  take: number;
  skip: number;
};

export const QueryOptions = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const take = request.query.take
      ? Math.min(parseInt(request.query.take), 50)
      : 10;
    const skip = request.query.skip ? parseInt(request.query.skip) : 0;

    if (isNaN(take) || isNaN(skip)) {
      throw new BadRequestException('Invalid query options');
    }

    return {
      take,
      skip,
    };
  },
);
