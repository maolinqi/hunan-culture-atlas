# Hunan Culture Atlas: visual design and references

Delivered on 14 October 2026. This work demonstrates the appearance and interaction of a knowledge-graph frontend. Screenshots and recordings come from the working page. It does not include content generation, knowledge extraction or automatic graph production.

## Visual direction

Ink black, jade and aged gold create a quiet, exhibition-like constellation. Gold marks themes, selections and paths. Jade carries cultural terms. Serif typography gives titles a cultural character; sans-serif text supports controls and reading.

The design keeps a hierarchy between nodes, thin curves and background particles. On selection, the local neighbourhood becomes prominent and unrelated landmarks recede. Chinese and English modes have separate label sizing; switching language preserves graph state.

## Implemented effects

| Effect | Working behaviour |
| --- | --- |
| Entrance | Nodes spread out from the centre with fading and a smooth camera transition. |
| Branch expansion | Seven terms move into or out of each theme; their labels and links fade with them. |
| Layout morphing | Atlas, Orbit and Threads interpolate the same nodes to new positions. |
| Link light trails | Small lights and short tails travel along sampled Bézier curves. |
| Orbital particles | Layered gold particles and slow elliptical orbits surround the cultural root. |
| Ambient particles | Fine particles drift and shimmer; nearby particles respond to the pointer. |
| Breathing and ripples | Theme halos vary gently; selection and expansion emit a fading ring. |
| Local focus | Adjacent links brighten, unrelated nodes recede, and sourced links show arrows and names. |
| Navigation | Panning, pointer-centred zoom, touch pinch and individual node movement. |
| Tour | A guided sequence moves through academies, literature, traditions, crafts, objects and tea. |
| Responsive labels | Mobile overview shows selected labels; zoom and focus reveal more. |
| Motion preferences | Particles, trails and breathing can be toggled; system reduced motion is respected. |

Native Canvas and DOM implement these effects without an external frontend library or online generation service. The layout is curated for the current 49-node example.

## Example cultural connections

- Zhu Xi and Zhang Shi took part in the Zhu–Zhang academic dialogue at Yuelu Academy. The academy’s history connects to Hunan University. [Yuelu Academy overview](https://ylsy.hnu.edu.cn/sygk.htm)
- Fan Zhongyan authored Record of Yueyang Tower; the tower overlooks Dongting Lake. [Yueyang Tower history](https://www.hunan.gov.cn/hnszf/c101480/202108/t20210830_20411802.html), [Tower chronicles](https://dfz.hunan.gov.cn/dfz/dqsj/202211/t20221122_29134400.html)
- Shen Congwen authored Border Town, whose setting draws on Chadong. Chadong and Fenghuang are distinct places. [Border Town and Chadong](https://www.hunan.gov.cn/hnszf/hnyw/szdt/202605/t20260502_33969228.html)
- Baishou dance connects the Tujia community and Longshan; Miao silverwork connects the Miao community and Fenghuang County. [Baishou dance](https://www.ihchina.cn/project_details/12922.html), [Miao silverwork](https://www.ihchina.cn/art/detail/id/14330.html)
- Xiang embroidery connects to Changsha; underglaze polychrome porcelain connects to Liling. [Xiang embroidery](https://www.ihchina.cn/project_details/13982.html), [Liling porcelain](https://www.ihchina.cn/art/detail/id/14451.html)
- Mawangdui connects to Xin Zhui and the excavated gauze garment; Hunan Museum exhibits the associated history. [Mawangdui cultural exhibition](https://www.hunan.gov.cn/hnszf/hnyw/zwdt/202408/t20240818_33433708.html)

All 24 references—16 cultural and 8 visual/technical—are listed in the bilingual References dialog and the Chinese companion document.

## Additional implementable directions

These are researched extension options, not features already implemented in this prototype.

| Method | Use and tradeoff | Primary reference |
| --- | --- | --- |
| Edge bundling | Groups dense curves in overview; individual paths should reappear on selection. | [D3 / Mike Bostock](https://observablehq.com/@d3/hierarchical-edge-bundling) |
| WebGL layers | Useful when node and particle counts increase substantially; requires new performance validation. | [Sigma.js rendering](https://www.sigmajs.org/concepts/rendering/) |
| Selective bloom | Adds subtle glow to selected objects while leaving text sharp. | [Three.js UnrealBloomPass](https://threejs.org/docs/pages/UnrealBloomPass.html) |
| Particle flow fields | Adds slow spatial movement to the background; density and motion remain adjustable. | [Codrops interactive particles](https://tympanus.net/codrops/2019/01/17/interactive-particles-with-three-js/) |
| Aggregation and zoom detail | Reveals information gradually as graphs grow. | [D3 Force](https://d3js.org/d3-force), [D3 Zoom](https://d3js.org/d3-zoom) |
| Focused exploration | Makes the local neighbourhood readable while de-emphasising the rest. | [Kumu Focus](https://docs.kumu.io/guides/focus) |

## Verification boundary

The working browser was checked for layout switching, expansion and collapse, search restoring hidden terms, node focus, bilingual descriptions and relation names, motion settings and reduced-motion behaviour. Desktop and mobile screenshots were inspected. Desktop overview labels were checked for overlapping rectangles in both languages. A bilingual focus-animation issue found during verification was repaired and rechecked.

This is evidence for the present frontend example. Large-scale graph performance, every browser/device combination and knowledge production are outside the verified scope.
