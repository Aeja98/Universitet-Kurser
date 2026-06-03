import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course';
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

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        console.log('Data from JSON:', data);

        this.courses = data;
        this.filteredCourses = data;
        this.subjects = [...new Set(data.map(course => course.subjects))]
        .sort((a, b) => a.localeCompare(b));

        console.log('Courses array after assignment:', this.courses);
      },
      error: (error) => {
        console.error('Kunde inte läsa in kurser:', error);
      }
    });
  }

  filterCourses(): void {
    const search = this.searchTerm.toLowerCase().trim();

    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch =
        course.courseCode.toLowerCase().includes(search) ||
        course.courseName.toLowerCase().includes(search);

      const matchesSubject =
        this.selectedSubject === '' ||
        course.subjects === this.selectedSubject;

      return matchesSearch && matchesSubject;
    });
  }
}