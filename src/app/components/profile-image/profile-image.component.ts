import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-profile-image',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './profile-image.component.html',
    styleUrl: './profile-image.component.scss',
})
export class ProfileImageComponent {
    file: string = '';

    onFileChange(event: any) {
        const files = event.target.files as FileList;

        console.log(`[From File Change]:===>`, files[0]);

        if (files.length > 0) {
            const _file = URL.createObjectURL(files[0]);
            console.log(`[From File Change]:===>`, _file);
            this.file = _file;

            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result;
                console.log(`[From Reader]:====>`, base64String);
            }

            reader.readAsDataURL(files[0]);
            this.resetInput();
        }
    }

    resetInput() {
        const input = document.getElementById('avatar-input-file') as HTMLInputElement;
        if (input) {
            input.value = '';
        }
    }
}
