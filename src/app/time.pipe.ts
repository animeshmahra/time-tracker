import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ 
    name: 'time',
    standalone: true
})
export class time implements PipeTransform {

    transform(value: number): string {
        const hours: number = Math.floor(value / 3600);
        const minutes: number = Math.floor((value % 3600) / 60);
        const seconds: number = Math.floor(value % 60);

        const formattedHours = this.padZero(hours);
        const formattedMinutes = this.padZero(minutes);
        const formattedSeconds = this.padZero(seconds);

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    private padZero(value: number): string {
        return value < 10 ? `0${value}` : `${value}`;
    }

}