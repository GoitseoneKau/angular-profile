import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    {path:"",pathMatch:"full",component:HomeComponent},
    {path:"About",pathMatch:"full",component:AboutComponent},
    {path:"Projects",pathMatch:"full",component:PortfolioComponent},
    {path:"Contact",pathMatch:"full",component:ContactComponent}
];