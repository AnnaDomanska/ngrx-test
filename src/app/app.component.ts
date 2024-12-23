import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageSrcPipeModule } from './image-src.pipe.module';
import { Destroyable } from './destroyable.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ImageSrcPipeModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent extends Destroyable {
}
