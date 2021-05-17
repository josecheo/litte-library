import { AxiosResponse } from 'axios';
import Axios from 'axios-observable';
import { Observable } from 'rxjs/internal/Observable';

export class BookServices {
    private static instance: BookServices;
    public static getInstance(): BookServices {
        if (!BookServices.instance) {
            BookServices.instance = new BookServices();
        }
        return BookServices.instance;
    }
    private URL_BASE = 'https://littelibrary.herokuapp.com';
    private headers: {
        'Content-Type': 'application/json';
    } | undefined;
    public updateBook(data: object): Observable<AxiosResponse<[]>> {
        const uri = `${this.URL_BASE}/updateBooks`;
        return Axios.request<[]>({
            method: 'post',
            url: uri,
            data: data,
            headers: this.headers,
        }) || null
    }

    public deleteBook(data: object): Observable<AxiosResponse<[]>> {
        const uri = `${this.URL_BASE}/delete`;
        return Axios.request<[]>({
            method: 'post',
            url: uri,
            data: data,
            headers: this.headers,
        }) || null
    }

    public auth(data: object): Observable<AxiosResponse<[]>> {
        const uri = `http://localhost:4000/auth`;
        return Axios.request<[]>({
            method: 'post',
            url: uri,
            data: data,
            headers: this.headers,
        }) || null
    }

    public createUser(data: object): Observable<AxiosResponse<[]>> {
        const uri = `http://localhost:4000/signup`;
        return Axios.request<[]>({
            method: 'post',
            url: uri,
            data: data,
            headers: this.headers,
        }) || null
    }

}
