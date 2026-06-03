import { Component } from '@angular/core';
import { Course } from '../../models/course';
import { ScheduleService } from '../../services/schedule';

@Component({
  selector: 'app-schedule',
  imports: [],
  templateUrl: './schedule.html',
  styleUrl: './schedule.scss'
})
export class Schedule {
  selectedCourses: Course[] = [];

  constructor(private scheduleService: ScheduleService) {
    this.selectedCourses = this.scheduleService.getCourses();
  }

  removeFromSchedule(courseCode: string): void {
    this.scheduleService.removeCourse(courseCode);
    this.selectedCourses = this.scheduleService.getCourses();
  }

  getTotalPoints(): number {
    return this.scheduleService.getTotalPoints();
  }
}