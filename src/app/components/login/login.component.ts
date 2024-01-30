import { Component, OnInit, inject, signal } from '@angular/core';
import { ShareService } from '../../share.service';
import { UserInfo } from '../../util/user.interface';
import { Register } from '../../util/register.interface';
import { Login } from '../../util/login.interface';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private readonly shareService = inject(ShareService);
    private readonly router = inject(Router);

    isLogin = signal<boolean>(true);
    registerObject: Register = {
        firstName: '',
        lastName: '',
        email: '',
        sex: '',
        userName: '',
    };

    loginObject: Login = {
        email: '',
        password: ''
    }

    toggleForm(formType: string) {
        if (formType === 'login') {
            this.isLogin.set(true);
        } else {
            this.isLogin.set(false);
        }
    }

    async createUser() {
        if (!this.isObjectFieldValid(this.registerObject)) {
            window.alert(`The form is invalid`);
            return;
        }
        const registrationInfo: UserInfo = {
            userName: this.registerObject.userName,
            firstName: this.registerObject.firstName,
            lastName: this.registerObject.lastName,
            email: this.registerObject.email,
            sex: this.registerObject.sex,
            admin: false,
            approved: false,
            onboard: false,
            password: '',
            timeCreated: new Date().getTime()
        }

        try {
            const response = await this.shareService.getUserByEmail(this.loginObject.email)
            if (response.length) {
                window.alert(`Email already exist.`);
                return;
            }
        } catch (error) {
            console.log(`[From error Block]:====>`, error);

        }

        this.shareService.createdUser(registrationInfo).then((userData) => {
            console.log(`[From User Creation]:=====>`, userData);
        }).catch((err) => {
            console.log(`[From error Block]:===>`, err);
        })


    }

    async authenticateUser(){
        if (!this.isObjectFieldValid(this.loginObject)) {
            window.alert(`The form is invalid`);
            return;
        }

        try {
            const response = await this.shareService.getUserByEmail(this.loginObject.email);

            if (!response.length) {
                window.alert(`Either email or password is invalid`);
                return;
            }

            if (!response[0].data.approved) {
                window.alert(`Your approval is still pending. You will not be able to login.`);
                return;
            }

            if (response.length && response[0].data.password === this.loginObject.password) {
                window.alert(`Login Successful.`);
                this.shareService.updateUserAuthentication(true);
                this.router.navigateByUrl('users')
                return;
            }
            window.alert(`Either email or password is invalid`);

        } catch (error) {
            console.log(`[From error Block]:====>`, error);

        }



    }

    isObjectFieldValid(obj: Register | Login): boolean {
        let isValid = true;
        const objArray = Object.values(obj);
        for (const key of objArray) {
            if (!key) {
                isValid = false;
            }
        }
        return isValid
    }
}
