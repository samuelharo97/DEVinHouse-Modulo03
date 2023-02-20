import { PipeTransform, Injectable } from '@nestjs/common';
import { responseHttp } from 'src/utils/message';

@Injectable()
export class NumberValidationPipe implements PipeTransform {
  async transform(value: any): Promise<any> {
    const num = Number(value);
    if (isNaN(num)) {
      throw responseHttp({
        statusCode: 400,
        message: 'ID must be a number',
      });
    }
    return num;
  }
}
