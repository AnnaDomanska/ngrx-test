import { NgModule } from "@angular/core";
import { ImageSrcPipe } from "./image-src.pipe";

@NgModule({
    declarations: [ImageSrcPipe],
    exports: [ImageSrcPipe],
    providers: [
        ImageSrcPipe
    ]
})
export class ImageSrcPipeModule {}