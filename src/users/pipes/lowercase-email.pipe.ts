import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class LowercaseEmailPipe implements PipeTransform {
  transform(value: any): any {
    if (value.email) {
      value.email = value.email.toLowerCase();
    }
    return value;
  }
}
