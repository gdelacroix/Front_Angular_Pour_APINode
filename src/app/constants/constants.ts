// src/app/constants/constants.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Constants {
  public readonly API_ENDPOINT: string = 'http://localhost:3000';
  public readonly API_MOCK_ENDPOINT: string = 'http://localhost:3000';
}
