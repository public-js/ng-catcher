import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


interface IFakeResponse {
    someValue: number[];
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {

    public readonly title = 'ng-catcher-demo';
    private readonly url500 = 'https://httpstat.us/500?sleep=1000';
    private readonly url200 = 'https://httpstat.us/200?sleep=1000';

    constructor(private http: HttpClient) {
    }

    public errorCode(): void {
        throw Error('Some code error');
    }

    public errorRequest(): void {
        this.http.post(this.url500, {})
            .subscribe();
    }

    public errorObservable(): void {
        let value: number | undefined = 0;
        of(null)
            .pipe(
                switchMap(() =>
                    this.http.post<IFakeResponse>(this.url200, {})),
                map((response: IFakeResponse) =>
                    value = response.someValue.find(v => v === 200)),
            )
            .subscribe(() => console.log(value));
    }

}
