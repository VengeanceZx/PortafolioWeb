import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';
import { Study } from '@core/interface';
import { IntersectionObserverService } from '@core/services';

import studies from '../../../../../assets/data/studies.json';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss'],
})
export class StudiesComponent implements AfterViewInit {
  listStudies: Study[] = studies

  constructor(
    private intersectionObserverService: IntersectionObserverService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    for (const study of this.listStudies) {
      const element = this.document.querySelector(`#${study.id}`);
      const callback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.classList.remove('visibility-hidden');
              element.classList.add('slideInUp');
              element.classList.add('animated');
            }, 200);
          }
        });
      };

      this.intersectionObserverService.create({
        callback,
        element,
      });
    }
  }
}
