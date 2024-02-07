import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../../services/user.service";

export const UserDataResolver: ResolveFn<any> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
        const userService = inject(UserService);
        return userService.getLoggedInUserInfo();
    }