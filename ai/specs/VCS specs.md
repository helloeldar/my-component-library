# VCS Specs

## Terminology

**VCS** (Version Control System) is the umbrella term used for all version controls in this project — including Git, Mercurial, SVN, and any other VCS.

- Always use **VCS** in component names, file names, variable names, CSS class names, and documentation.
- Do **not** name things "Git Window", "Git Log", etc. — use "VCS Log", "VCS Commit", etc.
- The UI may display "Git" as the actual VCS type (e.g. in tab labels like "Git | Log | Console"), but the component/code name should always be VCS-agnostic.

**Examples:**
- Component: `VCSLogWindow`, not `GitLogWindow`
- CSS class: `.vcs-log-window`, not `.git-log-window`
- Config key: `vcslog`, not `gitlog`
- Spec file: `VCS specs.md`, not `Git specs.md`

---

## VCS Components

| Component | Key | Figma node |
|---|---|---|
| VCS Log Tool Window | `vcslog` | [25-3448](https://www.figma.com/design/g2D8IcRkSJTt9vAmhp0Amu/VCS-Components?node-id=25-3448) |
| VCS Commit Tool Window | `commit` | [27921:15443](https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=27921-15443) |

---

## Icons

- Branch icon: `general/vcs` — used for all branch tree nodes regardless of VCS type.
- VCS-specific actions are in `src/icons/vcs/`: `vcs/fetch`, `vcs/update`, `vcs/push`, `vcs/commit`, `vcs/merge`, etc.
