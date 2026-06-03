import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private storageKey = 'ramschema';
  private selectedCourses: Course[] = [];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadFromLocalStorage();
  }

  getCourses(): Course[] {
    return this.selectedCourses;
  }

  addCourse(course: Course): boolean {
    const courseExists = this.selectedCourses.some(
      selectedCourse => selectedCourse.courseCode === course.courseCode
    );

    if (courseExists) {
      return false;
    }

    this.selectedCourses.push(course);
    this.saveToLocalStorage();
    return true;
  }

  removeCourse(courseCode: string): void {
    this.selectedCourses = this.selectedCourses.filter(
      course => course.courseCode !== courseCode
    );

    this.saveToLocalStorage();
  }

  getTotalPoints(): number {
    return this.selectedCourses.reduce(
      (sum, course) => sum + course.points,
      0
    );
  }

  private saveToLocalStorage(): void {
    if (!this.isBrowser) {
      return;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.selectedCourses));
  }

  private loadFromLocalStorage(): void {
    if (!this.isBrowser) {
      return;
    }

    const savedCourses = localStorage.getItem(this.storageKey);

    if (savedCourses) {
      this.selectedCourses = JSON.parse(savedCourses);
    }
  }
}