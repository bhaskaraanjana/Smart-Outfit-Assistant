---
description: Version control workflow and commit guidelines
---

# Version Control Workflow

## Commit Guidelines

### Commit Message Format
Use conventional commits format:
```
<type>: <description>

[optional body]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style/formatting (no functional changes)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat: add budget filter to product search"
git commit -m "fix: resolve color extraction timeout issue"
git commit -m "docs: update README with deployment instructions"
```

## Standard Workflow

### 1. Before Starting Work
```bash
git pull origin main
git checkout -b feature/your-feature-name
```

### 2. Making Changes
```bash
# Make your changes
git add .
git status  # Review what will be committed
git commit -m "type: description"
```

### 3. Pushing Changes
// turbo
```bash
git push origin feature/your-feature-name
```

### 4. After Feature Complete
```bash
git checkout main
git pull origin main
git merge feature/your-feature-name
git push origin main
```

## Quick Commands

### Check Status
// turbo
```bash
git status
```

### View History
// turbo
```bash
git log --oneline -10
```

### Undo Last Commit (keep changes)
```bash
git reset --soft HEAD~1
```

### Discard Local Changes
```bash
git checkout -- <file>
```

## Best Practices

1. **Commit Often**: Small, focused commits are easier to review and revert
2. **Pull Before Push**: Always pull latest changes before pushing
3. **Meaningful Messages**: Write clear commit messages that explain WHY, not just WHAT
4. **Test Before Commit**: Ensure code builds and tests pass
5. **Don't Commit Secrets**: Never commit API keys, passwords, or sensitive data
6. **Branch for Features**: Use feature branches for new work, merge to main when complete
