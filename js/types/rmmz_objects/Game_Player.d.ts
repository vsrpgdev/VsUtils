declare class Game_Player extends Game_Character {
  protected _vehicleType: string;
  protected _vehicleGettingOn: boolean;
  protected _vehicleGettingOff: boolean;
  protected _dashing: boolean;
  protected _needsMapReload: boolean;
  protected _transferring: boolean;
  protected _newMapId: number;
  protected _newX: number;
  protected _newY: number;
  protected _newDirection: number;
  protected _fadeType: number;
  protected _followers: Game_Followers;
  protected _encounterCount: number;

  constructor();

  initialize(): void;
  initMembers(): void;
  clearTransferInfo(): void;

  followers(): Game_Followers;

  refresh(): void;
  isStopping(): boolean;

  reserveTransfer(mapId: number, x: number, y: number, d: number, fadeType: number): void;
  setupForNewGame(): void;
  requestMapReload(): void;

  isTransferring(): boolean;
  newMapId(): number;
  fadeType(): number;

  performTransfer(): void;

  isMapPassable(x: number, y: number, d: number): boolean;

  vehicle(): Game_Vehicle | null;
  isInBoat(): boolean;
  isInShip(): boolean;
  isInAirship(): boolean;
  isInVehicle(): boolean;
  isNormal(): boolean;

  isDashing(): boolean;
  isDebugThrough(): boolean;

  isCollided(x: number, y: number): boolean;

  centerX(): number;
  centerY(): number;
  center(x: number, y: number): void;

  locate(x: number, y: number): void;
  increaseSteps(): void;

  makeEncounterCount(): void;
  makeEncounterTroopId(): number;
  meetsEncounterConditions(encounter: RPG.DataEncounter): boolean;

  executeEncounter(): boolean;

  startMapEvent(x: number, y: number, triggers: number[], normal: boolean): void;

  moveByInput(): void;
  canMove(): boolean;

  getInputDirection(): number;
  executeMove(direction: number): void;

  update(sceneActive: boolean): void;

  updateDashing(): void;
  isDashButtonPressed(): boolean;

  updateScroll(lastScrolledX: number, lastScrolledY: number): void;

  updateVehicle(): void;
  updateVehicleGetOn(): void;
  updateVehicleGetOff(): void;

  updateNonmoving(wasMoving: boolean, sceneActive: boolean): void;

  triggerAction(): boolean;
  triggerButtonAction(): boolean;
  triggerTouchAction(): boolean;

  triggerTouchActionD1(x1: number, y1: number): boolean;
  triggerTouchActionD2(x2: number, y2: number): boolean;
  triggerTouchActionD3(x2: number, y2: number): boolean;

  updateEncounterCount(): void;
  canEncounter(): boolean;

  encounterProgressValue(): number;

  checkEventTriggerHere(triggers: number[]): void;
  checkEventTriggerThere(triggers: number[]): void;
  checkEventTriggerTouch(x: number, y: number): void;

  canStartLocalEvents(): boolean;

  getOnOffVehicle(): boolean;
  getOnVehicle(): boolean;
  getOffVehicle(): boolean;

  forceMoveForward(): void;

  isOnDamageFloor(): boolean;

  moveStraight(d: number): void;
  moveDiagonally(horz: number, vert: number): void;

  jump(xPlus: number, yPlus: number): void;

  showFollowers(): void;
  hideFollowers(): void;
  gatherFollowers(): void;

  areFollowersGathering(): boolean;
  areFollowersGathered(): boolean;
}
