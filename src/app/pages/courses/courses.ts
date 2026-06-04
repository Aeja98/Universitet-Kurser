import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course';
import { ScheduleService } from '../../services/schedule';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  imports: [FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.scss'
})
export class Courses implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  subjects: string[] = [];
  searchTerm: string = '';
  selectedSubject: string = '';
  sortColumn: keyof Course | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private courseService: CourseService,
    private scheduleService: ScheduleService
  ) {}
  //load course data from json
  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        console.log('Data from JSON:', data);
        this.courses = data;
        this.filteredCourses = data;

        //create list of subjects for dropdown
        this.subjects = [...new Set(data.map(course => course.subject))]
          .sort((a, b) => a.localeCompare(b));

        console.log('Courses array after assignment:', this.courses);
      },
      error: (error) => {
        console.error('Kunde inte läsa in kurser:', error);
      }
    });
  }

  //filter courses based on search
  filterCourses(): void {
    const search = this.searchTerm.toLowerCase().trim();

    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch =
        course.courseCode.toLowerCase().includes(search) ||
        course.courseName.toLowerCase().includes(search);

      const matchesSubject =
        this.selectedSubject === '' ||
        course.subject === this.selectedSubject;

      return matchesSearch && matchesSubject;
    });

    this.applySorting();
  }

  //change sort if clicked again
  sortCourses(column: keyof Course): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.applySorting();
  }

  //sort filtered list
  applySorting(): void {
    if (!this.sortColumn) {
      return;
    }

    this.filteredCourses = [...this.filteredCourses].sort((a, b) => {
      const valueA = a[this.sortColumn as keyof Course];
      const valueB = b[this.sortColumn as keyof Course];

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      }

      return this.sortDirection === 'asc'
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });
  }

  //add course to schedule
  addToSchedule(course: Course): void {
    const added = this.scheduleService.addCourse(course);

    if (added) {
      alert(`${course.courseCode} har lagts till i ramschemat.`);
    } else {
      alert(`${course.courseCode} finns redan i ramschemat.`);
    }
  }
}