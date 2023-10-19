# Code Merge Guideline for Our Project

## Prerequisites:

1. Ensure you have the latest version of the master branch locally.
2. Ensure you have a clean working directory.

## Steps to Merge Your Code into the Master Branch:

### 1. Fetch the latest master:

Before you start merging, make sure you have the latest master branch. This will help to reduce potential merge conflicts.

```
# Move to the master branch
git checkout master

# Fetch the latest code from the remote repository
git pull origin master
```

### 2. Checkout and Update Your Branch:

Switch to your branch and ensure it's up to date with the master branch.

```
# Replace 'your-branch-name' with your actual branch name
git checkout your-branch-name

# Merge the latest changes from master into your branch
git merge master
```

### 3. Resolve Any Merge Conflicts:

If there are any conflicts, resolve them manually. After fixing, mark the file as resolved:

```
git add path/to/resolved-file
```

And then commit the resolved changes:

```
git commit -m "Resolve merge conflicts"
```

### 4. Push Your Updated Branch:

Once you're sure everything is updated and conflicts are resolved, push your branch to the remote repository:

```
git push origin your-branch-name
```

### 5. Create a Pull Request (PR):

Go to GitHub and create a new Pull Request from your branch to the master branch.

1. Click on 'New pull request'.
2. Compare changes between master and your branch.
3. Add a descriptive title and comment detailing the changes you've made, any dependencies, or any other relevant information.

### 6. Code Review:

Let team members review your PR. Address any comments or suggestions they might have.

### 7. Merge the PR:

Once your PR is approved:

1. Ensure your branch has no merge conflicts with master.
2. Click on 'Merge Pull Request' on GitHub.
3. Delete the branch afterward if it's not needed anymore.

### 8. Everyone Should Update Their Master:

Once the PR is merged, every team member should update their local master branch:

```
git checkout master
git pull origin master
```

This ensures everyone is working with the latest code.

## Important Notes:

-   Always ensure you've tested your code thoroughly before submitting a PR. The master branch should always be kept production-ready.
-   If you are working on a larger feature, consider breaking it down into smaller PRs. This makes the review process easier and quicker.
-   Communicate with your team. If you're unsure about something, ask!

Happy coding! 🚀
