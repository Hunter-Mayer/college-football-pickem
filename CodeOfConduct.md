# Code of Conduct

## Using Git

1. No direct pushing to main.
2. All new code for pull requests MUST go through the dev branch first
3. Create a branch per task/feature
4. Pull Requests - Only make pull requests through Git Hub

```
git pull // This will pull only from the branch you are working on
git push // Push code to github on same branch. Same as git push origin or git push origin <branch-name>
```

5. IF YOU DESIRE, Merging in VSCODE

```
git pull origin dev // Have fun merging conflicts in VSCODE
```

# GitHub Project

1. For every branch/feature/task, add an issue to the repository

# Styling

1. Use camelCase for variables and functions/methods

```
superLongExampleThatNeverEnds
```

2. Use UpperCamelCase for

```
SuperSimpleClassNameExampleButNotReally
```

3. Let's use Es6 imports

```
import variable from "../../../file-path.js"
```

4. Add `"type": "module",` to package.json
    - Additionally, I will add some experimental arguments for running node to ensure we can leave off the .js
