import {
  Directive,
  inject,
  input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FeaturesService } from './feature.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[feature]',
  standalone: true,
})
export class FeatureDirective implements OnInit, OnDestroy {
  private viewContainerRef = inject(ViewContainerRef);
  private templateRef = inject<TemplateRef<unknown>>(TemplateRef<unknown>);
  private featureService = inject(FeaturesService);
  private subscription?: Subscription;

  public feature = input.required<string>();

  public ngOnInit(): void {
    this.subscription = this.featureService
      .getEnabledFeatures()
      .subscribe((features) =>
        this.updateView(features.includes(this.feature())),
      );
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private updateView(shouldCreate: boolean): void {
    if (shouldCreate) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
