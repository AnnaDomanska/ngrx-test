import {  Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'imageSrc'  
})
export class ImageSrcPipe implements PipeTransform {
    transform(value: string): string {
       return `https://testowy-server.com/${value}`
    }
    
}