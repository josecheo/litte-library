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
    private URL_BASE = 'http://localhost:4000';
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

}
