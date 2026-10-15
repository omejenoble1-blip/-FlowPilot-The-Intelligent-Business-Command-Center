# GitLab Pages deployment

1. Create a GitLab repository and push this project to its default branch.
2. Ensure GitLab Pages and CI/CD are enabled for the project.
3. `.gitlab-ci.yml` copies the static application to `public/` and publishes that directory.
4. Wait for the pipeline to finish and open the Pages URL from the project's Pages settings.
5. Verify the app's CSS, JS module imports, icons, and charts. Project Pages often use a repository subpath; keep relative paths for project assets.

No server-side database, authentication, or background job is created by GitLab Pages. The current application uses browser-local storage.
