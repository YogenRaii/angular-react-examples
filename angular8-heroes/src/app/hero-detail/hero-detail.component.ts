import {Component, OnInit} from '@angular/core';
import {Hero} from '../models/hero';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  private hero: Hero;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHero();
  }


  getHero() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(hero: Hero) {
    this.heroService.updateHero(hero).subscribe(() => this.goBack());
  }

}
