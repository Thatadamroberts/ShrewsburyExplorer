# Shrewsbury: An Unfinished Survey

A 2D top-down exploration game about the history of Shrewsbury, England, written for adults. You take over the unfinished survey of Augustus Thorne, F.S.A., a fictional Victorian antiquarian. Walk the town to clear the fog from his map, talk to the townsfolk, and find his ten "witnesses": objects that each tell part of the town's story, from Roman Wroxeter to Wilfred Owen.

All of the game is in **`index.html`**: Canvas API, vanilla JavaScript, and every piece of art drawn in code. Progress saves automatically to `localStorage`.

## Play

- **Desktop:** open `index.html` in a browser. Arrow keys or WASD to walk, Space/Enter/Z to talk and read, hold Shift/X to hurry, Esc for the menu, J for the journal, T for the timeline, M for the map.
- **Phone:** there's an on-screen D-pad with A and B buttons.

### Install as an app (works offline)

The game is a Progressive Web App. To install it, serve the folder over HTTPS (GitHub Pages, Netlify, or any static host), open it on a phone, and then:

- **Android / Chrome:** tap **Install** on the title screen, or use *Add to Home screen* from the browser menu.
- **iPhone / Safari:** tap Share, then **Add to Home Screen**.

After the first visit the service worker caches the game, so it runs with no connection. For local testing, `python3 -m http.server` and then `http://localhost:8000` works too. Service workers don't run from `file://`, but the game itself still does.

| File | Purpose |
| --- | --- |
| `index.html` | The whole game (self-contained) |
| `manifest.webmanifest` | App name, colours, icons for home-screen install |
| `sw.js` | Offline cache. **Bump `VERSION`** whenever you change `index.html` so installed copies update |
| `icons/` | Home-screen icons, rendered from the game's own sprites |
| `tools/make-icons.js` | Re-renders the icons (`node tools/make-icons.js`, needs Playwright) |

## Editing content

All content is in labelled objects at the top of the `<script>` in `index.html`:

1. `CONFIG`: fog radius, walking speed, how much exploration the finale needs
2. `MAP_DATA`: river course, streets, landmarks, terraces, trees, place-name areas (tile coordinates on a 100 × 80 grid)
3. `ZONES`: districts and how many relics unlock each one
4. `RELICS`: the ten witnesses, each with a summary, a longer "read more" entry, a surprising detail, any legend or disputed claim (always shown apart from established fact), where to visit, and the clue
5. `NPCS`: the five townsfolk and their dialogue
6. `SIGNS`: readable plaques
7. `STORY`: intro, unlock messages, final summary
8. `ROUTE`: the real-world walking route
9. `ERAS`: the headings used on the timeline

If a relic, NPC or sign ends up somewhere the player can't reach, a warning appears in the browser console.

## Progression

| Relics logged | District opened |
| --- | --- |
| 0 | Town centre: station, castle, library and Darwin statue, Pride Hill, Butcher Row, Grope Lane, the Square |
| 2 | Mardol, the Welsh Bridge, Frankwell, St Chad's, the Quarry and the Dingle |
| 4 | Wyle Cop, the English Bridge, Abbey Foregate |
| 8 | Castle Foregate and the Ditherington Flaxmill |

The finale ("How Shrewsbury Grew") opens once all ten relics are found and 98% of the town is explored. That unlocks the real-world walking route.

The map is simplified and not to scale. The historical notes were written for this game; please check opening times before visiting anywhere.
