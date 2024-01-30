import { Component, OnInit, inject, signal } from '@angular/core';
import { ShareService } from '../../share.service';
import { UserInfo } from '../../util/user.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

    private readonly shareService = inject(ShareService);
    public users = signal<UserInfo[]>([]);

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers() {
        this.shareService.getUsers().subscribe((users: any) => {
            this.users.set(users);
            console.log(this.users());
        });
    }

}
