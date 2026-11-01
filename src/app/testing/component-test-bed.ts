import { EnvironmentProviders, Provider, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

/** Shared Vitest / TestBed providers for standalone component specs. */
export function provideComponentTesting(): (Provider | EnvironmentProviders)[] {
  return [
    provideZonelessChangeDetection(),
    provideNoopAnimations(),
    provideRouter([]),
    provideHttpClient(),
    provideHttpClientTesting(),
  ];
}
