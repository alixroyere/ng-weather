import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {CacheService} from './cache.service';
import {of} from 'rxjs';
import {tap} from 'rxjs/operators';

export const cachingInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const cacheService = inject(CacheService);
    const cachedResponseBody = cacheService.retrieve(req.url);

    function cacheResponse() {
        return (event: HttpEvent<unknown>) => {
            if (event instanceof HttpResponse) {
                cacheService.set(req.url, event.body);
            }
        };
    }

    return cachedResponseBody ? of(new HttpResponse<any>({body: cachedResponseBody})) : next(req).pipe(tap(cacheResponse()));
};
