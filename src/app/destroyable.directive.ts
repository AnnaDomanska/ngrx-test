import { Directive, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Directive()
export class Destroyable implements OnDestroy {
    ngOnDestroy(): void {
this.destroy$.next(void 0 )
this.destroy$.complete();
    }
    
    readonly destroy$ = new Subject<void>()
}