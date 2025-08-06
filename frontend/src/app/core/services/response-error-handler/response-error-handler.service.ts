import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private notification: NotificationService) {}

  handleError(error: any) {
    const errorTitle = 'Error';
    let errorMessage = 'An unexpected error occurred.';

    if (error instanceof HttpErrorResponse) {
      const responseError = error?.error;

      // 🔹 Handle server unreachable / network error
      if (error.status === 0) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection or try again later.';
        this.notification.error(errorMessage, errorTitle);
        console.error('Network/Server error:', error);
        return errorMessage;
      }

      // ✅ Backend payload exists and is not null/undefined/empty
      if (responseError && Object.keys(responseError || {}).length > 0) {

        // Case 1: Has "error_description"
        if (responseError?.error_description) {
          this.notification.error(responseError.error_description, errorTitle);
          return responseError.error_description;
        }

        // Case 2: Is object with at least one key
        if (typeof responseError === 'object' && !Array.isArray(responseError)) {
          const firstKey = Object.keys(responseError)[0];
          const firstValue = responseError[firstKey];
          if (firstValue) {
            this.notification.error(firstValue, errorTitle);
            return firstValue;
          }
        }

        // Case 3: Is plain string
        if (typeof responseError === 'string' && responseError.trim()) {
          this.notification.error(responseError, errorTitle);
          return responseError;
        }
      }

      // ✅ Fallback to status-based messages
      switch (error?.status) {
        case 400:
          errorMessage = 'Bad request.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please log in again.';
          break;
        case 403:
          errorMessage = 'Access denied.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 500:
          errorMessage = 'Internal server error. Please try again later.';
          break;
        default:
          errorMessage = error?.status
            ? `Error ${error.status}: ${error.statusText || 'Unknown error'}`
            : 'An unexpected error occurred.';
      }
    } 
    else if (typeof error === 'string' && error.trim()) {
      errorMessage = error;
    }

    // ✅ Show final message if none of the above cases matched
    this.notification.error(errorMessage, errorTitle);

    // ✅ Log full error for debugging
    console.error('ErrorHandlerService:', error);

    return errorMessage;
  }
}
