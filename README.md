# Espace Streamer - Page de Liens

## Description

Page web interactive et animée servant de hub central pour regrouper les différents réseaux sociaux d'un streamer. Le site propose une expérience visuelle immersive avec des animations en pixel art inspirées d'un univers nocturne et fantastique.

## Fonctionnalités

- **Animations canvas** : Étoiles scintillantes générées dynamiquement
- **Étoiles filantes** : Apparition aléatoire d'étoiles filantes traversant l'écran
- **Nuages animés** : Mouvement oscillant de plusieurs couches de nuages
- **Design pixel art** : Esthétique rétro avec police "Press Start 2P"
- **Liens sociaux** : Accès rapide vers Twitch, YouTube et TikTok
- **Design responsive** : Adaptation automatique à la taille de l'écran

## Technologies utilisées

- HTML5 Canvas
- CSS3 (animations, gradients, transitions)
- JavaScript vanilla
- Google Fonts (Press Start 2P)

## Structure du projet

```
peushu-site/
├── index.html           # Structure principale
├── style.css            # Styles et animations CSS
├── script.js            # Animations canvas et logique
└── Assets/
          ├── Peushu.png          # Logo
          ├── lake.png            # Image de décor
          └── Nuages [1-6].png    # Assets des nuages
```

## Installation

1. Cloner le repository :
```bash
git clone https://github.com/Lelio88/peushu-site.git
cd peushu-site
```

2. Ouvrir le fichier `index.html` dans un navigateur

Aucune dépendance ou serveur requis, le site fonctionne en local.

## Personnalisation

Pour adapter ce site à un autre usage :

- Modifier les liens sociaux dans `index.html`
- Remplacer le logo `Peushu.png`
- Ajuster les couleurs du gradient dans `style.css`
- Modifier la fréquence des étoiles filantes dans `script.js` (ligne `if (Math.random() < 0.001)`)

## Aperçu des animations

- **Étoiles** : Scintillement continu avec effet de pulsation
- **Nuages** : Déplacement horizontal avec oscillation douce
- **Étoiles filantes** : Trajectoire diagonale à 45° avec effet de fade-out

---

*Page de liens pour streamer avec animations pixel art*
