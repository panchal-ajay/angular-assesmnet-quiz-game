import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { GameComponent } from "../game/game.component";

@Injectable({
  providedIn: "root",
})
export class GameDeactivateGuard implements CanDeactivate<GameComponent> {
  canDeactivate(component: GameComponent): boolean {
    if (component.gameStarted) {
      alert("Please complete the game otherwise quit the game");
      return false;
    } else {
      return true;
    }
  }
}
