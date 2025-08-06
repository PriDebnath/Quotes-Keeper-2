import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {}

  success(message: string, title?: string) {
    this.toastr.success(message, title, {
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    });
  }

  error(message: string, title?: string) {
    this.toastr.error(message, title, {
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    });
  }

  info(message: string, title?: string) {
    this.toastr.info(message, title, {
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    });
  }

  warning(message: string, title?: string) {
    this.toastr.warning(message, title, {
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    });
  }
}
