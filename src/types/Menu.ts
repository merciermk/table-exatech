interface SousMenu {
  readonly subName: string; // Nom sousMenu
  readonly auth?: string[]; // Array de droits
  readonly subIcon: string; // icone du sous menu, fontAwesome
  readonly subPath: string; // chemin
}

interface Menu {
  readonly name: string; // Nom Menu
  readonly id: string; // Est utilisé par bootstrap pour accordion, doit être unique
  readonly auth?: string[] | boolean[]; // Array de droits
  readonly icon: string; // icone du menu, fontAwesome
  readonly topElement?: boolean // true si on veut que cet élément soit le premier élément du menu
  readonly bottomElement?: boolean; // true si on veut que cet élément soit collé en bas du menu
  readonly dataBsParent: string; // Référence au parent du menu afin de faire fonctionner accordion
  readonly path?: string; // chemin
  readonly childElement: boolean; // True si sous-menu
  readonly sousMenu?: any[]; // sous-menu, interface juste au dessus
}

export { Menu, SousMenu }
