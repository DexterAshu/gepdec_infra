import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toastr: ToastrService
  ) { }

  success(message: string) {
    this.toastr.success(message, 'Success', {
      timeOut: 3000,
      newestOnTop: true,
      progressBar: true,
      closeButton: true,
      easing: 'ease-in',
      easeTime: 500,
      progressAnimation: 'decreasing',
    });
  }

  warning(message: string) {
    this.toastr.warning(message, 'Warning', {
      timeOut: 3000,
      newestOnTop: true,
      progressBar: true,
      closeButton: true,
      easing: 'ease-in',
      easeTime: 500,
      progressAnimation: 'decreasing',
    });
  }
  
  info(message: string) {
    this.toastr.info(message, 'Info', {
      timeOut: 3000,
      newestOnTop: true,
      progressBar: true,
      closeButton: true,
      easing: 'ease-in',
      easeTime: 500,
      progressAnimation: 'decreasing',
    });
  }
  
  error(message: string) {
    this.toastr.error(message, 'Error', {
      timeOut: 3000,
      newestOnTop: true,
      progressBar: true,
      closeButton: true,
      easing: 'ease-in',
      easeTime: 500,
      progressAnimation: 'decreasing',
    });
  }
}
