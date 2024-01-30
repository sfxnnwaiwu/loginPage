import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { UserInfo } from './util/user.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ShareService {
    private readonly fs = inject(Firestore);

    private isUserAuthenticated = new BehaviorSubject<boolean>(false);

    constructor() {}

    getUsers() {
        const usersCollection = collection(this.fs, 'users');
        return collectionData(usersCollection, { idField: 'id' });
    }

    async getUserByEmail(email: string) {
        const docRef = collection(this.fs, `users`);
        const userDoc = query(docRef, where('email', '==', `${email.trim()}`))
        const response = await getDocs(userDoc);
        const userArray: any[] = [];
        response.forEach((doc) => {
            console.log(doc.id)
            console.log(doc.data())
            const data = {
                id: doc.id,
                data: doc.data(),
            }
            userArray.push(data);
        })
        return userArray;
    }

    createdUser(user: UserInfo) {
        const usersCollection = collection(this.fs, 'users');
        return addDoc(usersCollection, user);
    }

    updateUser(user: Partial<UserInfo>, id: string) {
        const docRef = doc(this.fs, `users/${id}`);
        return updateDoc(docRef, user);
    }

    deleteUser(id: string) {
        const docRef = doc(this.fs, `users/${id}`);
        return deleteDoc(docRef);
    }

    updateUserAuthentication(isLoggedIn: boolean) {
        this.isUserAuthenticated.next(isLoggedIn);
    }

    getUserAuthenticationStatus() {
        return this.isUserAuthenticated.asObservable();
    }
}
