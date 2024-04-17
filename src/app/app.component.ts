import { Component, OnInit, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { time } from './time.pipe';

interface Task {
  name: string;
  currentStatus: boolean;
  timeSpend: number;
  taskHistory: { startTime: number, stopTime: number }[];
  time?: any;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, time],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})




export class AppComponent {
  taskName: string = '';
  taskModal: boolean = false
  totalTime: number = 0;
  tasks: Task[] = [];

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  startTimer(task: Task) {
    



    task.currentStatus = true;
    task.time = setInterval(() => {
      task.timeSpend++;
      this.totalTime++
    }, 1000);
    task.taskHistory.push({ startTime: Date.now(), stopTime: 0 })
  }

  stopTimer(task: Task) {
    task.currentStatus = false;
    clearInterval(task.time);
    task.taskHistory[task.taskHistory.length -1].stopTime = Date.now()
  }

  openTaskModal() {
    this.taskModal = true;
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === this.elementRef.nativeElement.querySelector('.modal-overlay')) {
      this.taskModal = false;
    }
  }

  saveTask() {
    if (this.taskName) {
      const newTask: Task = {
        name: this.taskName,
        currentStatus: false,
        timeSpend: 0,
        taskHistory: [],
      };
      this.tasks.push(newTask);
      this.taskName = ''
      this.taskModal = false
    }
  }

  onRemovingTask(index:number){
    clearInterval(this.tasks[index].time)
    this.tasks.splice(index, 1);
  }
}
