import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hero} from '../models/hero';
import {HEROES} from '../models/mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  getHero(id): Observable<Hero> {
    return of(HEROES.find(hero => id === hero.id));
  }

  getHeroes(): Observable<Hero[]> {
    this.messageService.addMessage('HeroService: fetched heroes');
    return of(HEROES);
  }
}
