# Version Bump Guide

This project uses semantic-release for automatic version management. Version bumps are triggered by commit messages.

## Commit Message Format

```
<type>: <description>

[optional body]

[optional footer]
```

### Types that trigger version bumps:

- `feat: ` - New feature (minor version bump)
  Example: `feat: add dark mode support`

- `fix: ` - Bug fix (patch version bump)
  Example: `fix: correct button alignment`

- `feat!: ` or `fix!: ` - Breaking change (major version bump)
  Example: `feat!: change API response format`

### Examples with version changes:

Current version: 1.2.3

| Commit Message | New Version |
|---------------|-------------|
| `fix: resolve null pointer` | 1.2.4 |
| `feat: add new API endpoint` | 1.3.0 |
| `feat!: redesign user authentication` | 2.0.0 |

### Other valid types (no version bump):
- `docs: ` - Documentation changes
- `style: ` - Code style changes
- `refactor: ` - Code refactoring
- `test: ` - Adding/modifying tests
- `chore: ` - Maintenance tasks
