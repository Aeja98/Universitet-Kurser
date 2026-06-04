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

  //get saved courses from schedule service
  constructor(private scheduleService: ScheduleService) {
    this.selectedCourses = this.scheduleService.getCourses();
  }

  //remove course + update list
  removeFromSchedule(courseCode: string): void {
    this.scheduleService.removeCourse(courseCode);
    this.selectedCourses = this.scheduleService.getCourses();
  }

  //get total credits
  getTotalPoints(): number {
    return this.scheduleService.getTotalPoints();
  }
}