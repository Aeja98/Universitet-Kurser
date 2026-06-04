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

  //returns selected courses
  getCourses(): Course[] {
    return this.selectedCourses;
  }

  //add course if it doesnt already exist
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

  //remove course from schedule
  removeCourse(courseCode: string): void {
    this.selectedCourses = this.selectedCourses.filter(
      course => course.courseCode !== courseCode
    );

    this.saveToLocalStorage();
  }

  //calculate total crredits
  getTotalPoints(): number {
    return this.selectedCourses.reduce(
      (sum, course) => sum + course.points,
      0
    );
  }

  //save schedule to storage
  private saveToLocalStorage(): void {
    if (!this.isBrowser) {
      return;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.selectedCourses));
  }

  //load schedule from storage
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