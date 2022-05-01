# Music Club Client

The Music Club Client is a web interface for viewing Music Club data.


This is a web frontend that provides a way to browse information about Music Club. It is available at [https://tatebrasel.com/music-club-client/](https://tatebrasel.com/music-club-client/).

## Contribution Process

1. Create a GitHub issue for the feature.

2. Create a new branch off `dev` for the issue with the name: `#<issueNumber>-shortened-issue-name`.

3. Implement the feature. When doing so, try to make clean and modular commits that follow [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) guidelines.

4. Document the feature in the `CHANGELOG,md` under 'Unreleased'.

5. In GitHub, create a pull request to merge the feature branch into `dev`. Review and merge if everything looks okay.

## Deployment

The Music Club Client is hosted by GitHub Pages and can be visited at:
[https://tatebrasel.com/music-club-client/](https://tatebrasel.com/music-club-client/).

1. In your local repo, checkout the `dev` branch and pull.

2. Move all items in the 'Unreleased' section of `CHANGELOG.md` to a new section with the version number: yyyy-mm-dd.  

3. In GitHub, create a pull request to merge `dev` into the `main` branch. Review and merge if everything looks okay.

4. In your local repo, checkout the `main` branch and pull those changes you just merged. Only the `main` branch of the music-club-client repository should ever be deployed to production.

5. In the command line, run:
```
npm run deploy
```

8. Visit [https://tatebrasel.com/music-club-client/](https://tatebrasel.com/music-club-client/) and make sure the site loads. It may take a few minutes to update to the newly deployed version.
