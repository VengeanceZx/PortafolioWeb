import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';
import { Experience } from '@core/interface';
import { IntersectionObserverService } from '@core/services';

import ExperienceList from '../../../../../assets/data/experience.json';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements AfterViewInit {
  listExperience: Experience[] = ExperienceList

  constructor(
    private intersectionObserverService: IntersectionObserverService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    for (const experience of this.listExperience) {
      const element = this.document.querySelector(`#${experience.id}`);
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
