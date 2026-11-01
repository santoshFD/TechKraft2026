import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
} from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import {
  ApplicationPermission,
  ApplicationPermissionContext,
  hasApplicationPermission,
} from '../../core/auth/application-permissions';

/**
 * Structural RBAC by named application permission (role + optional row/context).
 *
 * @example
 * <a *appRbac="'applications.editDraft'; context: row">Edit</a>
 */
@Directive({
  selector: '[appRbac]',
  standalone: true,
})
export class AppRbacDirective {
  private readonly auth = inject(AuthService);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  private permission: ApplicationPermission | null = null;
  private context: ApplicationPermissionContext = {};

  @Input({ alias: 'appRbac', required: true })
  set appRbac(permission: ApplicationPermission) {
    this.permission = permission;
    this.render();
  }

  @Input('appRbacContext')
  set appRbacContext(context: ApplicationPermissionContext | null | undefined) {
    this.context = context ?? {};
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
    if (!this.permission) {
      this.viewContainer.clear();
      return;
    }
    const allowed = hasApplicationPermission(
      this.permission,
      this.auth.role(),
      this.auth.user()?.id,
      this.context,
    );
    this.viewContainer.clear();
    if (allowed) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
