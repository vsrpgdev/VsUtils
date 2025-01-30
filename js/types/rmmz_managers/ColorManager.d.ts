declare class ColorManager {
  private static _windowskin: Bitmap;

  static loadWindowskin(): void;
  static textColor(n: number): string;
  static normalColor(): string;
  static systemColor(): string;
  static crisisColor(): string;
  static deathColor(): string;
  static gaugeBackColor(): string;
  static hpGaugeColor1(): string;
  static hpGaugeColor2(): string;
  static mpGaugeColor1(): string;
  static mpGaugeColor2(): string;
  static mpCostColor(): string;
  static powerUpColor(): string;
  static powerDownColor(): string;
  static ctGaugeColor1(): string;
  static ctGaugeColor2(): string;
  static tpGaugeColor1(): string;
  static tpGaugeColor2(): string;
  static tpCostColor(): string;
  static pendingColor(): string;
  static hpColor(actor: Game_Actor | null): string;
  static mpColor(actor?: Game_Actor): string;
  static tpColor(actor?: Game_Actor): string;
  static paramchangeTextColor(change: number): string;
  static damageColor(colorType: number): string;
  static outlineColor(): string;
  static dimColor1(): string;
  static dimColor2(): string;
  static itemBackColor1(): string;
  static itemBackColor2(): string;
}