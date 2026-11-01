import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
} from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { UserRole } from '../../core/models/user.model';

/**
 * Structural RBAC by role only.
 *
 * @example
 * <button *hasRole="'ADMIN'">Admin only</button>
 * <a *hasRole="['SALES', 'ADMIN']">Sales or admin</a>
 */
@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective {
  private readonly auth = inject(AuthService);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  private roles: UserRole[] = [];
  private match: 'any' | 'all' = 'any';

  @Input({ alias: 'hasRole' })
  set hasRole(value: UserRole | readonly UserRole[]) {
    this.roles = Array.isArray(value) ? [...value] : [value];
    this.render();
  }

  /** When multiple roles are listed: `any` (default) or `all` must match. */
  @Input()
  set hasRoleMatch(mode: 'any' | 'all') {
    this.match = mode;
    this.render();
  }

  constructor() {
    effect(() => {
      this.auth.role();
      this.auth.user();
      this.render();
    });
  }

  private render(): void {
    if (!this.roles.length) {
      this.viewContainer.clear();
      return;
    }
    const role = this.auth.role();
    let allowed = false;
    if (role) {
      allowed =
        this.match === 'all'
          ? this.roles.every((r) => this.auth.hasRole(r))
          : this.roles.some((r) => this.auth.hasRole(r));
    }
    this.viewContainer.clear();
    if (allowed) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
