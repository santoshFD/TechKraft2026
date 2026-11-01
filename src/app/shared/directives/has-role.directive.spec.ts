import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { provideComponentTesting } from '../../testing/component-test-bed';
import { HasRoleDirective } from './has-role.directive';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  selector: 'has-role-allowed-host',
  imports: [HasRoleDirective],
  template: `<ng-container *hasRole="'ADMIN'"><span data-testid="secret">admin</span></ng-container>`,
})
class HasRoleAllowedHostComponent {}

describe('HasRoleDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HasRoleAllowedHostComponent],
      providers: [
        ...provideComponentTesting(),
        {
          provide: AuthService,
          useValue: {
            role: () => 'ADMIN' as const,
            user: () => ({ id: 'u-admin-1' }),
            hasRole: (...roles: string[]) => roles.includes('ADMIN'),
          },
        },
      ],
    }).compileComponents();
  });

  afterEach(() => TestBed.resetTestingModule());

  it('renders content when role matches', () => {
    const fixture = TestBed.createComponent(HasRoleAllowedHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-testid="secret"]')?.textContent).toBe('admin');
  });
});

@Component({
  standalone: true,
  selector: 'has-role-denied-host',
  imports: [HasRoleDirective],
  template: `<ng-container *hasRole="'ADMIN'"><span data-testid="secret">admin</span></ng-container>`,
})
class HasRoleDeniedHostComponent {}

describe('HasRoleDirective denied', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HasRoleDeniedHostComponent],
      providers: [
        ...provideComponentTesting(),
        {
          provide: AuthService,
          useValue: {
            role: () => 'SALES' as const,
            user: () => ({ id: 'u-sales-1' }),
            hasRole: () => false,
          },
        },
      ],
    }).compileComponents();
  });

  it('hides content when role does not match', () => {
    const fixture = TestBed.createComponent(HasRoleDeniedHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-testid="secret"]')).toBeNull();
  });
});
