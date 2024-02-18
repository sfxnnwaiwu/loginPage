import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ShareService } from './share.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    title = 'wakanow-signup';

    private readonly router = inject(Router);
    private readonly shareService = inject(ShareService);

    isAuthenticated = signal<boolean>(false);

    ngOnInit(): void {
        this.shareService.getUserAuthenticationStatus().subscribe((status) => {
            this.isAuthenticated.set(status);
        })
    }

    authenticate() {
        this.router.navigateByUrl('login')
    }

    logout() {
        this.shareService.updateUserAuthentication(false);
        this.router.navigateByUrl('landing')
    }

    profile() {
        this.router.navigateByUrl('profile')
    }
}
