import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Manejar caso de fecha inválida
      return 'Fecha inválida';
    } else {
      const formattedDate = new DatePipe('es-es').transform(date, 'dd/MM/yyyy');
      return formattedDate.split(',')[0];
    }
  }
}

