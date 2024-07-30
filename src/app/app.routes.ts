import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LayoutComponent } from "./layout/layout.component";
import { GameComponent } from "./game/game.component";
import { UserComponent } from "./user/user.component";
import { AuthGuard } from "./Guard/auth.guard";
import { LeaderBoardComponent } from "./leader-board/leader-board.component";
import { GameDeactivateGuard } from "./Guard/game-deactivate.guard";

export const AppRoutingModule: Routes = [
  {
    path: "",
    component: LayoutComponent,
    pathMatch: "full",
  },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "game",
    component: GameComponent,
    canActivate: [AuthGuard],
    // canDeactivate: [GameDeactivateGuard],
  },
  { path: "user", component: UserComponent, canActivate: [AuthGuard] },
  {
    path: "leader-board",
    component: LeaderBoardComponent,
    canActivate: [AuthGuard],
  },
];
